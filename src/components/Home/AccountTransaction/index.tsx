import React, { useEffect, useState } from 'react';
import {
  AddressTransactionWithTransfers,
  TokensApi,
} from '@stacks/blockchain-api-client';
import { FtTransfer, StxTransfer, Tx } from '../../../models/transactions';
import {
  getTxCaption,
  isAddressTransactionWithTransfers,
} from '../../../shared/transactionUtils';
import { StxTransferTransaction, TransactionItem } from './StxTransfer';
import { getAssetStringParts, stacksValue } from '../../../shared/balanceUtils';
import { useAccounts } from '../../../hooks/useAccounts/useAccounts';
import { Typography } from '../../shared/Typography';
import { useAtomValue } from 'jotai/utils';
import BigNumber from 'bignumber.js';
import { withSuspense } from '../../shared/WithSuspense';
import { apiClientState } from '../../../hooks/apiClients/apiClients';
import useNetwork from '../../../hooks/useNetwork/useNetwork';
import { Linking } from 'react-native';

interface StxTransferItemProps {
  stxTransfer: StxTransfer;
  parentTx: AddressTransactionWithTransfers;
}

const StxTransferItem = ({ stxTransfer, parentTx }: StxTransferItemProps) => {
  const { selectedAccountState } = useAccounts();
  const title = 'STX Transfer';
  const caption = getTxCaption(parentTx.tx) ?? '';
  const isOriginator = stxTransfer.sender === selectedAccountState?.address;
  const { currentNetwork } = useNetwork();
  const link = `https://explorer.stacks.co/txid/${parentTx.tx.tx_id}?chain=${currentNetwork.name}`;

  const openTransactionInExplorer = () => {
    Linking.openURL(link);
  };

  const value = `${isOriginator ? '-' : ''}${stacksValue({
    value: stxTransfer.amount,
    withTicker: false,
  })}`;

  return (
    <TransactionItem
      title={title}
      onClickTransaction={openTransactionInExplorer}
      caption={caption}
      value={value}
      isOriginator={isOriginator}
    />
  );
};

interface FtTransferItemProps {
  ftTransfer: FtTransfer;
  parentTx: AddressTransactionWithTransfers;
}

const getAssetMeta = async (identifier: string, tokenApi: TokensApi) => {
  const { contractName, address } = getAssetStringParts(identifier);
  const contractId = `${address}.${contractName}`;
  const assetMeta = await tokenApi.getContractFtMetadata({
    contractId,
  });
  return assetMeta;
};

export const calculateTokenTransferAmount = (
  decimals: number,
  amount: number | string | BigNumber,
) => {
  return new BigNumber(amount).shiftedBy(-decimals);
};

const FtTransferItem = ({ ftTransfer, parentTx }: FtTransferItemProps) => {
  const { selectedAccountState } = useAccounts();
  const { fungibleTokensApi } = useAtomValue(apiClientState);
  const { currentNetwork } = useNetwork();
  const [ftTitle, setFtTitle] = useState<string>('');
  const [ftValue, setFtValue] = useState<BigNumber>();

  const link = `https://explorer.stacks.co/txid/${parentTx.tx.tx_id}?chain=${currentNetwork.name}`;

  const openTransactionInExplorer = () => {
    Linking.openURL(link);
  };

  const getFtDisplayAmount = async () => {
    const assetMetaData = await getAssetMeta(
      ftTransfer.asset_identifier,
      fungibleTokensApi,
    );
    const title = `${assetMetaData?.name || 'Token'} Transfer`;
    setFtTitle(title);
    const displayAmount = calculateTokenTransferAmount(
      assetMetaData.decimals,
      ftTransfer.amount,
    );
    setFtValue(displayAmount);
  };

  useEffect(() => {
    getFtDisplayAmount();
  }, []);

  const caption = getTxCaption(parentTx.tx) ?? '';
  const isOriginator = ftTransfer.sender === selectedAccountState?.address;

  if (typeof ftValue === 'undefined') {
    return null;
  }
  const value = `${isOriginator ? '-' : ''}${ftValue.toFormat()}`;

  return (
    <TransactionItem
      onClickTransaction={openTransactionInExplorer}
      title={ftTitle}
      caption={caption}
      value={value}
      isOriginator={isOriginator}
    />
  );
};

interface TxTransfersProps {
  transaction: AddressTransactionWithTransfers;
}

const TxTransfers = ({ transaction, ...rest }: TxTransfersProps) => {
  return (
    <>
      {transaction.stx_transfers.map((stxTransfer, index) => (
        <StxTransferItem
          stxTransfer={stxTransfer}
          parentTx={transaction}
          {...rest}
          key={index}
        />
      ))}
      {transaction.ft_transfers
        ? transaction.ft_transfers.map((ftTransfer, index) => (
            <FtTransferItem
              ftTransfer={ftTransfer}
              parentTx={transaction}
              {...rest}
              key={index}
            />
          ))
        : null}
    </>
  );
};

interface AccountTransactionProps {
  transaction: AddressTransactionWithTransfers | Tx;
}

const AccountTransaction: React.FC<AccountTransactionProps> = props => {
  const { transaction } = props;
  if (!isAddressTransactionWithTransfers(transaction)) {
    return <StxTransferTransaction transaction={transaction} />;
  } // This is a normal Transaction or MempoolTransaction

  // Show transfer only for contract calls
  if (transaction.tx.tx_type !== 'contract_call') {
    return <StxTransferTransaction transaction={transaction.tx} />;
  }
  return (
    <>
      <TxTransfers transaction={transaction} />
      <StxTransferTransaction transaction={transaction.tx} />
    </>
  );
};

export default withSuspense(
  AccountTransaction,
  <Typography type="commonText">Loading</Typography>,
);
