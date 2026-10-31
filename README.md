# Harmonix Web

A standalone, responsive web-player starter inspired by the supplied Echo Music 1.4.4 project. The Android app remains untouched; this web edition is a separate implementation with a modular UI.

## Run locally
Open `index.html` in a browser, or use a local static server (recommended):
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Customize the UI
- `css/theme.css` — colors, typography, radius, and global design tokens.
- `css/layout.css` — page layout and responsive breakpoints.
- `css/components.css` — cards, buttons, track rows, and player styling.
- `js/config.js` — brand name, accent color, default volume, demo data toggle.
- `js/library.js` — demo track list and local-file library.
- `js/player.js` — audio playback controls.
- `js/app.js` — navigation, rendering, search, and playlist UI.

## Current functionality
- Responsive desktop/mobile layout
- Navigation between Home, Discover, Library, Playlists, and Settings
- Import and play audio files selected from your device (MP3, WAV, M4A, and browser-supported formats)
- Seek, volume, previous/next, shuffle, repeat, and like controls
- Create playlist names
- Search imported/demo library entries
- Accent color customization

## Not yet connected
This starter does not include a music-streaming backend, online music catalog, account system, cross-device sync, synced lyrics provider, or remote playlist storage. Those require separate services and APIs. Demo tracks are visual placeholders and are not playable audio.

## Deploy
This is a static site and can be hosted on GitHub Pages, Cloudflare Pages, or Netlify. For GitHub Pages, open repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## License and attribution
The supplied Echo Music 1.4.4 source project is licensed under GNU GPL v3. This web edition is an independent web implementation prepared from the supplied project as a derivative/community edition; preserve the GPL v3 terms and attribution when distributing it. See `LICENSE`.
