import { memo, useMemo } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../lib/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VARIANTS = ['solid', 'outline', 'ghost'];
const INTENTS = ['primary', 'secondary', 'danger', 'neutral'];
const SIZES = ['sm', 'md', 'lg'];
const STATES = ['default', 'loading', 'disabled'];

function resolveToken(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function labelClass({ variant, intent, size }) {
  const sizeClass = size === 'sm' ? 'btn-label-sm' : size === 'lg' ? 'btn-label-lg' : '';

  if (variant === 'solid') {
    return cn('btn-label', 'btn-label-on-solid', sizeClass);
  }

  return cn('btn-label', `btn-label-${intent}`, sizeClass);
}

function iconClass({ variant, intent }) {
  if (variant === 'solid') {
    return 'text-text-inverse';
  }

  if (intent === 'primary') {
    return 'text-primary-600';
  }

  if (intent === 'danger') {
    return 'text-error';
  }

  return 'text-text';
}

function Button({
  children,
  onPress,
  variant = 'solid',
  intent = 'primary',
  size = 'md',
  state = 'default',
  icon: Icon,
  accessibilityLabel,
  testID,
}) {
  const resolvedVariant = resolveToken(variant, VARIANTS, 'solid');
  const resolvedIntent = resolveToken(intent, INTENTS, 'primary');
  const resolvedSize = resolveToken(size, SIZES, 'md');
  const resolvedState = resolveToken(state, STATES, 'default');
  const isBusy = resolvedState === 'loading';
  const isDisabled = resolvedState === 'disabled' || isBusy;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const className = useMemo(
    () =>
      cn(
        'btn',
        `btn-${resolvedSize}`,
        `btn-${resolvedVariant}-${resolvedIntent}`,
        isDisabled && 'btn-disabled',
      ),
    [isDisabled, resolvedIntent, resolvedSize, resolvedVariant],
  );

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: isBusy }}
      className={className}
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={() => {
        if (!isDisabled) {
          scale.value = withTiming(0.98, { duration: 80 });
        }
      }}
      onPressOut={() => {
        if (!isDisabled) {
          scale.value = withSpring(1);
        }
      }}
      style={animatedStyle}
      testID={testID}
    >
      {isBusy ? <ActivityIndicator /> : null}
      {!isBusy && Icon ? <Icon className={iconClass({ variant: resolvedVariant, intent: resolvedIntent })} /> : null}
      {children ? (
        <Text className={labelClass({ variant: resolvedVariant, intent: resolvedIntent, size: resolvedSize })}>
          {children}
        </Text>
      ) : null}
    </AnimatedPressable>
  );
}

export default memo(Button);
