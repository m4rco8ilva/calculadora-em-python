import React, { useState, useEffect, useCallback } from 'react';
import {
  Delete,
  Copy,
  Check,
  Volume2,
  VolumeX,
  History,
  RotateCcw,
  Sparkles,
  Code,
  ArrowRight,
  Divide,
  X,
  Minus,
  Plus,
  Equal,
} from 'lucide-react';
import {
  formatDisplayNumber,
  evaluateExpression,
  generatePythonEquivalent,
  CalculationRecord,
  factorial,
} from '../utils/calculatorEngine';
import { playKeyClick } from '../utils/audio';

interface ModernCalculatorProps {
  onAddHistory: (item: CalculationRecord) => void;
  onOpenPythonView: (pyCode: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  historyCount: number;
  onOpenHistory: () => void;
}

export const ModernCalculator: React.FC<ModernCalculatorProps> = ({
  onAddHistory,
  onOpenPythonView,
  soundEnabled,
  onToggleSound,
  historyCount,
  onOpenHistory,
}) => {
  // Calculator state
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [lastPythonCode, setLastPythonCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeKeyHighlight, setActiveKeyHighlight] = useState<string | null>(null);

  const triggerSound = useCallback(
    (type: 'num' | 'op' | 'action' | 'clear' | 'equals') => {
      if (soundEnabled) {
        playKeyClick(type);
      }
    },
    [soundEnabled]
  );

  const handleHighlightKey = (keyName: string) => {
    setActiveKeyHighlight(keyName);
    setTimeout(() => setActiveKeyHighlight(null), 150);
  };

  // Input Digit
  const handleDigit = useCallback(
    (digit: string) => {
      triggerSound('num');
      handleHighlightKey(digit);

      if (displayValue === 'Error' || isNewEntry) {
        setDisplayValue(digit);
        setIsNewEntry(false);
      } else {
        if (displayValue === '0') {
          setDisplayValue(digit);
        } else {
          if (displayValue.length < 16) {
            setDisplayValue(displayValue + digit);
          }
        }
      }
    },
    [displayValue, isNewEntry, triggerSound]
  );

  // Decimal Point
  const handleDecimal = useCallback(() => {
    triggerSound('num');
    handleHighlightKey('.');

    if (displayValue === 'Error' || isNewEntry) {
      setDisplayValue('0.');
      setIsNewEntry(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue, isNewEntry, triggerSound]);

  // Clear All
  const handleClear = useCallback(() => {
    triggerSound('clear');
    handleHighlightKey('AC');
    setDisplayValue('0');
    setExpression('');
    setIsNewEntry(true);
  }, [triggerSound]);

  // Backspace
  const handleBackspace = useCallback(() => {
    triggerSound('action');
    handleHighlightKey('backspace');

    if (displayValue === 'Error' || isNewEntry) {
      setDisplayValue('0');
      setIsNewEntry(true);
      return;
    }

    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
      setIsNewEntry(true);
    }
  }, [displayValue, isNewEntry, triggerSound]);

  // Toggle +/-
  const handleToggleSign = useCallback(() => {
    triggerSound('action');
    handleHighlightKey('sign');

    if (displayValue === '0' || displayValue === 'Error') return;

    if (displayValue.startsWith('-')) {
      setDisplayValue(displayValue.substring(1));
    } else {
      setDisplayValue('-' + displayValue);
    }
  }, [displayValue, triggerSound]);

  // Percentage
  const handlePercentage = useCallback(() => {
    triggerSound('op');
    handleHighlightKey('%');

    if (displayValue === 'Error') return;
    const num = parseFloat(displayValue);
    if (!isNaN(num)) {
      const val = num / 100;
      setDisplayValue(String(val));
      setIsNewEntry(true);
    }
  }, [displayValue, triggerSound]);

  // Standard Binary Operators (+, -, ×, ÷, ^)
  const handleOperator = useCallback(
    (op: string) => {
      triggerSound('op');
      handleHighlightKey(op);

      if (displayValue === 'Error') return;

      if (expression && !isNewEntry) {
        // Evaluate continuous chaining (e.g. 10 + 5 * 2)
        const fullExpr = `${expression} ${displayValue}`;
        const { result, error } = evaluateExpression(fullExpr);
        if (!error && !isNaN(result)) {
          setExpression(`${result} ${op}`);
          setDisplayValue(String(result));
          setIsNewEntry(true);
          return;
        }
      }

      setExpression(`${displayValue} ${op}`);
      setIsNewEntry(true);
    },
    [displayValue, expression, isNewEntry, triggerSound]
  );

  // Equals / Calculate
  const handleEquals = useCallback(() => {
    triggerSound('equals');
    handleHighlightKey('=');

    if (!expression || displayValue === 'Error') return;

    const fullExpr = `${expression} ${displayValue}`;
    const { result, error } = evaluateExpression(fullExpr);

    if (error || isNaN(result)) {
      setDisplayValue(error || 'Error');
      setIsNewEntry(true);
      return;
    }

    const pySnippet = generatePythonEquivalent(fullExpr, result);
    setLastPythonCode(pySnippet);

    const record: CalculationRecord = {
      id: `calc-${Date.now()}`,
      expression: fullExpr,
      result: String(result),
      rawResult: result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      pythonSnippet: pySnippet,
    };

    onAddHistory(record);
    setDisplayValue(String(result));
    setExpression('');
    setIsNewEntry(true);
  }, [displayValue, expression, onAddHistory, triggerSound]);

  // Scientific Single Functions (sqrt, square, sin, cos, tan, log, ln, fact)
  const handleScientificUnary = (fnName: string) => {
    triggerSound('op');
    handleHighlightKey(fnName);
    const num = parseFloat(displayValue);
    if (isNaN(num)) return;

    let res = 0;
    let desc = '';

    switch (fnName) {
      case 'sqrt':
        if (num < 0) {
          setDisplayValue('Error');
          setIsNewEntry(true);
          return;
        }
        res = Math.sqrt(num);
        desc = `√(${num})`;
        break;
      case 'sqr':
        res = num * num;
        desc = `(${num})²`;
        break;
      case 'sin':
        res = Math.sin((num * Math.PI) / 180);
        desc = `sin(${num}°)`;
        break;
      case 'cos':
        res = Math.cos((num * Math.PI) / 180);
        desc = `cos(${num}°)`;
        break;
      case 'tan':
        res = Math.tan((num * Math.PI) / 180);
        desc = `tan(${num}°)`;
        break;
      case 'log':
        if (num <= 0) {
          setDisplayValue('Error');
          setIsNewEntry(true);
          return;
        }
        res = Math.log10(num);
        desc = `log(${num})`;
        break;
      case 'ln':
        if (num <= 0) {
          setDisplayValue('Error');
          setIsNewEntry(true);
          return;
        }
        res = Math.log(num);
        desc = `ln(${num})`;
        break;
      case 'fact':
        res = factorial(num);
        desc = `${num}!`;
        break;
      default:
        return;
    }

    const rounded = Math.round(res * 1e12) / 1e12;
    const py = `# Operação científica em Python:\nimport math\nresultado = ${res}\nprint("${desc} = {resultado}")`;
    setLastPythonCode(py);

    onAddHistory({
      id: `calc-${Date.now()}`,
      expression: desc,
      result: String(rounded),
      rawResult: rounded,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      pythonSnippet: py,
    });

    setDisplayValue(String(rounded));
    setIsNewEntry(true);
  };

  // Constants
  const handleConstant = (c: 'pi' | 'e') => {
    triggerSound('num');
    const val = c === 'pi' ? Math.PI : Math.E;
    setDisplayValue(String(val));
    setIsNewEntry(true);
  };

  // Memory Functions
  const handleMemory = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    triggerSound('action');
    handleHighlightKey(action);
    const curr = parseFloat(displayValue) || 0;

    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplayValue(String(memory));
        setIsNewEntry(true);
        break;
      case 'M+':
        setMemory((prev) => prev + curr);
        setIsNewEntry(true);
        break;
      case 'M-':
        setMemory((prev) => prev - curr);
        setIsNewEntry(true);
        break;
    }
  };

  // Copy Result
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input elsewhere
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+' || e.key === '-') {
        e.preventDefault();
        handleOperator(e.key);
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleBackspace,
    handleClear,
    handlePercentage,
  ]);

  // Adjust font size dynamically based on number length
  const getDisplayTextSize = () => {
    const len = displayValue.length;
    if (len > 14) return 'text-2xl sm:text-3xl';
    if (len > 10) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Top Utility Bar for the Calculator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        {/* Mode Selector (Segmented control) */}
        <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setIsScientific(false)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              !isScientific
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Padrão (4 Operações)
          </button>
          <button
            onClick={() => setIsScientific(true)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              isScientific
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Científica
          </button>
        </div>

        {/* Right side utility buttons */}
        <div className="flex items-center gap-2">
          {/* Audio click feedback toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition ${
              soundEnabled
                ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Sons de clique ativados' : 'Sons desativados'}
            aria-label="Alternar som dos botões"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* History button with count badge */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Ver histórico de cálculos"
          >
            <History className="w-4 h-4 text-sky-400" />
            <span className="font-medium hidden sm:inline">Histórico</span>
            {historyCount > 0 && (
              <span className="font-mono text-[11px] bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded-md font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Calculator Physical Frame */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden ring-1 ring-white/5">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Display Panel */}
        <div className="relative mb-5 bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[135px] shadow-inner">
          {/* Top Display Header: Memory, Expression, Copy */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <div className="flex items-center gap-2">
              {memory !== 0 && (
                <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20">
                  M = {memory}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Copy result button */}
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white transition p-1 rounded-md hover:bg-slate-800"
                title="Copiar resultado"
                aria-label="Copiar resultado para a área de transferência"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Backspace on display */}
              <button
                onClick={handleBackspace}
                className="text-slate-400 hover:text-white transition p-1 rounded-md hover:bg-slate-800"
                title="Apagar último dígito"
                aria-label="Apagar último caractere"
              >
                <Delete className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pending Expression String */}
          <div className="font-mono text-sm text-slate-400 text-right h-5 truncate tracking-wide">
            {expression}
          </div>

          {/* Main Large Formatted Readout */}
          <div className="mt-1 flex items-baseline justify-end">
            <div
              className={`font-mono font-semibold tracking-tight text-right text-white select-all tabular-nums transition-all ${getDisplayTextSize()}`}
            >
              {formatDisplayNumber(displayValue)}
            </div>
          </div>
        </div>

        {/* Memory Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {(['MC', 'MR', 'M+', 'M-'] as const).map((mKey) => (
            <button
              key={mKey}
              onClick={() => handleMemory(mKey)}
              disabled={mKey === 'MR' && memory === 0}
              className={`py-1.5 text-xs font-mono font-medium rounded-xl border transition duration-150 ${
                mKey === 'MR' && memory === 0
                  ? 'border-slate-800/60 text-slate-600 cursor-not-allowed'
                  : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 active:scale-95'
              }`}
            >
              {mKey}
            </button>
          ))}
        </div>

        {/* Scientific Section (Expandable) */}
        {isScientific && (
          <div className="grid grid-cols-5 gap-2 mb-3 p-2.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 animate-in fade-in duration-200">
            <button
              onClick={() => handleScientificUnary('sqrt')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              √x
            </button>
            <button
              onClick={() => handleScientificUnary('sqr')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              x²
            </button>
            <button
              onClick={() => handleOperator('^')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              xʸ
            </button>
            <button
              onClick={() => handleConstant('pi')}
              className="py-2 rounded-xl text-xs font-mono text-amber-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              π
            </button>
            <button
              onClick={() => handleConstant('e')}
              className="py-2 rounded-xl text-xs font-mono text-amber-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              e
            </button>

            <button
              onClick={() => handleScientificUnary('sin')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              sin
            </button>
            <button
              onClick={() => handleScientificUnary('cos')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              cos
            </button>
            <button
              onClick={() => handleScientificUnary('tan')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              tan
            </button>
            <button
              onClick={() => handleScientificUnary('log')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              log
            </button>
            <button
              onClick={() => handleScientificUnary('ln')}
              className="py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 active:scale-95 transition"
            >
              ln
            </button>
          </div>
        )}

        {/* Primary Keypad Grid: 4 columns */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1: AC, +/-, %, ÷ */}
          <button
            onClick={handleClear}
            className={`h-14 rounded-2xl font-semibold text-sm transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === 'AC'
                ? 'bg-rose-500/40 border-rose-500 text-white scale-95'
                : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30 active:scale-95'
            }`}
          >
            AC
          </button>

          <button
            onClick={handleToggleSign}
            className={`h-14 rounded-2xl font-mono text-sm transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === 'sign'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/50 active:scale-95'
            }`}
          >
            +/-
          </button>

          <button
            onClick={handlePercentage}
            className={`h-14 rounded-2xl font-mono text-sm transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '%'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/50 active:scale-95'
            }`}
          >
            %
          </button>

          <button
            onClick={() => handleOperator('÷')}
            className={`h-14 rounded-2xl text-lg font-bold transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '÷'
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 active:scale-95'
            }`}
          >
            <Divide className="w-5 h-5" />
          </button>

          {/* Row 2: 7, 8, 9, × */}
          <button
            onClick={() => handleDigit('7')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '7'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            7
          </button>

          <button
            onClick={() => handleDigit('8')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '8'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            8
          </button>

          <button
            onClick={() => handleDigit('9')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '9'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            9
          </button>

          <button
            onClick={() => handleOperator('×')}
            className={`h-14 rounded-2xl text-lg font-bold transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '×'
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 active:scale-95'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Row 3: 4, 5, 6, - */}
          <button
            onClick={() => handleDigit('4')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '4'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            4
          </button>

          <button
            onClick={() => handleDigit('5')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '5'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            5
          </button>

          <button
            onClick={() => handleDigit('6')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '6'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            6
          </button>

          <button
            onClick={() => handleOperator('-')}
            className={`h-14 rounded-2xl text-lg font-bold transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '-'
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 active:scale-95'
            }`}
          >
            <Minus className="w-5 h-5" />
          </button>

          {/* Row 4: 1, 2, 3, + */}
          <button
            onClick={() => handleDigit('1')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '1'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            1
          </button>

          <button
            onClick={() => handleDigit('2')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '2'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            2
          </button>

          <button
            onClick={() => handleDigit('3')}
            className={`h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '3'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            3
          </button>

          <button
            onClick={() => handleOperator('+')}
            className={`h-14 rounded-2xl text-lg font-bold transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '+'
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 active:scale-95'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Row 5: 0 (span 2), . , = */}
          <button
            onClick={() => handleDigit('0')}
            className={`col-span-2 h-14 rounded-2xl font-mono text-lg font-medium transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '0'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            0
          </button>

          <button
            onClick={handleDecimal}
            className={`h-14 rounded-2xl font-mono text-lg font-bold transition-all duration-150 flex items-center justify-center border ${
              activeKeyHighlight === '.'
                ? 'bg-slate-700 text-white scale-95'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-800 active:scale-95'
            }`}
          >
            ,
          </button>

          <button
            onClick={handleEquals}
            className={`h-14 rounded-2xl font-bold transition-all duration-150 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 ${
              activeKeyHighlight === '='
                ? 'bg-emerald-400 scale-95 ring-2 ring-emerald-300'
                : 'bg-emerald-500 hover:bg-emerald-400 active:scale-95'
            }`}
          >
            <Equal className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Live Python Bridge Card (Connects to user's initial Python interest!) */}
      {lastPythonCode && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Ver equivalente em código Python
              </div>
              <div className="text-[11px] text-slate-400">
                Veja como o Python processaria este mesmo cálculo
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenPythonView(lastPythonCode)}
            className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/30 transition shrink-0"
          >
            <span>Inspecionar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
