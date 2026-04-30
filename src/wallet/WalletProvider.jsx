// WalletProvider — Future Privy integration
// Phase 2: Wrap app with PrivyProvider, auto-create Solana wallet on login.
// Config: embeddedWallets.solana.createOnLogin = 'users-without-wallets'
// Auth: Firebase JWT passthrough
// MFA: Passkeys supported on all Privy plans

export default function WalletProvider({ children }) {
  return children
}
