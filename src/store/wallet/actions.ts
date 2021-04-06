import {ThunkAction} from 'redux-thunk';
import {
  deriveRootKeychainFromMnemonic,
  deriveStxAddressChain,
  encryptMnemonicFormatted,
  getBlockchainIdentities,
  Wallet,
} from '@stacks/keychain';
import {
  WalletActions,
  RESTORE_WALLET,
  IS_RESTORING_WALLET,
  GENERATE_WALLET,
  SIGN_OUT,
} from './types';
// import {encryptMnemonic} from '@stacks/encryption';
import {ChainID} from '@blockstack/stacks-transactions';
// import {encryptMnemonicFormatted} from '../../helpers/helpers';
import {DEFAULT_GAIA_HUB} from '../../helpers/gaia';
import {BIP32Interface} from 'bip32';

export function didRestoreWallet(wallet: Wallet): WalletActions {
  return {
    type: RESTORE_WALLET,
    payload: wallet,
  };
}

export function didGenerateWallet(wallet: Wallet): WalletActions {
  return {
    type: GENERATE_WALLET,
    payload: wallet,
  };
}

function isRestoringWallet(): WalletActions {
  return {
    type: IS_RESTORING_WALLET,
  };
}

export function doSignOut(): WalletActions {
  return {
    type: SIGN_OUT,
  };
}

export function doStoreSeed(
  secretKey: string,
  password: string,
): ThunkAction<Promise<Wallet>, {}, {}, WalletActions> {
  return async (dispatch) => {
    dispatch(isRestoringWallet());
    const wallet = await restore(password, secretKey, ChainID.Mainnet);
    dispatch(didRestoreWallet(wallet));
    return wallet;
  };
}

console.warn("crffffffytsst",crypto.subtle)
export function doGenerateWallet(
  password: string,
): ThunkAction<Promise<Wallet>, {}, {}, WalletActions> {
  return async (dispatch) => {
    dispatch(isRestoringWallet());
    const wallet = await Wallet.generate(password, ChainID.Mainnet);
    dispatch(didGenerateWallet(wallet));
    return wallet;
  };
}

const restore = async (
  password: string,
  seedPhrase: string,
  chain: ChainID,
) => {
  try {
    const rootNode = await deriveRootKeychainFromMnemonic(seedPhrase);
    // const {encryptedMnemonicHex} = await encryptMnemonicFormatted(
    //   seedPhrase,
    //   password,
    // );
    // console.warn(encryptedMnemonicHex);
    const wallet = await createAccount({
      encryptedBackupPhrase: 'encryptedMnemonicHex',
      rootNode,
      chain,
    });

    return await wallet.restoreIdentities({
      rootNode,
      gaiaReadURL: DEFAULT_GAIA_HUB,
    });
  } catch (error) {
    alert(error);
  }
};

const createAccount = async ({
  encryptedBackupPhrase,
  rootNode,
  chain,
  identitiesToGenerate = 1,
}: {
  encryptedBackupPhrase: string;
  rootNode: BIP32Interface;
  chain: ChainID;
  identitiesToGenerate?: number;
}) => {
  const derivedIdentitiesKey = rootNode.deriveHardened(45).privateKey;
  if (!derivedIdentitiesKey) {
    throw new TypeError('Unable to derive config key for wallet identities');
  }
  const configPrivateKey = derivedIdentitiesKey.toString('hex');
  const {childKey: stxAddressKeychain} = deriveStxAddressChain(chain)(rootNode);
  const walletAttrs = await getBlockchainIdentities(
    rootNode,
    identitiesToGenerate,
  );

  return new Wallet({
    ...walletAttrs,
    chain,
    configPrivateKey,
    stacksPrivateKey: stxAddressKeychain.toBase58(),
    encryptedBackupPhrase,
  });
};
