import { useId, type ReactNode } from 'react';
import { Button, Modal, RichText, Switch } from '@components';
import {
  cookieCategoryDescriptionStyles,
  cookieCategoryHeaderStyles,
  cookieCategoryListStyles,
  cookieCategoryRequiredStyles,
  cookieCategoryStyles,
  cookieCategoryTitleStyles,
  cookiePreferencesIntroStyles,
} from './CookiePreferences.styles';

export interface CookieCategory {
  id: string;
  title: string;
  description: ReactNode;
  /** Strictly necessary cookies can't be turned off; they show `requiredLabel` instead of a switch. */
  required?: boolean;
}

export interface CookiePreferencesProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  categories: CookieCategory[];
  /** Enabled state of each optional category, by id. */
  value: Record<string, boolean>;
  onChange: (id: string, enabled: boolean) => void;
  onSave: () => void;
  saveLabel: string;
  cancelLabel: string;
  /** e.g. "Always on". */
  requiredLabel: string;
  /** Prefix for stable ids: `<prefix>-<category id>` switches and `<prefix>-save` / `<prefix>-cancel` buttons. */
  idPrefix?: string;
}

/**
 * Per-category cookie choices in a `Modal` (focus trapped, Escape closes). Controlled: the
 * consumer holds `value` and persists it on `onSave`.
 */
export const CookiePreferences = ({
  open,
  onClose,
  title,
  description,
  categories,
  value,
  onChange,
  onSave,
  saveLabel,
  cancelLabel,
  requiredLabel,
  idPrefix,
}: CookiePreferencesProps) => {
  const baseId = useId();
  const prefix = idPrefix ?? baseId;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button id={`${prefix}-cancel`} type="button" variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button id={`${prefix}-save`} type="button" onClick={onSave}>
            {saveLabel}
          </Button>
        </>
      }
    >
      {description && (
        <RichText as="p" variant="p3" className={cookiePreferencesIntroStyles}>
          {description}
        </RichText>
      )}
      <ul className={cookieCategoryListStyles}>
        {categories.map((category) => {
          const descriptionId = `${prefix}-${category.id}-description`;
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
                    id={`${prefix}-${category.id}`}
                    label={category.title}
                    checked={value[category.id] === true}
                    onCheckedChange={(checked) => onChange(category.id, checked)}
                    aria-describedby={descriptionId}
                  />
                )}
              </div>
              <RichText
                as="p"
                id={descriptionId}
                variant="p3"
                className={cookieCategoryDescriptionStyles}
              >
                {category.description}
              </RichText>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};
