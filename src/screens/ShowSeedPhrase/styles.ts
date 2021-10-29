import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL, PADDING_VERTICAL } from '../../shared/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTICAL,

    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    shadowOpacity: 0,
  },
  topContent: {
    alignItems: 'center',
    width: '90%',
    flex: 0.6,
    justifyContent: 'center',
  },
  title: { marginVertical: 10 },
  description: { textAlign: 'center' },
  bottomContent: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  seedTitle: { marginVertical: 10 },
});

export default styles;
