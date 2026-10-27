export type CodeVersionKey = 'simples' | 'funcoes' | 'loop';

export interface LineAnnotation {
  line: number;
  label: string;
  concept: string;
  explanation: string;
  beginnerTip?: string;
}

export interface CodeVersion {
  id: CodeVersionKey;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
  annotations: Record<number, LineAnnotation>;
}

export interface PythonConcept {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  shortSummary: string;
  codeSnippet: string;
  whyItMatters: string;
  commonMistake: string;
  bestPractice: string;
}

export interface BeginnerChallenge {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Desafio';
  description: string;
  hint: string;
  solutionCode: string;
  solutionExplanation: string;
}
