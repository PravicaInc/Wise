import {AppState} from '..';
import {isWebUri} from 'valid-url';

export function isValidUrl(str: string) {
  return !!isWebUri(str);
}

export const selectCurrentScreen = (state: AppState) => state.onboarding.screen;

export const selectSecretKey = (state: AppState) => state.onboarding.secretKey;

export const selectHasCreatedPin = (state: AppState) =>
  state.onboarding.hasCreatedPin;

export const selectDecodedAuthRequest = (state: AppState) =>
  state.onboarding.decodedAuthRequest;

export const selectAuthRequest = (state: AppState) =>
  state.onboarding.authRequest;

export const selectAppName = (state: AppState) => state.onboarding.appName;

export const selectBundleID = (state: AppState) => state.onboarding.bundleID;

export const selectPackageName = (state: AppState) =>
  state.onboarding.packageName;

export const selectAppURLScheme = (state: AppState) =>
  state.onboarding.appURLScheme;

export const selectAppIcon = (state: AppState) => state.onboarding.appIcon;

export const selectMagicRecoveryCode = (state: AppState) =>
  state.onboarding.magicRecoveryCode;

export const selectUsername = (state: AppState) => state.onboarding.username;

export const selectAppURL = (state: AppState) => state.onboarding.appURL;

export const selectOnboardingProgress = (state: AppState) =>
  state.onboarding.onboardingInProgress;

export const selectOnboardingPath = (state: AppState) =>
  state.onboarding.onboardingPath;

/**
 * Select the fully qualified app icon. This allows developers to pass
 * a relative icon path in their `appDetails`.
 */
export const selectFullAppIcon = (state: AppState) => {
  let icon = selectAppIcon(state);
  const authRequest = selectDecodedAuthRequest(state);
  const absoluteURLPattern = /^https?:\/\//i;
  if (
    authRequest?.redirect_uri &&
    icon &&
    !absoluteURLPattern.test(icon) &&
    isValidUrl(authRequest.redirect_uri)
  ) {
    const url = new URL(authRequest.redirect_uri);
    url.pathname = icon;
    icon = url.toString();
  }
  return icon;
};
