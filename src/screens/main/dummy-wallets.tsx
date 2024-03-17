export interface ReactWallet {
  name: string;
  mnemonic: string;
  lastUSDValue: number;
}

export const dummyWallets: ReactWallet[] = [
  {
    name: 'Main',
    mnemonic:
      'body ahead ramp choose hen margin cat pioneer empower coral grace raise',
    lastUSDValue: 22800,
  },
  {
    name: 'Main',
    mnemonic:
      'body ahead ramp choose hen margin cat pioneer empower coral grace raise',
    lastUSDValue: 33700,
  },
];
