import { Button, Card } from 'heroui-native'
import { Platform, Text, View } from 'react-native'

import { ellipsify } from '@/src/shared/utils/ellipsify'

const noopWallet = () => ({
  account: null,
  connect: () => {},
  disconnect: () => {},
})

let useWallet: any = noopWallet

if (Platform.OS === 'android') {
  try {
    useWallet = require('@wallet-ui/react-native-kit').useMobileWallet
  } catch (e) {
    console.warn('useMobileWallet not available:', e)
  }
}

export function SolanaConnect() {
  const { account, connect, disconnect } = useWallet()

  if (Platform.OS !== 'android') {
    return (
      <Card className="gap-4">
        <Card.Body>
          <View className="gap-1">
            <Card.Title>Solana Wallet</Card.Title>
            <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
              Only available on Android
            </Text>
          </View>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="gap-4">
      <Card.Body>
        {account ? (
          <View className="gap-1">
            <Card.Title>{account.label}</Card.Title>
            <Text
              className="text-gray-500 text-xs dark:text-[#8A8A93]"
              numberOfLines={1}
            >
              {ellipsify(account.address)}
            </Text>
          </View>
        ) : (
          <View className="gap-1">
            <Card.Title>Solana Wallet</Card.Title>
          </View>
        )}
      </Card.Body>
      <Card.Footer>
        {account ? (
          <Button variant="outline" size="sm" onPress={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button variant="primary" className="w-full" onPress={connect}>
            Connect
          </Button>
        )}
      </Card.Footer>
    </Card>
  )
}
