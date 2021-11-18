import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import WalletSetup from '../screens/WalletSetup';
import SeedConfirmation from '../screens/SeedConfirmation';
import CreatePassword from '../screens/CreatePassword';
import SeedRestore from '../screens/SeedRestore';
import OldPassword from '../screens/OldPassword';
import Settings from '../screens/Settings';
import ChangePassword from '../screens/ChangePassword';
import ShowSeedPhrase from '../screens/ShowSeedPhrase';
import RecoverSeedPhrase from '../screens/RecoverSeedPhrase';
import { RootStackParamList } from './types';
import Login from '../screens/Login';

const Stack = createStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding"
        component={Onboarding}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="WalletSetup"
        component={WalletSetup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SeedConfirmation"
        component={SeedConfirmation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreatePassword"
        component={CreatePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SeedRestore"
        component={SeedRestore}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OldPassword"
        component={OldPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShowSeedPhrase"
        component={ShowSeedPhrase}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecoverSeedPhrase"
        component={RecoverSeedPhrase}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default Routes;
