import React, { useState } from 'react';
import { CalculationRecord, formatDisplayNumber } from '../utils/calculatorEngine';
import {
  Trash2,
  Copy,
  Check,
  Download,
  Clock,
  Code,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface HistoryTapeProps {
  history: CalculationRecord[];
  onClearHistory: () => void;
  onSelectRecord: (record: CalculationRecord) => void;
  onViewPython: (code: string) => void;
}

export const HistoryTape: React.FC<HistoryTapeProps> = ({
  history,
  onClearHistory,
  onSelectRecord,
  onViewPython,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyResult = async (id: string, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleExportTxt = () => {
    if (history.length === 0) return;
    const content = history
      .map((item) => `[${item.timestamp}] ${item.expression} = ${item.result}`)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historico_calculadora_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (history.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-500 mx-auto flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-slate-200 text-sm">Histórico Vazio</h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
          Os cálculos que você fizer na calculadora aparecerão aqui automaticamente com timestamp e código Python correspondente.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            Fita de Histórico
          </h3>
          <span className="text-xs font-mono text-slate-400">
            ({history.length} {history.length === 1 ? 'registro' : 'registros'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportTxt}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition"
            title="Exportar histórico como arquivo .txt"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar</span>
          </button>

          <button
            onClick={onClearHistory}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
            title="Limpar histórico"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
        {history.map((record) => (
          <div
            key={record.id}
            className="group bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{record.timestamp}</span>
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                <button
                  onClick={() => onViewPython(record.pythonSnippet)}
                  className="p-1 rounded hover:bg-slate-800 text-sky-400"
                  title="Ver código em Python deste cálculo"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCopyResult(record.id, record.result)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300"
                  title="Copiar resultado"
                >
                  {copiedId === record.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-3">
              <div
                onClick={() => onSelectRecord(record)}
                className="font-mono text-xs text-slate-400 hover:text-slate-200 cursor-pointer transition truncate flex-1"
                title="Clique para reutilizar esta expressão"
              >
                {record.expression}
              </div>
              <div
                onClick={() => onSelectRecord(record)}
                className="font-mono font-bold text-base text-emerald-400 hover:text-emerald-300 cursor-pointer transition tabular-nums shrink-0"
                title="Clique para carregar este resultado na calculadora"
              >
                = {formatDisplayNumber(record.result)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
