import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { ResolvedTheme, ThemeOverride } from '@theme-types/theme.js';
import { DefaultTheme } from '@themes/default.js';
import { createTheme } from '@utils/create-theme.js';
import {
  buildCssVars,
  buildSemanticCssVars,
  injectCssVars,
  removeCssVars,
} from '@utils/inject-css-vars.js';

type ThemeContextValue = {
  theme: ResolvedTheme;
  colorScheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: DefaultTheme,
  colorScheme: 'light',
});

export const useInzumerTheme = (): ThemeContextValue => useContext(ThemeContext);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type InzumerProviderProps = {
  children: ReactNode;
  theme?: ThemeOverride;
  colorScheme?: 'light' | 'dark';
  targetElement?: HTMLElement;
};

export const InzumerProvider = ({
  children,
  theme: themeOverride,
  colorScheme = 'light',
  targetElement,
}: InzumerProviderProps) => {
  const resolvedTheme = useMemo(() => createTheme(themeOverride ?? {}), [themeOverride]);

  const cssVarsRef = useRef<Record<string, string>>({});

  useIsomorphicLayoutEffect(() => {
    const el = targetElement ?? (typeof document !== 'undefined' ? document.documentElement : null);

    if (!el) {
      return;
    }

    const prev = cssVarsRef.current;

    if (Object.keys(prev).length > 0) {
      removeCssVars(prev, el);
    }

    const vars = {
      ...buildCssVars(resolvedTheme.base.colors),
      ...buildSemanticCssVars(themeOverride?.semantic),
    };

    injectCssVars(vars, el);

    cssVarsRef.current = vars;

    el.dataset['colorScheme'] = colorScheme;

    return () => {
      removeCssVars(cssVarsRef.current, el);
    };
  }, [resolvedTheme, themeOverride, colorScheme, targetElement]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme: resolvedTheme, colorScheme }),
    [resolvedTheme, colorScheme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
