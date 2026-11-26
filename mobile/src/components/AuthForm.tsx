import { router } from 'expo-router';
import {
  type ComponentRef,
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  type TextInputInstance,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CheckIcon,
  ChevronLeftIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PersonIcon,
} from '@/components/AuthIcons';
import { GoogleMark } from '@/components/GoogleMark';
import type { AuthMessage } from '@/lib/auth';
import { colors, fonts, radius } from '@/theme';

/** Lets a field ask the screen to keep it above the keyboard once it is focused. */
const RevealContext = createContext<(field: TextInputInstance | null) => void>(() => {});

/**
 * A sign-in page: the back arrow and `top` at the top, `children` at the bottom. Android draws the
 * app edge to edge, so the keyboard covers the page instead of shrinking it; the page makes room
 * for it itself and scrolls the focused field above it.
 */
export function AuthScreen({
  top,
  back = true,
  children,
}: {
  top: ReactNode;
  back?: boolean;
  children: ReactNode;
}) {
  const scroller = useRef<ComponentRef<typeof ScrollView>>(null);
  const offset = useRef(0);
  const focused = useRef<TextInputInstance | null>(null);
  const [covered, setCovered] = useState(0);
  const coveredRef = useRef(0);

  const reveal = useCallback(() => {
    const field = focused.current;
    const page = scroller.current;
    if (!field || !page || !coveredRef.current) return;
    page.measureInWindow((_x, pageTop, _width, pageHeight) => {
      field.measureInWindow((_fx, fieldTop, _fwidth, fieldHeight) => {
        const visibleBottom = pageTop + pageHeight - coveredRef.current;
        const below = fieldTop + fieldHeight + fieldRoom - visibleBottom;
        const above = pageTop + fieldRoom - fieldTop;
        const by = below > 0 ? below : above > 0 ? -above : 0;
        if (by) page.scrollTo({ y: Math.max(0, offset.current + by), animated: true });
      });
    });
  }, []);

  useEffect(() => {
    const shown = Keyboard.addListener('keyboardDidShow', (event) => {
      scroller.current?.measureInWindow((_x, pageTop, _width, pageHeight) => {
        const overlap = Math.max(0, pageTop + pageHeight - event.endCoordinates.screenY);
        coveredRef.current = overlap;
        setCovered(overlap);
      });
    });
    const hidden = Keyboard.addListener('keyboardDidHide', () => {
      coveredRef.current = 0;
      setCovered(0);
    });
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, []);

  // Once the page has made room for the keyboard.
  useEffect(() => {
    if (!covered) return;
    const frame = requestAnimationFrame(reveal);
    return () => cancelAnimationFrame(frame);
  }, [covered, reveal]);

  const onFieldFocus = useCallback(
    (field: TextInputInstance | null) => {
      focused.current = field;
      requestAnimationFrame(reveal);
    },
    [reveal],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        ref={scroller}
        contentContainerStyle={[styles.content, { paddingBottom: contentBottom + covered }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => {
          offset.current = event.nativeEvent.contentOffset.y;
        }}
      >
        {back && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/welcome'))}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}
          >
            <ChevronLeftIcon color={colors.text} />
          </Pressable>
        )}
        {top}
        <View style={styles.spacer} />
        <RevealContext.Provider value={onFieldFocus}>{children}</RevealContext.Provider>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Room kept between the focused field and the keyboard or the top of the page. */
const fieldRoom = 24;
const contentBottom = 32;

export function AuthTitle({ children }: { children: string }) {
  return (
    <Text style={styles.title} accessibilityRole="header">
      {children}
    </Text>
  );
}

const fieldIcons = { mail: MailIcon, lock: LockIcon, person: PersonIcon };

/**
 * A field on a line, with an icon before it. `valid` shows a check after it; `password` hides what
 * is typed, with an eye after it to show it.
 */
export function LineField({
  ref,
  icon,
  valid,
  password,
  onFocus,
  onBlur,
  ...props
}: Omit<TextInputProps, 'secureTextEntry'> & {
  ref?: RefObject<TextInputInstance | null>;
  icon: keyof typeof fieldIcons;
  valid?: boolean;
  password?: boolean;
}) {
  const ownRef = useRef<TextInputInstance>(null);
  const input = ref ?? ownRef;
  const reveal = useContext(RevealContext);
  const [focused, setFocused] = useState(false);
  const [shown, setShown] = useState(false);
  const Icon = fieldIcons[icon];

  return (
    <View style={styles.lineField}>
      <Icon color={focused ? colors.text : colors.authTextMuted} />
      <TextInput
        {...props}
        ref={input}
        secureTextEntry={password && !shown}
        placeholderTextColor={colors.authTextMuted}
        selectionColor={colors.accent}
        cursorColor={colors.text}
        onFocus={(event) => {
          setFocused(true);
          reveal(input.current);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={styles.lineInput}
      />
      {valid && <CheckIcon color={colors.accent} />}
      {password && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={shown ? 'Hide password' : 'Show password'}
          hitSlop={12}
          onPress={() => setShown(!shown)}
        >
          <EyeIcon color={colors.authTextMuted} struck={!shown} />
        </Pressable>
      )}
      <View style={[styles.underline, focused && styles.underlineFocused]} />
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  busy?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, onPress, busy, disabled, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ busy, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles.primaryButton,
        style,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      {busy ? (
        <ActivityIndicator color={colors.primaryText} />
      ) : (
        <Text style={styles.primaryText}>{label}</Text>
      )}
    </Pressable>
  );
}

/** `light` gives it a white border and text, as on the welcome page. */
export function OutlineButton({
  label,
  onPress,
  busy,
  disabled,
  style,
  light,
  icon,
}: ButtonProps & { light?: boolean; icon?: ReactNode }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ busy, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles.outlineButton,
        light && styles.outlineButtonLight,
        style,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      {busy ? <ActivityIndicator color={colors.text} /> : icon}
      <Text style={[styles.outlineText, light && styles.outlineTextLight]}>{label}</Text>
    </Pressable>
  );
}

export function GoogleButton({ onPress, busy, disabled }: Omit<ButtonProps, 'label'>) {
  return (
    <OutlineButton
      label={busy ? 'Opening Google…' : 'Continue with Google'}
      onPress={onPress}
      busy={busy}
      disabled={disabled}
      icon={<GoogleMark size={18} />}
    />
  );
}

export function OrDivider() {
  return (
    <View
      style={styles.divider}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

export function FormMessage({ message }: { message: AuthMessage | null }) {
  if (!message) return null;

  return (
    <View accessibilityRole="alert" style={styles.message}>
      <Text style={styles.messageText}>{message.en}</Text>
      <Text style={styles.messageTranslation}>{message.nl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  back: {
    width: 44,
    height: 44,
    marginLeft: -14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 80,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 36,
    lineHeight: 44,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  lineField: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lineInput: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: colors.authInputBorder,
  },
  underlineFocused: {
    height: 2,
    backgroundColor: colors.text,
  },
  button: {
    height: 52,
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.primaryText,
    fontFamily: fonts.button,
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.authInputBorder,
  },
  outlineButtonLight: {
    borderColor: colors.text,
  },
  outlineText: {
    color: colors.authTextSoft,
    fontFamily: fonts.button,
    fontSize: 15,
  },
  outlineTextLight: {
    color: colors.text,
    fontFamily: fonts.button,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.authLine,
  },
  dividerText: {
    color: colors.authTextMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  message: {
    paddingHorizontal: 8,
    gap: 2,
  },
  messageText: {
    color: colors.danger,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  messageTranslation: {
    color: colors.authTextMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
});
