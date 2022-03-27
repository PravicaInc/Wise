import React, { useContext } from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import { Typography } from '../../shared/Typography';
import { ThemeContext } from '../../../contexts/Theme/theme';
import { AccountToken } from '../../../models/account';
import TokenAvatar from '../TokenAvatar';
import styles from './styles';
import ExpandIcon from '../../../assets/expand.svg';
import { StackActions, useNavigation } from '@react-navigation/native';

interface AccountAssetProps {
  item: AccountToken;
  style?: StyleProp<ViewStyle>;
}

const LargeAccountAsset: React.FC<AccountAssetProps> = props => {
  const { item, style } = props;
  const { icon, name, amount, metaData, defaultStyles, value } = item;
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const { dispatch } = useNavigation();

  const goToAssetDetails = () =>
    dispatch(StackActions.push('AssetDetails', { asset: item }));

  const extraStyles = style ? [style] : [];

  let title, subtitle;

  if (name === 'STX') {
    title = 'Stacks Coins';
    subtitle = 'STX';
  } else {
    title = metaData?.name ?? name;
    subtitle = name;
  }

  return (
    <TouchableHighlight
      underlayColor={colors.primary10}
      onPress={goToAssetDetails}
      style={[
        styles.tokenCard,
        ...extraStyles,
        {
          backgroundColor: colors.card,
        },
      ]}>
      <>
        <View style={styles.tokenInformationContainer}>
          <TokenAvatar
            CustomIcon={icon}
            customStyle={defaultStyles}
            tokenName={metaData?.name ?? name}
          />
          <View style={styles.fullWidth}>
            <Typography
              style={{ color: colors.primary100 }}
              numberOfLines={1}
              type="smallTitleR">
              {title}
            </Typography>
            <Typography style={{ color: colors.primary40 }} type="commonText">
              {subtitle}
            </Typography>
          </View>
        </View>
        <View style={styles.balanceInformationContainer}>
          <Typography style={{ color: colors.primary40 }} type="smallText">
            Balance:
          </Typography>
          <Typography style={{ color: colors.primary100 }} type="midTitle">
            {amount}
          </Typography>
          <View style={styles.footer}>
            <Typography
              style={[styles.balanceValue, { color: colors.primary40 }]}
              type="commonText">
              {value ? value : ''}
            </Typography>
            <View
              style={[
                styles.expandIconContainer,
                { backgroundColor: colors.primary40 },
              ]}>
              <ExpandIcon />
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default LargeAccountAsset;