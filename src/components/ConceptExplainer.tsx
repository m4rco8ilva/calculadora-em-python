import React, { useState } from 'react';
import { PYTHON_CONCEPTS } from '../data/explanations';
import { Copy, Check, Terminal, Calculator, GitFork, Boxes, ShieldAlert, FileCode2, BookOpen, AlertCircle } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5 text-sky-400" />,
  Calculator: <Calculator className="w-5 h-5 text-emerald-400" />,
  GitFork: <GitFork className="w-5 h-5 text-purple-400" />,
  Boxes: <Boxes className="w-5 h-5 text-amber-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
  FileCode2: <FileCode2 className="w-5 h-5 text-blue-400" />,
};

export const ConceptExplainer: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string>(PYTHON_CONCEPTS[0].id);

  const handleCopySnippet = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const active = PYTHON_CONCEPTS.find((c) => c.id === selectedConcept) || PYTHON_CONCEPTS[0];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">
            Anatomia do Código: 6 Conceitos Essenciais do Python
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Entender estes seis blocos de construção dará a você uma base sólida não só para criar calculadoras, mas para qualquer programa em Python.
        </p>

        {/* Quick Nav Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {PYTHON_CONCEPTS.map((concept) => {
            const isCurrent = concept.id === active.id;
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {ICON_MAP[concept.iconName] || <Terminal className="w-4 h-4" />}
                <span>{concept.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Concept Detailed Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
              {ICON_MAP[active.iconName]}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {active.badge}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{active.title}</h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
          {active.shortSummary}
        </p>

        {/* Code Snippet Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Exemplo Prático:</span>
            <button
              onClick={() => handleCopySnippet(active.id, active.codeSnippet)}
              className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition"
            >
              {copiedId === active.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Exemplo</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
            <pre>{active.codeSnippet}</pre>
          </div>
        </div>

        {/* 3 Pillars Grid: Why it matters, Common mistake, Best Practice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              💡 Por que isso importa?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {active.whyItMatters}
            </p>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Erro Comum de Iniciante
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              {active.commonMistake}
            </p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              ⭐ Boa Prática
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {active.bestPractice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
