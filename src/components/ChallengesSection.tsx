import React, { useState } from 'react';
import { BEGINNER_CHALLENGES } from '../data/explanations';
import { Trophy, HelpCircle, Eye, EyeOff, Check, Copy, Sparkles } from 'lucide-react';

export const ChallengesSection: React.FC = () => {
  const [openHintId, setOpenHintId] = useState<string | null>(null);
  const [openSolutionId, setOpenSolutionId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const getDifficultyBadge = (diff: string) => {
    if (diff === 'Fácil') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (diff === 'Médio') {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            Desafios Práticos: Suba de Nível
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          A melhor maneira de fixar programação é alterando o código por conta própria. Tente resolver cada um destes exercícios no seu código!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BEGINNER_CHALLENGES.map((ch) => {
          const isHintOpen = openHintId === ch.id;
          const isSolutionOpen = openSolutionId === ch.id;

          return (
            <div
              key={ch.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-white">{ch.title}</h3>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(
                      ch.difficulty
                    )}`}
                  >
                    {ch.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ch.description}
                </p>

                {/* Hint toggle */}
                {isHintOpen && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2 animate-in fade-in duration-200">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block mb-0.5">Dica:</strong>
                      {ch.hint}
                    </div>
                  </div>
                )}

                {/* Solution Code toggle */}
                {isSolutionOpen && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        Solução em Python:
                      </span>
                      <button
                        onClick={() => handleCopy(ch.id, ch.solutionCode)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded"
                      >
                        {copiedId === ch.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
                      {ch.solutionCode}
                    </pre>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {ch.solutionExplanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setOpenHintId(isHintOpen ? null : ch.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    isHintOpen
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {isHintOpen ? 'Ocultar Dica' : 'Ver Dica'}
                </button>

                <button
                  onClick={() => setOpenSolutionId(isSolutionOpen ? null : ch.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    isSolutionOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {isSolutionOpen ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Ocultar Solução
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Ver Solução
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
