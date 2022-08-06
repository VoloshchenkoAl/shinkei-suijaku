# 🃏 Shinkei Suijaku

Shinkei-suijaku is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. (Wiki)

## 💻 Tech stack

- UI render - [React](https://reactjs.org/), with ts
- Game Logic base on [xState](https://xstate.js.org/)
- Styled with [Tailwindcss](https://tailwindcss.com/)
- Also using Unsplash API to get random images for cards

## How to run project local?

1. Install all dependencies

```bash
npm ci
```

2. Generate Unsplash API key on [official website](https://unsplash.com/developers)
3. Create `.env.local` file in root directory with following content:

```bash
REACT_APP_UNSPLASH_ACCESS_KEY=<your-key>
```

4. Run project

```bash
npm run start
```
