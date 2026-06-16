import { DEFENDER_CONTROLS } from './lib/controls';
import { clearRom, getRom, isValidDefenderRom, saveRom } from './lib/rom-storage';

const controlsList = document.getElementById('controls-list')!;
const playArchiveBtn = document.getElementById('play-archive-btn')!;
const playLocalBtn = document.getElementById('play-local-btn') as HTMLButtonElement;
const dropZone = document.getElementById('drop-zone')!;
const romInput = document.getElementById('rom-input') as HTMLInputElement;
const romStatus = document.getElementById('rom-status')!;
const clearRomBtn = document.getElementById('clear-rom-btn')!;

function renderControls(): void {
  controlsList.innerHTML = DEFENDER_CONTROLS.map(
    (c) => `
      <div class="control-item">
        <span class="control-key">${c.key}</span>
        <div>
          <div class="control-label">${c.label}</div>
          <div class="control-desc">${c.description}</div>
        </div>
      </div>
    `,
  ).join('');
}

function updateRomUI(file: File | null): void {
  if (file) {
    const mb = (file.size / 1024 / 1024).toFixed(2);
    romStatus.textContent = `✓ ${file.name} (${mb} MB) — ready for offline play`;
    romStatus.classList.remove('hidden');
    playLocalBtn.disabled = false;
    clearRomBtn.classList.remove('hidden');
  } else {
    romStatus.classList.add('hidden');
    playLocalBtn.disabled = true;
    clearRomBtn.classList.add('hidden');
  }
}

async function handleRom(file: File): Promise<void> {
  if (!isValidDefenderRom(file.name)) {
    alert('File must be named defender.zip (standard MAME ROM set).');
    return;
  }
  await saveRom(file);
  updateRomUI(file);
}

dropZone.addEventListener('click', () => romInput.click());
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer?.files[0];
  if (file) await handleRom(file);
});
romInput.addEventListener('change', async () => {
  const file = romInput.files?.[0];
  if (file) await handleRom(file);
});

playArchiveBtn.addEventListener('click', () => {
  window.location.href = '/play.html?mode=archive';
});
playLocalBtn.addEventListener('click', () => {
  window.location.href = '/play.html?mode=local';
});
clearRomBtn.addEventListener('click', async () => {
  await clearRom();
  romInput.value = '';
  updateRomUI(null);
});

renderControls();
getRom().then(updateRomUI);