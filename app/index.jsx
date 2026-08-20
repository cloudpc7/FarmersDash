import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectSession } from '../src/store/slices/session';

export default function Index() {
  const session = useSelector(selectSession);

  if (session.status === 'signedIn') {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
