export const PERMANENT_TEETH = [
  '18',
  '17',
  '16',
  '15',
  '14',
  '13',
  '12',
  '11',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '48',
  '47',
  '46',
  '45',
  '44',
  '43',
  '42',
  '41',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
] as const;

export type PermanentTooth = (typeof PERMANENT_TEETH)[number];

export type Quadrant = 1 | 2 | 3 | 4;

export type ToothType =
  | 'centralIncisor'
  | 'lateralIncisor'
  | 'canine'
  | 'firstPremolar'
  | 'secondPremolar'
  | 'firstMolar'
  | 'secondMolar'
  | 'thirdMolar';

export type ToothState = 'default' | 'treated' | 'pending' | 'inProgress' | 'missing' | 'implant';

export const TOOTH_STATES = [
  'default',
  'treated',
  'pending',
  'inProgress',
  'missing',
  'implant',
] as const satisfies readonly ToothState[];

export type Surface = 'O' | 'V' | 'L' | 'M' | 'D';

export const SURFACES = ['O', 'V', 'L', 'M', 'D'] as const satisfies readonly Surface[];

export type SurfaceName =
  'occlusal' | 'incisal' | 'vestibular' | 'lingual' | 'palatal' | 'mesial' | 'distal';

export type ToothView = {
  state: ToothState;
  surfaces?: Partial<Record<Surface, ToothState>>;
};

export type ToothInfo = {
  fdi: PermanentTooth;
  quadrant: Quadrant;
  position: number;
  type: ToothType;
  arch: 'upper' | 'lower';
  side: 'right' | 'left';
};

const TOOTH_TYPES: readonly ToothType[] = [
  'centralIncisor',
  'lateralIncisor',
  'canine',
  'firstPremolar',
  'secondPremolar',
  'firstMolar',
  'secondMolar',
  'thirdMolar',
];

/** Whether a string is a permanent tooth in FDI notation (11 to 48). */
export const isPermanentTooth = (fdi: string): fdi is PermanentTooth =>
  (PERMANENT_TEETH as readonly string[]).includes(fdi);

/** Quadrant, position, type, arch and patient side of a permanent tooth in FDI notation. */
export const getToothInfo = (fdi: PermanentTooth): ToothInfo => {
  const quadrant = Number(fdi[0]) as Quadrant;
  const position = Number(fdi[1]);

  return {
    fdi,
    quadrant,
    position,
    type: TOOTH_TYPES[position - 1] as ToothType,
    arch: quadrant <= 2 ? 'upper' : 'lower',
    side: quadrant === 1 || quadrant === 4 ? 'right' : 'left',
  };
};

/** Name of a surface for a given tooth: incisal on incisors and canines, palatal on the upper arch. */
export const getSurfaceName = (surface: Surface, fdi: PermanentTooth): SurfaceName => {
  const { position, arch } = getToothInfo(fdi);
  const names: Record<Surface, SurfaceName> = {
    O: position <= 3 ? 'incisal' : 'occlusal',
    V: 'vestibular',
    L: arch === 'upper' ? 'palatal' : 'lingual',
    M: 'mesial',
    D: 'distal',
  };

  return names[surface];
};
