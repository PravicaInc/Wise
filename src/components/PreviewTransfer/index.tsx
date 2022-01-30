import React, { useContext } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import styles from './styles';
import { ThemeContext } from '../../contexts/Theme/theme';
import { Typography } from '../shared/Typography';
import { truncateAddress } from '../../shared/addressUtils';
import useNetwork from '../../hooks/useNetwork/useNetwork';
import { AccountToken } from '../../models/account';
import TokenAvatar from '../Home/TokenAvatar';
import { capitalizeFirstLetter } from '../../shared/helpers';

type Props = {
  sender: string;
  recipient: string;
  memo?: string;
  amount: number;
  fees: number;
  selectedAsset: AccountToken;
  style?: StyleProp<ViewStyle> | undefined;
};

const PreviewTransfer = ({
  sender,
  recipient,
  memo,
  amount,
  fees,
  selectedAsset,
  style: externalStyle,
}: Props) => {
  const { currentNetwork } = useNetwork();

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const truncatedRecipient = truncateAddress(recipient, 11);
  const truncatedSender = truncateAddress(sender, 11);

  return (
    <View style={[styles.horizontalFill, externalStyle]}>
      <View
        style={[
          styles.previewCard,
          {
            backgroundColor: colors.card,
          },
        ]}>
        <Typography type="commonText" style={{ color: colors.primary40 }}>
          You Will Send
        </Typography>
        <View style={styles.assetPreview}>
          <View style={styles.row}>
            <TokenAvatar
              iconDimension={10.5}
              CustomIcon={selectedAsset.icon}
              customStyle={{ ...selectedAsset.defaultStyles, ...styles.avatar }}
              tokenName={selectedAsset.name}
            />
            <Typography style={{ color: colors.primary100 }} type="bigTitle">
              {amount}
            </Typography>
            <Typography
              style={[styles.assetName, { color: colors.primary40 }]}
              type="bigTitleR">
              {selectedAsset.name}
            </Typography>
          </View>
          {selectedAsset.name === 'STX' && (
            <Typography style={{ color: colors.primary100 }} type="commonText">
              Stacks Coin
            </Typography>
          )}
        </View>
        <View
          style={[styles.separator, { backgroundColor: colors.primary20 }]}
        />
        <View style={styles.transactionDetails}>
          <View>
            <Typography
              type="commonText"
              style={[styles.detailText, { color: colors.primary40 }]}>
              From
            </Typography>
            <Typography type="smallTitleR">{`(${truncatedSender})`}</Typography>
          </View>
          <View>
            <Typography
              type="commonText"
              style={[styles.detailText, { color: colors.primary40 }]}>
              To
            </Typography>
            <Typography type="smallTitleR">
              {`(${truncatedRecipient})`}
            </Typography>
          </View>
        </View>
        {!!memo && (
          <>
            <View
              style={[styles.separator, { backgroundColor: colors.primary20 }]}
            />
            <Typography
              type="commonText"
              style={[styles.detailText, { color: colors.primary40 }]}>
              Memo
            </Typography>
            <Typography type="commonText">{memo ? memo : ''}</Typography>
          </>
        )}
      </View>
      <View style={styles.horizontalFill}>
        <View style={styles.transactionMetadataItem}>
          <Typography type="commonText" style={{ color: colors.primary40 }}>
            Fees
          </Typography>
          {!fees ? (
            <ActivityIndicator color={colors.secondary100} />
          ) : (
            <Typography type="commonText" style={{ color: colors.primary40 }}>
              {`${fees} STX`}
            </Typography>
          )}
        </View>
        <View style={styles.transactionMetadataItem}>
          <Typography type="commonText" style={{ color: colors.primary40 }}>
            Network
          </Typography>
          <Typography type="commonText" style={{ color: colors.primary40 }}>
            {capitalizeFirstLetter(currentNetwork.name)}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default PreviewTransfer;
