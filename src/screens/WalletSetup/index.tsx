import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackActions, useNavigation } from '@react-navigation/native';

import Logo from '../../assets/wise.svg';
import LockAndStacks from '../../assets/lock-and-stacks.svg';

import GeneralButton from '../../components/shared/GeneralButton';
import { Typography } from '../../components/shared/Typography';
import { ThemeContext } from '../../contexts/Theme/theme';
import { WalletSetupFlow } from '../../navigation/types';

import styles from './styles';

const WalletSetup: React.FC = () => {
  const { dispatch } = useNavigation();
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const handleCreate = () =>
    dispatch(
      StackActions.push('CreatePassword', {
        flow: WalletSetupFlow.CreateWallet,
      }),
    );

  const handleRestore = () =>
    dispatch(
      StackActions.push('CreatePassword', {
        flow: WalletSetupFlow.RestoreWallet,
      }),
    );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Logo />
          <LockAndStacks />

          <Typography type={'bigTitle'} style={styles.title}>
            Seamless user experience, and Decentralized authentication
          </Typography>
          <View style={styles.buttonsContainer}>
            <GeneralButton type={'activePrimary'} onPress={handleCreate}>
              Create Wallet
            </GeneralButton>
            <GeneralButton
              type={'activeSecondary'}
              style={styles.bottomButton}
              onPress={handleRestore}>
              Restore Wallet
            </GeneralButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletSetup;
