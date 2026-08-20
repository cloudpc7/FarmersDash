import { cloneElement, isValidElement, memo, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { cn } from '../lib/cn';

const SIZES = ['sm', 'md', 'lg'];
const STATES = ['default', 'focused', 'error', 'disabled'];

function resolveToken(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function FormField({
  label,
  hint,
  error,
  control,
  children,
  size = 'md',
  state = 'default',
  required = false,
  testID,
}) {
  const [focused, setFocused] = useState(false);
  const resolvedSize = resolveToken(size, SIZES, 'md');
  const incomingState = resolveToken(state, STATES, 'default');
  const resolvedState = error ? 'error' : incomingState === 'default' && focused ? 'focused' : incomingState;
  const field = control ?? children;

  const decoratedControl = useMemo(() => {
    if (!isValidElement(field)) {
      return field;
    }

    return cloneElement(field, {
      className: cn('form-input-text', field.props.className),
      editable: resolvedState !== 'disabled' && field.props.editable !== false,
      onFocus: (event) => {
        setFocused(true);
        field.props.onFocus?.(event);
      },
      onBlur: (event) => {
        setFocused(false);
        field.props.onBlur?.(event);
      },
    });
  }, [field, resolvedState]);

  return (
    <View className={cn('form-field', `form-field-${resolvedSize}`)} testID={testID}>
      {label ? (
        <Text className="text-label">
          {label}
          {required ? ' *' : ''}
        </Text>
      ) : null}

      <View className={cn('form-control', `form-control-${resolvedSize}`, `form-control-${resolvedState}`)}>
        {decoratedControl}
      </View>

      {error ? <Text className="text-error-inline">{error}</Text> : null}
      {!error && hint ? <Text className="text-hint">{hint}</Text> : null}
    </View>
  );
}

export default memo(FormField);
