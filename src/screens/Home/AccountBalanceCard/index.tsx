import React, {
  Suspense,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../components/shared/Typography';
import { ThemeContext } from '../../../contexts/Theme/theme';
import UpArrow from '../../../assets/images/upArrow.svg';
import DownArrow from '../../../assets/images/downArrow.svg';
import AccountBalanceCardStyles from './styles';
import { valueFromBalance } from '../../../shared/balanceUtils';
import { withSuspense } from '../../../components/shared/WithSuspense';
import { useAtomValue } from 'jotai/utils';
import { currentAccountAvailableStxBalanceState } from '../../../hooks/useAccounts/accountsStore';
import { useStxPriceValue } from '../../../hooks/useStxPrice/useStxPrice';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SendBottomSheet from '../../../components/SendBottomSheet';

const AccountBalanceCard: React.FC = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const balance = useAtomValue(currentAccountAvailableStxBalanceState);
  const price = useStxPriceValue();

  const sendRef = useRef<BottomSheetModal>(null);

  const handlePresentSend = useCallback(() => {
    sendRef.current?.snapToIndex(0);
  }, []);

  const amount = useMemo(() => {
    if (balance) {
      return valueFromBalance(balance, 'stx');
    }
    return 0;
  }, [balance]);
  const amountValue = (+amount * price).toFixed(2);

  return (
    <View
      style={[
        AccountBalanceCardStyles.container,
        {
          backgroundColor: colors.card,
        },
      ]}>
      <Typography type="commonText" style={{ color: colors.primary40 }}>
        Your Account Balance:
      </Typography>
      <View style={AccountBalanceCardStyles.balanceContainer}>
        <Suspense fallback={<Text>Loading</Text>}>
          <Typography
            type="bigTitle"
            style={[
              AccountBalanceCardStyles.balance,
              { color: colors.primary100 },
            ]}>
            {`$${amountValue}`}
          </Typography>
        </Suspense>
        <Typography
          type="commonText"
          style={[
            AccountBalanceCardStyles.currency,
            { color: colors.primary40 },
          ]}>
          USD
        </Typography>
      </View>
      <View style={AccountBalanceCardStyles.balanceActionsContainer}>
        <TouchableOpacity
          onPress={handlePresentSend}
          activeOpacity={0.9}
          style={[
            AccountBalanceCardStyles.balanceActionButton,
            AccountBalanceCardStyles.sendButton,
            {
              backgroundColor: colors.primary100,
            },
          ]}>
          <UpArrow />
          <Typography
            type="buttonText"
            style={[
              AccountBalanceCardStyles.balanceActionButtonText,
              { color: colors.white },
            ]}>
            Send
          </Typography>
        </TouchableOpacity>
        <Suspense fallback={<Text>Loading...</Text>}>
          <SendBottomSheet
            ref={sendRef}
            fullBalance={amountValue}
            price={price}
          />
        </Suspense>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            AccountBalanceCardStyles.balanceActionButton,
            {
              backgroundColor: colors.primary100,
            },
          ]}>
          <DownArrow />
          <Typography
            type="buttonText"
            style={[
              AccountBalanceCardStyles.balanceActionButtonText,
              { color: colors.white },
            ]}>
            Receive
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default withSuspense(AccountBalanceCard, <Text>Loading</Text>);
