import {decrypt} from '@stacks/keychain';
import React, {useState} from 'react';
import {
  Alert,
  Clipboard,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CodeField} from 'react-native-confirmation-code-field';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {popNavigation} from '../../../routes';
import {usePinCode} from '../../hooks/usePinCode';
import {selectCurrentWallet} from '../../store/wallet/selectors';
import {styles} from './styles';

const BackupIdentity: React.FC = () => {
  const goBack = () => popNavigation(dispatch);
  const {dispatch} = useNavigation();
  const [err, setError] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const wallet = useSelector(selectCurrentWallet);
  const {prop, ref, setValue, value, renderCell} = usePinCode(
    styles.cell,
    styles.focusCell,
    err.length > 0 ? styles.errCell : {},
  );

  const submit = async (text: string) => {
    try {
      setError('');
      const decryptedKey = await decrypt(wallet!.encryptedBackupPhrase, text);
      if (decryptedKey) {
        setSecretKey(decryptedKey);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError('Invalid PIN');
    }
  };

  const onSubmit = async () => {
    if (secretKey) {
      Clipboard.setString(secretKey);
      Alert.alert('Copied!');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.cardItem}>
          <Image
            style={styles.back}
            resizeMode="contain"
            source={require('../../assets/back_arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.desc}>
          In-order to decrypt your seed phrase you have to enter your PIN.
        </Text>
        {secretKey.length > 0 ? (
          <View style={styles.view}>
            <TextInput
              placeholder={'Your seed phrase'}
              placeholderTextColor={'black'}
              style={styles.textInput}
              editable={false}
              value={secretKey}
              textAlignVertical={'center'}
              multiline={true}
            />
            <TouchableOpacity onPress={onSubmit} style={styles.loginButton}>
              <Text style={styles.buttonText}>Copy Your Seed Phrase</Text>
              <Image
                style={styles.loginLogo}
                source={require('../../assets/copy.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.text}>Please enter your PIN</Text>
            <CodeField
              ref={ref}
              {...prop}
              value={value}
              onChangeText={setValue}
              autoFocus={true}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
            <Pressable
              disabled={value.length !== 4}
              onPress={() => submit(value)}
              style={[
                styles.loginButton,
                {opacity: value.length !== 4 ? 0.5 : 1},
              ]}>
              <Text style={styles.buttonText}>Restore</Text>
              <Image
                style={styles.loginLogo}
                source={require('../../assets/restore.png')}
              />
            </Pressable>
          </>
        )}
      </View>
    </>
  );
};

export default BackupIdentity;
