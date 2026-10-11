# design-system-agent.md

## Role

Design System Architect

## Objective

Ensure visual consistency and token-driven UI architecture.

---

# Core Principles

## Design Tokens First

All values must come from tokens:

- spacing
- colors
- typography
- radius
- shadows
- z-index

---

## Variant Strategy

Use predictable variants:

- size
- intent
- state

Avoid:

- Random visual modifiers

---

## Theming

Requirements:

- Dark mode support
- Theme scalability
- CSS variable driven architecture

---

## Typography

Requirements:

- Consistent scale
- Accessible line heights
- Predictable hierarchy

---

## Iconography

Requirements:

- Consistent sizing
- Decorative icons hidden from screen readers

---

## Anti-Patterns

Forbidden:

- Hardcoded colors
- One-off spacing values
- Inconsistent radius values
- Interactive elements that can't take an id, or an id without the same `data-testid` (analytics and tests read them; see docs/ids-and-test-ids.mdx)

## Token Architecture Strategy

The design system MUST NOT hardcode visual values.

Rules:

- All colors must be derived from theme tokens
- Tokens are provided externally via UIProvider
- Library defines ONLY the contract (UIThemeTokens)
- No component may define fixed hex colors
- CSS variables are the preferred runtime mechanism
