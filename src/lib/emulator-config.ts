import { EJS_DEFENDER_DEFAULT_CONTROLS } from './controls';

declare global {
  interface Window {
    EJS_player?: string;
    EJS_core?: string;
    EJS_gameName?: string;
    EJS_color?: string;
    EJS_pathtodata?: string;
    EJS_gameUrl?: string;
    EJS_startOnLoaded?: boolean;
    EJS_defaultControls?: typeof EJS_DEFENDER_DEFAULT_CONTROLS;
    EJS_volume?: number;
    EJS_Buttons?: Record<string, boolean>;
    EJS_alignStartButton?: boolean;
    EJS_startButtonName?: string;
    EJS_backgroundColor?: string;
    EJS_backgroundBlur?: boolean;
    EJS_hideSettings?: boolean;
  }
}

export async function resolveDataPath(): Promise<string> {
  try {
    const res = await fetch('/data/loader.js', { method: 'HEAD' });
    if (res.ok) return '/data/';
  } catch {
    // CDN fallback
  }
  return 'https://cdn.emulatorjs.org/stable/data/';
}

export function configureEmulator(gameUrl: string, dataPath: string): void {
  window.EJS_player = '#emulator';
  window.EJS_core = 'mame2003_plus';
  window.EJS_gameName = 'Defender';
  window.EJS_color = '#1a3a6e';
  window.EJS_backgroundColor = '#000000';
  window.EJS_backgroundBlur = false;
  window.EJS_pathtodata = dataPath;
  window.EJS_gameUrl = gameUrl;
  window.EJS_startOnLoaded = true;
  window.EJS_defaultControls = EJS_DEFENDER_DEFAULT_CONTROLS;
  window.EJS_volume = 1;
  window.EJS_alignStartButton = false;
  window.EJS_startButtonName = 'Insert Coin & Start';
  window.EJS_Buttons = {
    playPause: false,
    restart: true,
    mute: true,
    settings: true,
    fullscreen: true,
    saveState: true,
    loadState: true,
    screenRecord: false,
    gamepad: true,
    cheat: true,
    volume: true,
    saveSavFiles: false,
    loadSavFiles: false,
    quickSave: true,
    quickLoad: true,
    screenshot: true,
    cacheManager: false,
  };
}

export function loadEmulatorScript(dataPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-emulatorjs]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `${dataPath}loader.js`;
    script.dataset.emulatorjs = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load EmulatorJS'));
    document.body.appendChild(script);
  });
}