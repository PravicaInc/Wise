import React, { useRef, useContext } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StackActions, useNavigation } from '@react-navigation/native';
import Onboarding1 from '../../assets/images/onboarding/onboarding1.svg';
import Onboarding2 from '../../assets/images/onboarding/onboarding2.svg';
import Onboarding3 from '../../assets/images/onboarding/onboarding3.svg';
import GeneralButton from '../../components/shared/GeneralButton';
import { Typography } from '../../components/shared/Typography';
import { ThemeContext } from '../../contexts/Theme/theme';
import styles from './styles';
import { UserPreferenceContext } from '../../contexts/UserPreference/userPreferenceContext';

const OnBoarding: React.FC = () => {
  const slider = useRef<any>();
  const { dispatch } = useNavigation();
  const { setViewedOnboarding } = useContext(UserPreferenceContext);
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const data = [
    {
      svg: Onboarding1,
      title: 'Manage Your Assets',
      body: 'WISE is a mobile wallet that you can use anywhere anytime. Only you own your assets.',
    },
    {
      svg: Onboarding2,
      title: 'Manage Your Accounts',
      body: 'To manage which account to authenticate or pay with. Each account could have its own identity.',
    },
    {
      svg: Onboarding3,
      title: 'Earn BTC',
      body: 'You can stack your STX through WISE and earn rewards in BTC without any kind of fees.',
    },
  ];

  type Item = typeof data[0];

  const keyExtractor = (item: Item) => item.title;

  const renderItem = ({ item }: { item: Item }) => {
    const Img = item.svg;
    return (
      <View style={styles.slide}>
        <Img width="300" />
        <Typography type="bigTitle" style={styles.title}>
          {item.title}
        </Typography>
        <Typography type="commonText" style={styles.body}>
          {item.body}
        </Typography>
      </View>
    );
  };

  const renderPagination = (activeIndex: number) => {
    const isDone = activeIndex >= data.length - 1;

    const handleNext = (index: number) => () =>
      slider.current?.goToSlide(index, true);

    const handleDone = () => {
      setViewedOnboarding(true);
      dispatch(StackActions.replace('WalletSetup'));
    };

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {data.length > 1 &&
            data.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex
                    ? { backgroundColor: colors.primary100 }
                    : { backgroundColor: colors.primary40 },
                ]}
                onPress={handleNext(i)}
              />
            ))}
        </View>
        <GeneralButton
          type={isDone ? 'activePrimary' : 'inactivePrimary'}
          onPress={isDone ? handleDone : undefined}>
          Get Started
        </GeneralButton>
      </View>
    );
  };

  const containerStyle = [styles.container, { backgroundColor: colors.white }];

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bottomButton
          data={data}
          renderPagination={renderPagination}
          ref={slider}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;
