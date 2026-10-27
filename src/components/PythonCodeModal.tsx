import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';

interface PythonCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  codeSnippet: string;
  onGoToTerminal: () => void;
}

export const PythonCodeModal: React.FC<PythonCodeModalProps> = ({
  isOpen,
  onClose,
  codeSnippet,
  onGoToTerminal,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Como o Python Realiza Este Cálculo
              </h3>
              <p className="text-xs text-slate-400">
                Código equivalente gerado dinamicamente para o cálculo efetuado.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code block */}
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border border-slate-800 rounded-t-2xl text-xs text-slate-400 font-mono">
            <span>calculo.py</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 border-x border-b border-slate-800 rounded-b-2xl font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed">
            {codeSnippet}
          </pre>
        </div>

        {/* Quick hint & action */}
        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            No Python, operações simples como soma e subtração usam operadores nativos (+, -, *, /). Funções como raiz quadrada e trigonometria requerem importar o módulo <code className="text-sky-300 font-mono">import math</code>.
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onClose();
              onGoToTerminal();
            }}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1.5 transition"
          >
            <Terminal className="w-4 h-4" />
            <span>Abrir no Terminal Interativo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
