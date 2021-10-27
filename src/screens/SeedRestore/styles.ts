import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL, PADDING_VERTICAL } from '../../shared/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { shadowOpacity: 0 },
  keyboardContainer: {
    flex: 1,
  },
  scrollableContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: PADDING_VERTICAL,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%',
  },
  topContent: {
    alignItems: 'center',
    flex: 0.75,
    width: '100%',
    justifyContent: 'center',
  },
  title: { marginVertical: 10 },
  description: { textAlign: 'center' },
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  seedTitle: { marginVertical: 10 },
  seedInputContainer: {
    height: '50%',
    width: '100%',
  },
  seedInput: {
    paddingVertical: 10,
    textAlignVertical: 'top',
    flex: 1,
  },
  button: {
    marginTop: 'auto',
  },
});

export default styles;
