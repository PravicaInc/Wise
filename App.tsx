import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Theme, ThemeContext } from './src/contexts/Theme/theme';
import DefaultTheme from './src/themes/defaultTheme';
import UserPreference from './src/contexts/UserPreference/userPreference';
import { PortalProvider } from '@gorhom/portal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const [theme, setTheme] = useState<Theme>(DefaultTheme);

  return (
    <UserPreference>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <PortalProvider>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <Routes />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </PortalProvider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </UserPreference>
  );
}
