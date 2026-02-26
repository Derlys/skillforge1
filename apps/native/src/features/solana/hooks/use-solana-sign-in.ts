import { getBase58Decoder, getBase64Encoder } from '@solana/kit'
import type {
  SolanaAuthNonceResponse,
  SolanaAuthVerifyResponse,
} from '@solana-mobile-stack/better-auth-solana/client'
import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { queryClient } from '@/src/shared/api/orpc'
import { authClient } from '@/src/shared/auth/auth-client'

const noopWallet = () => ({
  account: null,
  connect: async () => ({ address: '' }),
  signIn: async (_params: any) => ({ signature: '', message: '' }),
})

let useWallet: any = noopWallet

if (Platform.OS === 'android') {
  try {
    useWallet = require('@wallet-ui/react-native-kit').useMobileWallet
  } catch (e) {
    console.warn('useMobileWallet not available:', e)
  }
}

export function useSolanaSignIn() {
  const { account, connect, signIn } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert(
        'Not Available',
        'Solana sign in is only available on Android',
      )
      return
    }

    setIsLoading(true)
    try {
      const activeAccount = account || (await connect())
      const address = activeAccount.address

      const { data: nonce, error: nonceError } =
        await authClient.$fetch<SolanaAuthNonceResponse>('/solana-auth/nonce', {
          method: 'POST',
          body: { walletAddress: address },
        })

      if (nonceError || !nonce) {
        throw new Error(nonceError?.message || 'Failed to get nonce')
      }

      const result = await signIn({
        address,
        domain: nonce.domain,
        nonce: nonce.nonce,
        statement: 'Sign in to solana-mobile-stack',
      })

      // Convert MWA result: both are Base64 strings
      const signatureBase58 = getBase58Decoder().decode(
        getBase64Encoder().encode(result.signature),
      )
      const messageUtf8 = new TextDecoder().decode(
        getBase64Encoder().encode(result.message),
      )

      const { data: verifyData, error: verifyError } =
        await authClient.$fetch<SolanaAuthVerifyResponse>(
          '/solana-auth/verify',
          {
            method: 'POST',
            body: {
              walletAddress: address,
              signature: signatureBase58,
              message: messageUtf8,
            },
          },
        )

      if (verifyError || !verifyData) {
        throw new Error(verifyError?.message || 'Verification failed')
      }

      queryClient.invalidateQueries()
      await authClient.getSession()
    } catch (error) {
      console.error('Solana sign in failed', error)
      Alert.alert(
        'Sign In Failed',
        error instanceof Error ? error.message : String(error),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSignIn,
    isLoading,
  }
}
