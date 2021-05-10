import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 44,
    paddingTop: 64,
    paddingHorizontal: 28,
  },
  loginButton: {
    padding: 8,
    backgroundColor: theme.colors.badgeBackground,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    marginTop: 45,
    height: 48,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.75,
    shadowRadius: 1,
  },
  loginLogo: {width: 24, height: 24, marginRight: 9},
  buttonText: {color: theme.colors.white, fontSize: 14},
});
