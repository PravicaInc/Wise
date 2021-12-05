import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL } from '../../shared/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hiddenItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: { marginTop: '5%' },
  back: {
    marginLeft: PADDING_HORIZONTAL,
  },
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  scrollableContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: { marginVertical: 10 },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: '6%',
  },
  input: {
    height: 60,
  },
  inputGuide: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caution: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordStrength: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomInput: {
    marginTop: 24,
  },
  switchGroupContainer: { width: '100%', marginVertical: 20 },
  switchTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: { flex: 0.72 },
  fingerprintContainer: {
    flex: 0.08,
  },
  switch: { flex: 0.2, alignItems: 'flex-end' },
  switchBottom: {
    width: '100%',
    flexDirection: 'row',
  },
  switchDescription: {
    flex: 0.72,
  },
  pusher: {
    marginTop: 'auto',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    height: 60,
  },
});

export default styles;
