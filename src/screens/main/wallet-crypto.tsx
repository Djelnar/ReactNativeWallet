import {ReactWallet} from './dummy-wallets';

export const encryptWallet = (data: ReactWallet[], key: string) => {
  const json = JSON.stringify(data);
  return json;
};

export const decryptWallet = (
  encrypted: string,
  key: string,
): ReactWallet[] => {
  const data = JSON.parse(encrypted);
  return data;
};
