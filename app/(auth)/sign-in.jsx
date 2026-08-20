import { Apple, Phone, ShieldCheck } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../src/ui/Button';
import FormField from '../../src/ui/FormField';
import Screen from '../../src/ui/Screen';
import { selectSession, setNotice, signInPlaceholder } from '../../src/store/slices/session';

const DEMO_OTP = '000000';

function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

export default function SignInScreen() {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [busy, setBusy] = useState(false);

  const phoneHint = useMemo(
    () => 'Paper auth only. No SMS, SNS, or carrier charge. Demo code is 000000.',
    [],
  );

  const requestDemoCode = () => {
    const normalized = digitsOnly(phone);
    if (normalized.length < 10) {
      setPhoneError('Enter a phone number with at least 10 digits.');
      return;
    }

    setPhoneError('');
    setCodeError('');
    setCode('');
    setStep('code');
    dispatch(setNotice('Demo code issued locally. Nothing was sent over the network.'));
  };

  const verifyDemoCode = () => {
    if (digitsOnly(code) !== DEMO_OTP) {
      setCodeError('Use the $0 demo code 000000.');
      return;
    }

    setBusy(true);
    dispatch(
      signInPlaceholder({
        method: 'phone',
        phone: digitsOnly(phone),
        notice: 'Signed in with the local fake-OTP path. Live SMS is not enabled.',
      }),
    );
  };

  return (
    <Screen>
      <ScrollView contentContainerClassName="stack" keyboardShouldPersistTaps="handled">
        <View className="stack-tight">
          <Text className="text-title">FarmersDash</Text>
          <Text className="text-subtitle">Cloud Drop Designs · working title only</Text>
        </View>

        <View className="card stack">
          <Text className="text-body">
            Auth is a placeholder. Google and Apple are listed for later OAuth. Phone uses a local
            fake OTP so this ticket stays at $0.
          </Text>

          <Button
            variant="outline"
            intent="neutral"
            size="lg"
            icon={ShieldCheck}
            onPress={() =>
              dispatch(setNotice('Google sign-in is on paper only. No client IDs or Firebase Auth are wired.'))
            }
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            intent="neutral"
            size="lg"
            icon={Apple}
            onPress={() =>
              dispatch(setNotice('Apple sign-in is on paper only. No App ID or SIWA keys were created.'))
            }
          >
            Continue with Apple
          </Button>
        </View>

        <View className="card stack">
          <FormField
            label="Phone"
            hint={step === 'phone' ? phoneHint : 'Demo number stays on this device.'}
            error={phoneError}
            state={phoneError ? 'error' : 'default'}
            required
            control={
              <TextInput
                value={phone}
                onChangeText={(value) => {
                  setPhone(value);
                  setPhoneError('');
                }}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
            }
          />

          {step === 'code' ? (
            <FormField
              label="Demo code"
              hint="Accepts 000000 only. No real SMS."
              error={codeError}
              state={codeError ? 'error' : 'default'}
              required
              control={
                <TextInput
                  value={code}
                  onChangeText={(value) => {
                    setCode(value);
                    setCodeError('');
                  }}
                  keyboardType="number-pad"
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  maxLength={6}
                />
              }
            />
          ) : null}

          {step === 'phone' ? (
            <Button variant="solid" intent="primary" size="lg" icon={Phone} onPress={requestDemoCode}>
              Get demo code
            </Button>
          ) : (
            <Button
              variant="solid"
              intent="primary"
              size="lg"
              icon={Phone}
              state={busy ? 'loading' : 'default'}
              onPress={verifyDemoCode}
            >
              Verify demo code
            </Button>
          )}
        </View>

        {session.notice ? (
          <View className="notice notice-warning">
            <Text className="text-muted">{session.notice}</Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
