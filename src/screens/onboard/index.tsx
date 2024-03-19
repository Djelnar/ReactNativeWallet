import {nanoid} from 'nanoid/non-secure';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Button, MD3Theme, Text, useTheme} from 'react-native-paper';
import {useLogin} from '../../shared/use-login';
import {FaceIDIcon} from './face-id-svg';

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background,
      flex: 1,
      alignItems: 'center',
    },
    enableFaceId: {
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    faceIdIcon: {
      width: 120,
      height: 120,
      marginTop: 120,
      marginBottom: 120,
    },
  });

export function Onboard() {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const controller = useRef(
    new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    }),
  );
  const [biometricsAvailable, setBiometricsAvailable] = useState<
    boolean | null
  >(null);
  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean | null>(
    null,
  );
  const [canProceed, setCanProceed] = useState<boolean | null>(null);
  const [keySaved, setKeySaved] = useState('');
  const {setLoggedIn, setPasskey} = useLogin();
  const [loaded, setLoaded] = useState(false);

  const checkBiometricsAvailable = useCallback(async () => {
    try {
      const {available} = await controller.current.isSensorAvailable();
      if (available) {
        setBiometricsAvailable(true);
      } else {
        throw new Error('Biometrics not available');
      }
    } catch {
      setBiometricsAvailable(false);
    }
  }, []);

  const checkBiometricsEnabled = useCallback(async () => {
    const key = await EncryptedStorage.getItem('cryptoAppKey');
    if (typeof key === 'string' && key.length === 32) {
      setBiometricsEnabled(true);
    } else {
      setBiometricsEnabled(false);
    }
  }, []);

  const startEffect = useCallback(async () => {
    await checkBiometricsAvailable();
    await checkBiometricsEnabled();
    setLoaded(true);
  }, [checkBiometricsAvailable, checkBiometricsEnabled]);

  useEffect(() => {
    startEffect();
  }, [startEffect]);

  useEffect(() => {
    if (canProceed) {
      setPasskey(keySaved);
      setLoggedIn(true);
    }
  }, [canProceed, setLoggedIn, setPasskey, keySaved]);

  const setupBiometrics = useCallback(async () => {
    if (!biometricsAvailable || biometricsEnabled) return;
    try {
      const {error, success} = await controller.current.simplePrompt({
        promptMessage: 'Enable FaceID',
      });
      if (error || !success) {
        throw new Error(error ?? 'Error');
      }
      if (success) {
        const key = nanoid(32);
        await EncryptedStorage.setItem('cryptoAppKey', key);
        setBiometricsEnabled(true);
        setKeySaved(key);
        setCanProceed(true);
      }
    } catch (error) {
      await EncryptedStorage.removeItem('cryptoAppKey');
      Alert.alert(String(error));
    }
  }, [biometricsAvailable, biometricsEnabled]);

  const login = useCallback(async () => {
    try {
      const {error, success} = await controller.current.simplePrompt({
        promptMessage: 'Decrypt wallets',
      });
      if (error || !success) {
        throw new Error(error ?? 'Error');
      }
      if (success) {
        const key = await EncryptedStorage.getItem('cryptoAppKey');
        setKeySaved(key!);
        setCanProceed(true);
      }
    } catch (error) {
      Alert.alert(String(error));
    }
  }, []);

  return (
    <View style={styles.root}>
      {loaded && biometricsAvailable && !biometricsEnabled && (
        <View style={styles.enableFaceId}>
          <FaceIDIcon
            style={styles.faceIdIcon}
            color={theme.colors.surfaceDisabled}
          />
          <Button mode="contained" onPress={setupBiometrics}>
            Enable FaceID
          </Button>
        </View>
      )}
      {!biometricsAvailable && (
        <View style={styles.enableFaceId}>
          <Text>
            Biometric profile is not set up or the device does not have any
            sensors
          </Text>
        </View>
      )}
      {biometricsAvailable && biometricsEnabled && !canProceed && (
        <View style={styles.enableFaceId}>
          <FaceIDIcon
            style={styles.faceIdIcon}
            color={theme.colors.surfaceDisabled}
          />
          <Button mode="text" onPress={login}>
            Login
          </Button>
        </View>
      )}
    </View>
  );
}
