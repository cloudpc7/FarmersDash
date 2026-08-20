import { LogOut } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../src/ui/Button';
import Screen from '../../src/ui/Screen';
import { selectSession, signOut } from '../../src/store/slices/session';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  return (
    <Screen>
      <View className="stack">
        <View className="stack-tight">
          <Text className="text-title">FarmersDash</Text>
          <Text className="text-subtitle">Cloud Drop Designs · mobile stack is installed</Text>
        </View>

        <View className="card stack-tight">
          <Text className="text-label">Session</Text>
          <Text className="text-body">Method: {session.method ?? 'none'}</Text>
          {session.phone ? <Text className="text-body">Phone: {session.phone}</Text> : null}
          {session.notice ? <Text className="text-muted">{session.notice}</Text> : null}
        </View>

        <View className="card stack-tight">
          <Text className="text-label">Locked stack</Text>
          <Text className="text-muted">Expo + expo-dev-client · not Expo Go</Text>
          <Text className="text-muted">Expo Router · NativeWind · Reanimated · Gesture Handler</Text>
          <Text className="text-muted">Redux Toolkit + encrypted MMKV persist</Text>
          <Text className="text-muted">Lucide icons only</Text>
          <Text className="text-muted">Android package com.clouddropdesigns.farmersdash</Text>
        </View>

        <Button variant="solid" intent="secondary" size="md" icon={LogOut} onPress={() => dispatch(signOut())}>
          Sign out
        </Button>
      </View>
    </Screen>
  );
}
