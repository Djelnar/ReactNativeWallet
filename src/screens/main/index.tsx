import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {MD3Theme, useTheme} from 'react-native-paper';
import {useLogin} from '../../shared/use-login';
import {ReactWallet} from './dummy-wallets';
import {decryptWallet, encryptWallet} from './wallet-crypto';

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    sheetRoot: {
      flex: 1,
    },
    sheetBackground: {
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowOpacity: 0.4,
      shadowRadius: 14,
    },
    sheetView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

export function Main() {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [wallets, setWallets] = useState<ReactWallet[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {passkey} = useLogin();

  const loadWallets = useCallback(async () => {
    let walletsBase64 = await EncryptedStorage.getItem('wallets');
    if (walletsBase64 == null) {
      const emptyWallets = encryptWallet([], passkey!);
      await EncryptedStorage.setItem('wallets', emptyWallets);
    }
    walletsBase64 = await EncryptedStorage.getItem('wallets');
    const walletsData = decryptWallet(walletsBase64!, passkey!);
    setWallets(walletsData);
    if (walletsData.length === 0) {
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 100);
    }
  }, [passkey]);

  useEffect(() => {
    loadWallets();
  }, [loadWallets]);

  return (
    <View style={styles.root}>
      <Text>{passkey}</Text>
      <BottomSheet
        backgroundStyle={styles.sheetBackground}
        enablePanDownToClose
        index={-1}
        style={styles.sheetRoot}
        ref={bottomSheetRef}
        snapPoints={['90%']}>
        <BottomSheetView style={styles.sheetView}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
