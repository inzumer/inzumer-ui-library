import { Button, Modal, RichText, Switch } from '@components';
import { cn } from '@utils';
import { useId, useState, type ReactNode } from 'react';
import {
  cookieBannerActionsStyles,
  cookieBannerButtonStyles,
  cookieBannerContentStyles,
  cookieBannerStyles,
  cookieBannerTitleStyles,
  cookieCategoryHeaderStyles,
  cookieCategoryListStyles,
  cookieCategoryRequiredStyles,
  cookieCategoryStyles,
  cookieCategoryTitleStyles,
  cookiePreferencesIntroStyles,
  cookieTextStyles,
} from './CookieConsent.styles';

export interface CookieCategory {
  id: string;
  title: string;
  description: ReactNode;
  /** Strictly necessary cookies can't be turned off; they show `labels.required` instead of a switch. */
  required?: boolean;
}

/** Whether each optional category is allowed, by id. */
export type CookieChoices = Record<string, boolean>;

/** `banner` until answered, `modal` preferences opened from outside, or `inline` settings. */
export type CookieConsentMode = 'banner' | 'modal' | 'inline';

export interface CookieConsentLabels {
  /** Banner title. */
  title: ReactNode;
  /** Banner text; usually ends with a link to the privacy policy. */
  description: ReactNode;
  accept: string;
  reject: string;
  customize: string;
  preferencesTitle: ReactNode;
  preferencesDescription?: ReactNode;
  save: string;
  cancel: string;
  /** Shown instead of a switch on required categories, e.g. "Always on". */
  required: string;
}

export interface CookieConsentProps {
  mode: CookieConsentMode;
  categories: CookieCategory[];
  /** The saved answer, or `null` while the person hasn't answered. */
  value: CookieChoices | null;
  /** Called with the full answer: accept or reject all, the saved preferences, or a switch (inline). */
  onChange: (value: CookieChoices) => void;
  labels: CookieConsentLabels;
  /** Preferences dialog visibility, to open it from outside (e.g. a footer link). Optional in `banner`. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Stable ids for buttons and switches, e.g. for analytics click triggers. */
  getId?: (kind: 'button' | 'switch', name: string) => string;
  className?: string;
}

const choicesFor = (categories: CookieCategory[], enabled: boolean): CookieChoices =>
  Object.fromEntries(
    categories.filter((category) => !category.required).map(({ id }) => [id, enabled]),
  );

interface CategoryListProps {
  categories: CookieCategory[];
  value: CookieChoices;
  onToggle: (id: string, enabled: boolean) => void;
  requiredLabel: string;
  switchId: (name: string) => string;
}

const CategoryList = ({
  categories,
  value,
  onToggle,
  requiredLabel,
  switchId,
}: CategoryListProps) => (
  <ul className={cookieCategoryListStyles}>
    {categories.map((category) => {
      const descriptionId = `${switchId(category.id)}-description`;

      return (
        <li key={category.id} className={cookieCategoryStyles}>
          <div className={cookieCategoryHeaderStyles}>
            {category.required ? (
              <>
                <RichText as="h3" variant="p2" className={cookieCategoryTitleStyles}>
                  {category.title}
                </RichText>
                <RichText as="span" variant="p4" className={cookieCategoryRequiredStyles}>
                  {requiredLabel}
                </RichText>
              </>
            ) : (
              <Switch
                id={switchId(category.id)}
                label={category.title}
                checked={value[category.id] === true}
                onCheckedChange={(checked) => onToggle(category.id, checked)}
                aria-describedby={descriptionId}
              />
            )}
          </div>
          <RichText as="p" id={descriptionId} variant="p3" className={cookieTextStyles}>
            {category.description}
          </RichText>
        </li>
      );
    })}
  </ul>
);

/** Controlled cookie consent in three modes; accepting and rejecting weigh the same (GDPR). */
export const CookieConsent = ({
  mode,
  categories,
  value,
  onChange,
  labels,
  open,
  onOpenChange,
  getId,
  className,
}: CookieConsentProps) => {
  const baseId = useId();
  const id = (kind: 'button' | 'switch', name: string) =>
    getId ? getId(kind, name) : `${baseId}-${kind}-${name}`;
  const titleId = useId();
  const [innerOpen, setInnerOpen] = useState(false);
  const [draft, setDraft] = useState<CookieChoices>({});
  const preferencesOpen = open ?? innerOpen;
  const [wasOpen, setWasOpen] = useState(preferencesOpen);

  if (preferencesOpen !== wasOpen) {
    setWasOpen(preferencesOpen);
    if (preferencesOpen) {
      setDraft({ ...choicesFor(categories, false), ...value });
    }
  }

  const setOpen = (next: boolean) => {
    setInnerOpen(next);
    onOpenChange?.(next);
  };

  const toggle = (categoryId: string, enabled: boolean) =>
    mode === 'inline'
      ? onChange({ ...choicesFor(categories, false), ...value, [categoryId]: enabled })
      : setDraft((current) => ({ ...current, [categoryId]: enabled }));

  if (mode === 'inline') {
    return (
      <div className={className}>
        <CategoryList
          categories={categories}
          value={value ?? {}}
          onToggle={toggle}
          requiredLabel={labels.required}
          switchId={(name) => id('switch', name)}
        />
      </div>
    );
  }

  return (
    <>
      {mode === 'banner' && value === null && !preferencesOpen && (
        <section aria-labelledby={titleId} className={cn(cookieBannerStyles, className)}>
          <div className={cookieBannerContentStyles}>
            <RichText as="h2" id={titleId} variant="s1" className={cookieBannerTitleStyles}>
              {labels.title}
            </RichText>
            <RichText as="p" variant="p3" className={cookieTextStyles}>
              {labels.description}
            </RichText>
            <div className={cookieBannerActionsStyles}>
              <Button
                id={id('button', 'accept')}
                type="button"
                className={cookieBannerButtonStyles}
                onClick={() => onChange(choicesFor(categories, true))}
              >
                {labels.accept}
              </Button>
              <Button
                id={id('button', 'reject')}
                type="button"
                variant="secondary"
                className={cookieBannerButtonStyles}
                onClick={() => onChange(choicesFor(categories, false))}
              >
                {labels.reject}
              </Button>
              <Button
                id={id('button', 'customize')}
                type="button"
                variant="ghost"
                className={cookieBannerButtonStyles}
                onClick={() => setOpen(true)}
              >
                {labels.customize}
              </Button>
            </div>
          </div>
        </section>
      )}
      <Modal
        open={preferencesOpen}
        onClose={() => setOpen(false)}
        title={labels.preferencesTitle}
        className={mode === 'modal' ? className : undefined}
        footer={
          <>
            <Button
              id={id('button', 'cancel')}
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              {labels.cancel}
            </Button>
            <Button
              id={id('button', 'save')}
              type="button"
              onClick={() => {
                onChange(draft);
                setOpen(false);
              }}
            >
              {labels.save}
            </Button>
          </>
        }
      >
        {labels.preferencesDescription && (
          <RichText as="p" variant="p3" className={cookiePreferencesIntroStyles}>
            {labels.preferencesDescription}
          </RichText>
        )}
        <CategoryList
          categories={categories}
          value={draft}
          onToggle={toggle}
          requiredLabel={labels.required}
          switchId={(name) => id('switch', name)}
        />
      </Modal>
    </>
  );
};
