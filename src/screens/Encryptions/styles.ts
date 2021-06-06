import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {isWideScreen} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    padding: 44,
    paddingTop: isWideScreen ? 64 : 20,
    paddingHorizontal: 28,
    backgroundColor: 'white',
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
  loginLogo: {width: 24, height: 24},
  buttonText: {color: theme.colors.white, fontSize: 14},
});
