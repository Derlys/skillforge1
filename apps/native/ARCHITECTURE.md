# Native App Screaming Architecture

This app now uses a feature-first structure so the folder tree reflects product capabilities ("screams" use-cases) instead of technical layers.

## Principles

- `app/` only contains Expo Router route entrypoints (thin wrappers).
- `src/features/*` contains route-level screens and feature-specific UI/logic.
- `src/shared/*` contains cross-feature modules.
- `src/core/*` contains app-level providers and navigation layout composition.

## Route Path Mapping

- `/` -> `src/features/home/screens/home-screen.tsx`
- `/ai` -> `src/features/ai/screens/ai-screen.tsx`
- `/todos` -> `src/features/todos/screens/todos-screen.tsx`
- `/solana` -> `src/features/solana/screens/solana-screen.tsx`
- `/(tabs)` layout -> `src/core/router/tabs-layout.tsx`
- `/(tabs)/index` -> `src/features/tabs/screens/tabs-home-screen.tsx`
- `/(tabs)/two` -> `src/features/tabs/screens/tabs-explore-screen.tsx`
- `/modal` -> `src/features/modal/screens/modal-screen.tsx`
- `+not-found` -> `src/features/not-found/screens/not-found-screen.tsx`

## Folder Layout

- `src/core/providers`: global providers and app context.
- `src/core/router`: route layout implementations.
- `src/features/auth`: email auth UI.
- `src/features/solana`: Solana UI + hooks.
- `src/shared/api`: ORPC client/query wiring.
- `src/shared/auth`: auth client.
- `src/shared/ui`: shared primitives used across features.
- `src/shared/utils`: shared utilities.

## Rule of Thumb for New Paths

1. Add screen implementation under `src/features/<feature>/screens`.
2. Keep `app/...` route file as a one-line re-export.
3. Keep feature internals inside the same feature folder.
4. Promote code to `src/shared/*` only when used by 2+ features.
