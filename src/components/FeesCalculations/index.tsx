import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/Theme/theme';
import styles from './styles';
import {
  EstimationsLevels,
  FeeEstimationWithLevels,
  SelectedFee,
} from '../../shared/types';
import { useAccounts } from '../../hooks/useAccounts/useAccounts';
import { microStxToStx } from '../../shared/balanceUtils';
import { Typography } from '../shared/Typography';
import EditPenIcon from '../../assets/icon-edit-pen.svg';
import ChangeFeesBottomSheet from '../ChangeFeesBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AccountToken } from '../../models/account';
import BigNumber from 'bignumber.js';

interface IProps {
  selectedAsset: AccountToken;
  isSigning?: boolean;
  recipient?: string;
  amount?: string;
  memo?: string;
  setSelectedFee: (val?: SelectedFee) => void;
  selectedFee?: SelectedFee;
}

export const FeesCalculations: React.FC<IProps> = ({
  selectedAsset,
  recipient,
  memo,
  amount,
  selectedFee,
  isSigning,
  setSelectedFee,
}) => {
  const [fees, setFees] = useState<FeeEstimationWithLevels[]>([]);
  const speedTransactionsRef = useRef<BottomSheetModal>(null);
  const { estimateTransactionFees } = useAccounts();
  const [isCalculatingFees, toggleCalculatingFees] = useState<boolean>(true);
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  useEffect(() => {
    toggleCalculatingFees(true);
  }, []);
  useEffect(() => {
    if (!recipient || !amount) {
      return;
    }

    const timer = setTimeout(() => {
      estimateTransactionFees(
        selectedAsset,
        recipient,
        new BigNumber(amount).toNumber(),
        memo,
      ).then(transactionFees => {
        setFees(transactionFees);
        setSelectedFee({
          fee: microStxToStx(transactionFees[1].fee).toString(),
          level: EstimationsLevels.Middle,
        });
        toggleCalculatingFees(false);
      });
    }, 500);
    () => clearTimeout(timer);
  }, [amount, recipient, memo]);
  const handlePresentSpeedTransactions = useCallback(() => {
    speedTransactionsRef.current?.snapToIndex(0);
  }, []);
  return (
    <>
      <ChangeFeesBottomSheet
        fees={fees}
        setSelectedFee={setSelectedFee}
        selectedFee={selectedFee}
        ref={speedTransactionsRef}
      />
      {!isSigning && (
        <View
          style={[styles.separator, { backgroundColor: colors.primary20 }]}
        />
      )}
      <View style={styles.feesWrapper}>
        <Typography type="smallTitleR" style={{ color: colors.primary40 }}>
          Transaction Fees
        </Typography>
        <View style={styles.calculationWrapper}>
          <TouchableOpacity
            onPress={handlePresentSpeedTransactions}
            style={styles.changeFeesButton}
            activeOpacity={0.6}>
            <EditPenIcon />
            <Typography
              type="smallTitleR"
              style={{ color: colors.secondary100 }}>
              Change
            </Typography>
          </TouchableOpacity>
          {isCalculatingFees ? (
            <View style={styles.calculationWrapper}>
              <ActivityIndicator color={colors.primary100} />
              <Typography
                type="commonText"
                style={[styles.calculationText, { color: colors.primary100 }]}>
                Calculating
              </Typography>
            </View>
          ) : (
            <Typography type="smallTitleR" style={{ color: colors.primary100 }}>
              {`${selectedFee?.fee} STX`}
            </Typography>
          )}
        </View>
      </View>
      {selectedFee && (
        <Typography
          type="commonText"
          style={[styles.feeLevel, { color: colors.primary40 }]}>
          {selectedFee?.level}
        </Typography>
      )}
    </>
  );
};
