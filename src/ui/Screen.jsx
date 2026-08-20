import { memo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../lib/cn';

function Screen({ children, padded = true, testID }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn(padded ? 'screen-padded' : 'screen')}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      testID={testID}
    >
      {children}
    </View>
  );
}

export default memo(Screen);
