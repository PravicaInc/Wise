import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 12,
    marginVertical: 10,
  },
  transactionInformationContainer: {
    flexDirection: 'column',
  },
  tokenIconContainer: {
    position: 'relative',
  },
  transactionIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 6,
  },
});
