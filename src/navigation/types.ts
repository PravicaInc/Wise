import { AccountToken } from '../models/account';
import { SelectedFee } from '../shared/types';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  AssetDetails: { asset: AccountToken };
  OnBoarding: undefined;
  WalletSetup: undefined;
  ConfirmSeedPhrase: { seedPhrase: string; password: string };
  CreatePassword: {
    nextScreen: string;
    handleEditPassword: (
      oldPassword: string,
      newPassword: string,
    ) => Promise<any>;
  };
  SeedRestore: { password: string };
  OldPassword: { seedPhrase: string } | undefined;
  Settings: undefined;
  SendForm: { asset: AccountToken };
  previewTransaction: {
    amount: string;
    recipient: string;
    selectedFee: SelectedFee;
    memo: string;
    selectedAsset: AccountToken;
  };
  ManageAccounts: undefined;
  ChangePassword: undefined;
  CreateSeedPhrase: { password: string };
  RecoverSeedPhrase: undefined;
};
