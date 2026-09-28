## Descripción

<!-- Qué problema resuelve o qué funcionalidad agrega. Contexto adicional si hace falta. -->

## Tipo de cambio

<!-- Marca con una "x" lo que corresponda -->

- [ ] Bug fix
- [ ] Nueva feature / componente
- [ ] Refactor sin cambio de funcionalidad
- [ ] Documentación
- [ ] CI / build / tooling

## Checklist

- [ ] El título del PR y los commits siguen [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (ver [CLAUDE.md](../CLAUDE.md))
- [ ] `pnpm typecheck`, `pnpm lint` y `pnpm test:coverage` pasan localmente
- [ ] `pnpm build` y `pnpm build-storybook` pasan localmente
- [ ] Si el cambio afecta a `@inzumer/ui-library`: agregué un changeset (`pnpm changeset`)
- [ ] Si agregué o edité un componente: tiene stories con controls (y `play` si aplica), README propio, y sigue [docs/components.mdx](../docs/components.mdx)
- [ ] Si agregué o edité un hook o util: sigue el patrón de carpeta/barrel/tests de [docs/hooks.mdx](../docs/hooks.mdx)

## Issue relacionado

<!-- Si corresponde -->

Closes #

## Notas adicionales

<!-- Decisiones técnicas, breaking changes, capturas de Storybook, etc. -->
