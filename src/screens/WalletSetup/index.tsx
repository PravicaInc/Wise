import React, { useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackActions, useNavigation } from '@react-navigation/native';

import Logo from '../../assets/wise.svg';
import LockAndStacks from '../../assets/lock-and-stacks.svg';

import CustomButton from '../../components/shared/CustomButton';
import { MyText } from '../../components/shared/myText';
import { ThemeContext } from '../../contexts/theme';

import styles from './styles';

const WalletSetup: React.FC = () => {
  const { dispatch } = useNavigation();
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const disclaimerStyle = [styles.disclaimer, { color: colors.inactive }];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Logo />
        <LockAndStacks />

        <MyText type={'bigTitle'} style={styles.title}>
          Seamless experience for your decentralized authentication
        </MyText>
        <View style={styles.buttonsContainer}>
          <CustomButton type={'activePrimary'}>Create Account</CustomButton>
          <CustomButton type={'activeSecondary'} style={styles.bottomButton}>
            Restore Account
          </CustomButton>
        </View>
        <MyText type={'commonText'} style={disclaimerStyle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industryLorem Ipsum has beenLorem Ipsum is simply dummy text of the.
        </MyText>
      </View>
    </SafeAreaView>
  );
};

export default WalletSetup;
