# Textarea

Multi-line text entry with the same label, hint and error contract (and look) as `Input` — use it
for notes, descriptions or lists typed one item per line.

## Usage

```tsx
import { Textarea } from '@inzumer/ui-library';

<Textarea label="Prices" hint="One price per line." rows={6} />;
```

## Variants

- `state`: `default` | `error` — set automatically to `'error'` whenever `error` is passed
- `inputSize`: `sm` | `md` | `lg` (text size)
- `resize`: `vertical` (default) | `none`
- Accepts every native `<textarea>` attribute and forwards its ref
