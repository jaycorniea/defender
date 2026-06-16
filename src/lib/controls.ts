export interface ControlBinding {
  label: string;
  key: string;
  description: string;
  arcadePosition: 'joystick' | 'reverse' | 'fire' | 'thrust' | 'smart-bomb' | 'hyperspace' | 'system';
}

/** Defender arcade panel — matches Williams cabinet + MAME defaults. */
export const DEFENDER_CONTROLS: ControlBinding[] = [
  { label: 'Up', key: '↑', description: 'Rotate ship counter-clockwise', arcadePosition: 'joystick' },
  { label: 'Down', key: '↓', description: 'Rotate ship clockwise', arcadePosition: 'joystick' },
  { label: 'Left', key: '←', description: 'Rotate left (enable 8-way cheat in settings)', arcadePosition: 'joystick' },
  { label: 'Right', key: '→', description: 'Rotate right (enable 8-way cheat in settings)', arcadePosition: 'joystick' },
  { label: 'Reverse', key: 'V', description: 'Reverse thrust direction', arcadePosition: 'reverse' },
  { label: 'Fire', key: 'Space', description: 'Laser fire', arcadePosition: 'fire' },
  { label: 'Thrust', key: 'Shift', description: 'Engage thrusters', arcadePosition: 'thrust' },
  { label: 'Smart Bomb', key: 'X', description: 'Destroy all enemies on screen', arcadePosition: 'smart-bomb' },
  { label: 'Hyperspace', key: 'C', description: 'Emergency warp', arcadePosition: 'hyperspace' },
  { label: 'Insert Coin', key: '5', description: 'Add credit', arcadePosition: 'system' },
  { label: 'Start', key: '1', description: 'Start game', arcadePosition: 'system' },
];

/** EmulatorJS keyboard defaults for mame2003_plus / Defender. */
export const EJS_DEFENDER_DEFAULT_CONTROLS = {
  0: {
    0: { value: 'Shift', value2: 'BUTTON_2' },
    1: { value: 'c', value2: 'BUTTON_4' },
    2: { value: '5', value2: 'SELECT' },
    3: { value: '1', value2: 'START' },
    4: { value: 'up arrow', value2: 'DPAD_UP' },
    5: { value: 'down arrow', value2: 'DPAD_DOWN' },
    6: { value: 'left arrow', value2: 'DPAD_LEFT' },
    7: { value: 'right arrow', value2: 'DPAD_RIGHT' },
    8: { value: ' ', value2: 'BUTTON_1' },
    9: { value: 'x', value2: 'BUTTON_3' },
    10: { value: 'v', value2: 'LEFT_TOP_SHOULDER' },
    11: { value: '', value2: 'RIGHT_TOP_SHOULDER' },
    12: { value: '', value2: 'LEFT_BOTTOM_SHOULDER' },
    13: { value: '', value2: 'RIGHT_BOTTOM_SHOULDER' },
    14: { value: '', value2: 'LEFT_STICK' },
    15: { value: '', value2: 'RIGHT_STICK' },
    16: { value: '', value2: 'LEFT_STICK_X:+1' },
    17: { value: '', value2: 'LEFT_STICK_X:-1' },
    18: { value: '', value2: 'LEFT_STICK_Y:+1' },
    19: { value: '', value2: 'LEFT_STICK_Y:-1' },
    20: { value: '', value2: 'RIGHT_STICK_X:+1' },
    21: { value: '', value2: 'RIGHT_STICK_X:-1' },
    22: { value: '', value2: 'RIGHT_STICK_Y:+1' },
    23: { value: '', value2: 'RIGHT_STICK_Y:-1' },
    24: { value: 'F5' },
    25: { value: 'F8' },
    26: { value: 'F4' },
    27: { value: 'tab' },
    28: { value: '' },
    29: { value: '' },
  },
  1: {},
  2: {},
  3: {},
};