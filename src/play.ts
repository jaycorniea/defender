import { DEFENDER_CONTROLS } from './lib/controls';
import { configureEmulator, loadEmulatorScript, resolveDataPath } from './lib/emulator-config';
import { getRom } from './lib/rom-storage';

const params = new URLSearchParams(window.location.search);
const mode = params.get('mode') === 'local' ? 'local' : 'archive';

const archiveView = document.getElementById('archive-view')!;
const localView = document.getElementById('local-view')!;
const loading = document.getElementById('loading')!;
const controlsList = document.getElementById('controls-list')!;

const IA_EMBED = 'https://archive.org/embed/arcade_defender';

function renderControls(): void {
  controlsList.innerHTML = DEFENDER_CONTROLS.map(
    (c) => `<div class="control-item"><span class="control-key">${c.key}</span><span class="control-label">${c.label}</span></div>`,
  ).join('');
}

function showArchive(): void {
  document.title = 'DEFENDER — Arcade (Internet Archive)';
  archiveView.classList.remove('hidden');
  localView.classList.add('hidden');
  loading.classList.add('hidden');

  const iframe = document.getElementById('ia-frame') as HTMLIFrameElement;
  iframe.src = IA_EMBED;
}

async function showLocal(): Promise<void> {
  document.title = 'DEFENDER — Arcade (MAME)';
  archiveView.classList.add('hidden');
  localView.classList.remove('hidden');

  const rom = await getRom();
  if (!rom) {
    loading.innerHTML = `
      <p style="color:#ff6666">No ROM loaded.</p>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem">
        Upload <code>defender.zip</code> on the setup page first.
      </p>
      <a href="/" style="margin-top:1rem;color:var(--defender-cyan)">← Back to Setup</a>
    `;
    return;
  }

  const romUrl = URL.createObjectURL(rom);
  const dataPath = await resolveDataPath();
  configureEmulator(romUrl, dataPath);

  try {
    await loadEmulatorScript(dataPath);
    const hide = () => loading.classList.add('hidden');
    window.addEventListener('EJS_ready', hide, { once: true });
    setTimeout(hide, 20000);
  } catch {
    loading.innerHTML = `
      <p style="color:#ff6666">Emulator failed to load.</p>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem">
        Check your connection, or run <code>npm run setup</code> for offline cores.
      </p>
      <a href="/?mode=archive" style="margin-top:1rem;color:var(--defender-cyan)">Try Internet Archive mode instead</a>
    `;
  }
}

const tabArchive = document.getElementById('tab-archive');
const tabLocal = document.getElementById('tab-local');
if (mode === 'local') {
  tabLocal?.classList.add('active');
  showLocal();
} else {
  tabArchive?.classList.add('active');
  showArchive();
}

renderControls();