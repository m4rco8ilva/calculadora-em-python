import React, { useState } from 'react';
import { Copy, Check, Download, Info, Lightbulb, Code2 } from 'lucide-react';
import { PYTHON_VERSIONS } from '../data/pythonCodes';
import { CodeVersionKey } from '../types';

interface CodeViewerProps {
  activeVersion: CodeVersionKey;
  onVersionChange: (version: CodeVersionKey) => void;
  selectedLine: number | null;
  onSelectLine: (line: number | null) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  activeVersion,
  onVersionChange,
  selectedLine,
  onSelectLine,
}) => {
  const [copied, setCopied] = useState(false);
  const currentData = PYTHON_VERSIONS[activeVersion];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentData.code], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = currentData.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = currentData.code.split('\n');
  const currentAnnotation = selectedLine ? currentData.annotations[selectedLine] : null;

  // Simple syntax colorizer for Python
  const renderHighlightedLine = (text: string) => {
    if (text.trim().startsWith('#')) {
      return <span className="text-emerald-400 italic font-mono">{text}</span>;
    }

    // Split token markers for basic highlighting
    const parts = text.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:def|return|if|elif|else|while|break|continue|try|except|import|from|in|not|is|None|True|False)\b|\b(?:print|input|float|int|str|len|range)\b)/g);

    return (
      <span className="font-mono">
        {parts.map((part, i) => {
          if (!part) return null;
          if (part.startsWith('"') || part.startsWith("'")) {
            return <span key={i} className="text-amber-300">{part}</span>;
          }
          if (['def', 'return', 'if', 'elif', 'else', 'while', 'break', 'continue', 'try', 'except', 'import', 'from', 'in', 'not', 'is'].includes(part)) {
            return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
          }
          if (['True', 'False', 'None'].includes(part)) {
            return <span key={i} className="text-orange-400 font-semibold">{part}</span>;
          }
          if (['print', 'input', 'float', 'int', 'str', 'len', 'range'].includes(part)) {
            return <span key={i} className="text-sky-400 font-semibold">{part}</span>;
          }
          if (part.match(/^[0-9]+(\.[0-9]+)?$/)) {
            return <span key={i} className="text-pink-400">{part}</span>;
          }
          if (part.match(/[+\-*/=<>!%]/)) {
            return <span key={i} className="text-rose-400">{part}</span>;
          }
          return <span key={i} className="text-slate-200">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Version Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 backdrop-blur-sm">
        <div className="text-xs font-semibold text-slate-400 px-3 pb-2 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-emerald-400" />
          Escolha o nível de complexidade do código:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {(Object.keys(PYTHON_VERSIONS) as CodeVersionKey[]).map((vKey) => {
            const v = PYTHON_VERSIONS[vKey];
            const isActive = activeVersion === vKey;
            return (
              <button
                key={vKey}
                onClick={() => {
                  onVersionChange(vKey);
                  onSelectLine(null);
                }}
                className={`text-left p-3 rounded-xl transition-all duration-200 border ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold text-sm text-slate-100">{v.title}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-700/50 text-slate-400 border-slate-600/40'
                  }`}>
                    {v.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{v.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Main Code Editor Panel */}
        <div className={`rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300 ${
          currentAnnotation ? 'lg:col-span-8' : 'lg:col-span-12'
        }`}>
          {/* Top Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {currentData.filename}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                • Dica: clique em qualquer linha com <Info className="w-3.5 h-3.5 inline text-sky-400" /> para ver a explicação
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
                title="Copiar código para a área de transferência"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40 transition"
                title="Baixar arquivo .py para executar no seu computador"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .py</span>
              </button>
            </div>
          </div>

          {/* Line by Line Code View */}
          <div className="p-2 sm:p-4 overflow-x-auto text-sm leading-relaxed max-h-[620px] overflow-y-auto">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((lineText, idx) => {
                  const lineNumber = idx + 1;
                  const hasAnnotation = !!currentData.annotations[lineNumber];
                  const isSelected = selectedLine === lineNumber;

                  return (
                    <tr
                      key={lineNumber}
                      onClick={() => {
                        if (hasAnnotation) {
                          onSelectLine(isSelected ? null : lineNumber);
                        }
                      }}
                      className={`group transition-colors duration-150 rounded ${
                        isSelected
                          ? 'bg-sky-500/20'
                          : hasAnnotation
                          ? 'hover:bg-slate-800/50 cursor-pointer'
                          : 'hover:bg-slate-900/40'
                      }`}
                    >
                      {/* Line Number */}
                      <td className="w-10 sm:w-12 text-right pr-3 select-none text-xs font-mono text-slate-600 group-hover:text-slate-400 align-top pt-0.5">
                        {lineNumber}
                      </td>

                      {/* Annotation Indicator */}
                      <td className="w-5 text-center select-none align-top pt-0.5">
                        {hasAnnotation && (
                          <span
                            title="Clique para ver explicação desta linha"
                            className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                              isSelected
                                ? 'bg-sky-400 text-slate-950 font-black scale-110'
                                : 'bg-slate-800 text-sky-400 group-hover:bg-sky-500/30 group-hover:text-sky-300'
                            }`}
                          >
                            ?
                          </span>
                        )}
                      </td>

                      {/* Code Content */}
                      <td className="pl-2 font-mono whitespace-pre text-slate-200">
                        {renderHighlightedLine(lineText)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Explanation Sidecard (when line clicked) */}
        {currentAnnotation && (
          <div className="lg:col-span-4 bg-slate-900/95 border border-sky-500/40 rounded-2xl p-5 shadow-xl text-slate-200 space-y-3 sticky top-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                  Linha {currentAnnotation.line}
                </span>
                <h4 className="font-semibold text-base text-white mt-1">
                  {currentAnnotation.label}
                </h4>
              </div>
              <button
                onClick={() => onSelectLine(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400">Conceito:</div>
              <div className="text-sm font-semibold text-emerald-300">
                {currentAnnotation.concept}
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {currentAnnotation.explanation}
            </div>

            {currentAnnotation.beginnerTip && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-300 block mb-0.5">Dica para Iniciantes:</strong>
                  {currentAnnotation.beginnerTip}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
