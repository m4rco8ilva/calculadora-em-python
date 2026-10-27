export interface CalculationRecord {
  id: string;
  expression: string;
  result: string;
  rawResult: number;
  timestamp: string;
  pythonSnippet: string;
}

// Factorial helper
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= Math.min(n, 100); i++) {
    res *= i;
  }
  return res;
}

// Format numbers for display with Brazilian / International punctuation
export function formatDisplayNumber(valStr: string): string {
  if (!valStr) return '0';
  if (valStr === 'Error' || valStr === 'NaN' || valStr === 'Infinity' || valStr === '-Infinity') {
    return valStr;
  }

  // If ends with decimal point or has pending zeroes after decimal point
  const parts = valStr.split('.');
  const intPart = parts[0];
  const decPart = parts.length > 1 ? parts[1] : null;

  // Format integer part with thousands separators
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (decPart !== null) {
    return `${formattedInt},${decPart}`;
  }
  return formattedInt;
}

// Safely evaluates calculator expression string
export function evaluateExpression(expr: string): { result: number; error: string | null } {
  try {
    let sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, `${Math.PI}`)
      .replace(/\be\b/g, `${Math.E}`);

    // Check for division by zero before evaluation
    if (/\/\s*0(?![0-9.])/.test(sanitized)) {
      return { result: NaN, error: 'Divisão por zero' };
    }

    // Replace power operator
    sanitized = sanitized.replace(/\^/g, '**');

    // Replace square roots: √(x) or √x
    sanitized = sanitized.replace(/√([0-9.]+)/g, 'Math.sqrt($1)');
    sanitized = sanitized.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');

    // Replace trig and log functions
    sanitized = sanitized.replace(/sin\(/g, 'Math.sin(');
    sanitized = sanitized.replace(/cos\(/g, 'Math.cos(');
    sanitized = sanitized.replace(/tan\(/g, 'Math.tan(');
    sanitized = sanitized.replace(/log\(/g, 'Math.log10(');
    sanitized = sanitized.replace(/ln\(/g, 'Math.log(');

    // Sanitize to only permit math chars
    if (!/^[0-9+\-*/().\s,Math.sqrtsincolgEPI*]+$/.test(sanitized)) {
      return { result: NaN, error: 'Expressão inválida' };
    }

    // Evaluate in safe isolated scope
    const fn = new Function(`"use strict"; return (${sanitized});`);
    const val = fn();

    if (typeof val !== 'number' || isNaN(val)) {
      return { result: NaN, error: 'Erro de cálculo' };
    }

    if (!isFinite(val)) {
      return { result: NaN, error: 'Divisão por zero' };
    }

    // Round slight floating point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
    const rounded = Math.round(val * 1e12) / 1e12;
    return { result: rounded, error: null };
  } catch {
    return { result: NaN, error: 'Erro de sintaxe' };
  }
}

// Generate Python code matching the user's web calculation
export function generatePythonEquivalent(expr: string, res: number | string): string {
  const pyExpr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'math.pi')
    .replace(/\be\b/g, 'math.e')
    .replace(/√/g, 'math.sqrt')
    .replace(/\^/g, '**');

  let requiresMath = /math\./.test(pyExpr);

  return `${requiresMath ? 'import math\n\n' : ''}# Cálculo realizado na interface web:
expressao = "${expr}"
resultado = ${pyExpr}

print(f"{expressao} = {resultado}")
# Saída no terminal: ${res}`;
}
