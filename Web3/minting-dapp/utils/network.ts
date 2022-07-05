import 'dotenv/config';

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    return process.env['MNEMONIC_' + networkName.toUpperCase()] || '';
  }
  return '';
}

export function accounts(networkName?: string): [string] {
  return [getMnemonic(networkName)];
}

export function node_url(networkName: string): string {
  if (networkName) {
    if (networkName === 'localhost') {
      return 'http://localhost:8545';
    }

    return process.env['ETH_NODE_URI_' + networkName.toUpperCase()] || '';
  }

  return '';
}