# DEFENDER — Authentic Williams Arcade

Runs the **original Williams Defender ROM** via MAME in your browser. This is the real 1981 arcade game — not a remake.

## Quick Start (no ROM files needed)

```bash
npm install
npm run dev
```

Open http://localhost:5173 and click **Play Now**. This loads the authentic ROM from the [Internet Archive's legal preservation copy](https://archive.org/details/arcade_defender) — indistinguishable from the arcade cabinet.

Press **5** to insert coin, **1** to start.

## UI/API architecture (deferred — Tier 3)

- [ ] Paused — Vite SPA; no backend mutations. If persistence or scores API is added, use Tier 1 per `~/grok/docs/UI-API-STANDARD.md`.

## Play Offline (your own ROM)

If you own the arcade hardware (or otherwise have a legal MAME ROM set):

1. Obtain `defender.zip` (MAME 2003-Plus / 0.37b5 compatible)
2. Drag it onto the setup page
3. Click **Play Offline**

For fully offline emulator cores (no CDN):

```bash
npm run setup   # ~290 MB, requires: brew install sevenzip
```

## Controls

| Action | Key |
|--------|-----|
| Rotate | Arrow keys |
| Thrust | Shift |
| Reverse | V |
| Fire | Space |
| Smart Bomb | X |
| Hyperspace | C |
| Insert Coin | 5 |
| Start | 1 |

**Keyboard tip:** Open emulator Settings → Cheats → enable **8-way joystick** remap. The original cabinet joystick only had up/down; this cheat makes left/right work on keyboard — same trick MAME users have used for decades.

## Why not a from-scratch remake?

A recreation uses new code, new graphics, and approximated physics. It will always look and feel different. The only way to be **indistinguishable from the arcade** is to run the actual ROM on emulated Williams hardware — which is what MAME does.

## Mac Tips

- **Fullscreen:** emulator toolbar → fullscreen button
- **App window:** Chrome → File → Add to Dock
- **Native MAME:** `brew install mame` then `mame defender` with ROM in `~/mame/roms/`

## Credits

- **Defender** © 1981 Williams Electronics
- Emulation: [EmulatorJS](https://emulatorjs.org) / [MAME 2003-Plus](https://github.com/libretro/mame2003-plus-libretro)
- Preservation copy: [Internet Archive](https://archive.org/details/arcade_defender)