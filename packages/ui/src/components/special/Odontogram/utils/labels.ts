import type {
  PermanentTooth,
  Quadrant,
  SurfaceName,
  ToothState,
  ToothType,
  ToothView,
} from './fdi';
import { getToothInfo } from './fdi';

export type OdontogramLocale = 'en' | 'es' | 'it';

export type OdontogramLabels = {
  title: string;
  legend: string;
  tooth: string;
  surfacesOf: string;
  toothTypes: Record<ToothType, string>;
  quadrants: Record<Quadrant, string>;
  states: Record<ToothState, string>;
  surfaceNames: Record<SurfaceName, string>;
  surfaceCodes: Record<SurfaceName, string>;
  toothName: (type: string, quadrant: string) => string;
};

export const ODONTOGRAM_LABELS: Record<OdontogramLocale, OdontogramLabels> = {
  en: {
    title: 'Odontogram',
    legend: 'Legend',
    tooth: 'Tooth',
    surfacesOf: 'Surfaces of tooth',
    toothTypes: {
      centralIncisor: 'central incisor',
      lateralIncisor: 'lateral incisor',
      canine: 'canine',
      firstPremolar: 'first premolar',
      secondPremolar: 'second premolar',
      firstMolar: 'first molar',
      secondMolar: 'second molar',
      thirdMolar: 'third molar',
    },
    quadrants: { 1: 'upper right', 2: 'upper left', 3: 'lower left', 4: 'lower right' },
    states: {
      default: 'No records',
      treated: 'Treated',
      pending: 'Pending',
      inProgress: 'In progress',
      missing: 'Missing',
      implant: 'Implant',
    },
    surfaceNames: {
      occlusal: 'Occlusal',
      incisal: 'Incisal',
      vestibular: 'Buccal',
      lingual: 'Lingual',
      palatal: 'Palatal',
      mesial: 'Mesial',
      distal: 'Distal',
    },
    surfaceCodes: {
      occlusal: 'O',
      incisal: 'I',
      vestibular: 'B',
      lingual: 'L',
      palatal: 'P',
      mesial: 'M',
      distal: 'D',
    },
    toothName: (type, quadrant) => `${quadrant} ${type}`,
  },
  es: {
    title: 'Odontograma',
    legend: 'Referencias',
    tooth: 'Diente',
    surfacesOf: 'Caras del diente',
    toothTypes: {
      centralIncisor: 'incisivo central',
      lateralIncisor: 'incisivo lateral',
      canine: 'canino',
      firstPremolar: 'primer premolar',
      secondPremolar: 'segundo premolar',
      firstMolar: 'primer molar',
      secondMolar: 'segundo molar',
      thirdMolar: 'tercer molar',
    },
    quadrants: {
      1: 'superior derecho',
      2: 'superior izquierdo',
      3: 'inferior izquierdo',
      4: 'inferior derecho',
    },
    states: {
      default: 'Sin registros',
      treated: 'Tratado',
      pending: 'Pendiente',
      inProgress: 'En curso',
      missing: 'Ausente',
      implant: 'Implante',
    },
    surfaceNames: {
      occlusal: 'Oclusal',
      incisal: 'Incisal',
      vestibular: 'Vestibular',
      lingual: 'Lingual',
      palatal: 'Palatina',
      mesial: 'Mesial',
      distal: 'Distal',
    },
    surfaceCodes: {
      occlusal: 'O',
      incisal: 'I',
      vestibular: 'V',
      lingual: 'L',
      palatal: 'P',
      mesial: 'M',
      distal: 'D',
    },
    toothName: (type, quadrant) => `${type} ${quadrant}`,
  },
  it: {
    title: 'Odontogramma',
    legend: 'Legenda',
    tooth: 'Dente',
    surfacesOf: 'Superfici del dente',
    toothTypes: {
      centralIncisor: 'incisivo centrale',
      lateralIncisor: 'incisivo laterale',
      canine: 'canino',
      firstPremolar: 'primo premolare',
      secondPremolar: 'secondo premolare',
      firstMolar: 'primo molare',
      secondMolar: 'secondo molare',
      thirdMolar: 'terzo molare',
    },
    quadrants: {
      1: 'superiore destro',
      2: 'superiore sinistro',
      3: 'inferiore sinistro',
      4: 'inferiore destro',
    },
    states: {
      default: 'Nessun registro',
      treated: 'Trattato',
      pending: 'Da trattare',
      inProgress: 'In corso',
      missing: 'Assente',
      implant: 'Impianto',
    },
    surfaceNames: {
      occlusal: 'Occlusale',
      incisal: 'Incisale',
      vestibular: 'Vestibolare',
      lingual: 'Linguale',
      palatal: 'Palatale',
      mesial: 'Mesiale',
      distal: 'Distale',
    },
    surfaceCodes: {
      occlusal: 'O',
      incisal: 'I',
      vestibular: 'V',
      lingual: 'L',
      palatal: 'P',
      mesial: 'M',
      distal: 'D',
    },
    toothName: (type, quadrant) => `${type} ${quadrant}`,
  },
};

/** Accessible name of a tooth and its state, e.g. "Tooth 16, upper right first molar, Treated". */
export const describeTooth = (
  fdi: PermanentTooth,
  view: ToothView | undefined,
  labels: OdontogramLabels,
) => {
  const { type, quadrant } = getToothInfo(fdi);
  const name = labels.toothName(labels.toothTypes[type], labels.quadrants[quadrant]);

  return `${labels.tooth} ${fdi}, ${name}, ${labels.states[view?.state ?? 'default']}`;
};
