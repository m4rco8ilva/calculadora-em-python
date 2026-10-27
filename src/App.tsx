import React, { useState } from 'react';
import {
  Calculator,
  History,
  ArrowRightLeft,
  Code2,
  Keyboard,
  Volume2,
  VolumeX,
  Sparkles,
  Terminal,
  BookOpen,
  Laptop,
  Trophy,
  Download,
} from 'lucide-react';

import { ModernCalculator } from './components/ModernCalculator';
import { HistoryTape } from './components/HistoryTape';
import { UnitConverter } from './components/UnitConverter';
import { PythonCodeModal } from './components/PythonCodeModal';
import { KeyboardHelperModal } from './components/KeyboardHelperModal';
import { DownloadModal } from './components/DownloadModal';

// Python learning components preserved and accessible via tab
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ConceptExplainer } from './components/ConceptExplainer';
import { HowToRunGuide } from './components/HowToRunGuide';
import { ChallengesSection } from './components/ChallengesSection';

import { CalculationRecord } from './utils/calculatorEngine';
import { CodeVersionKey } from './types';

export default function App() {
  // Navigation tabs: 'calc' (Calculadora Web Moderna), 'converter', 'history', 'python'
  const [activeTab, setActiveTab] = useState<'calc' | 'converter' | 'history' | 'python'>('calc');
  const [pythonSubTab, setPythonSubTab] = useState<'code' | 'terminal' | 'concepts' | 'guide' | 'challenges'>('code');

  // History state
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  // Sound preference
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [keyboardModalOpen, setKeyboardModalOpen] = useState<boolean>(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [pythonModalOpen, setPythonModalOpen] = useState<boolean>(false);
  const [activePythonSnippet, setActivePythonSnippet] = useState<string>('');

  // Python tutorial state
  const [activeVersion, setActiveVersion] = useState<CodeVersionKey>('simples');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const handleAddHistory = (record: CalculationRecord) => {
    setHistory((prev) => [record, ...prev].slice(0, 50)); // Keep latest 50
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleOpenPythonView = (pySnippet: string) => {
    setActivePythonSnippet(pySnippet);
    setPythonModalOpen(true);
  };

  const handleSelectHistoryRecord = (record: CalculationRecord) => {
    // Switch to calculator view and display prompt
    setActiveTab('calc');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header - Strict 3-zone contract */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('calc')}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 p-0.5 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Calculator className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <span>Calculadora Web</span>
          </button>

          {/* Zone 2: Navigation Links (single line, clean typography) */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 ${
                activeTab === 'calc'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Calculadora
            </button>

            <button
              onClick={() => setActiveTab('converter')}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 ${
                activeTab === 'converter'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Conversor
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>Histórico</span>
              {history.length > 0 && (
                <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                  {history.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('python')}
              className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'python'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Código Python</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Keyboard Help & Download) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setKeyboardModalOpen(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Atalhos de Teclado"
            >
              <Keyboard className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Teclado</span>
            </button>

            <button
              onClick={() => setDownloadModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 whitespace-nowrap shrink-0 active:scale-95"
              title="Baixar arquivos de código"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Baixar Código</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Tab 1: Modern Web Calculator */}
        {activeTab === 'calc' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Primary Calculator Column */}
              <div className="lg:col-span-7 xl:col-span-8 flex justify-center">
                <ModernCalculator
                  onAddHistory={handleAddHistory}
                  onOpenPythonView={handleOpenPythonView}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => setSoundEnabled((prev) => !prev)}
                  historyCount={history.length}
                  onOpenHistory={() => setActiveTab('history')}
                />
              </div>

              {/* Side History Panel on Desktop */}
              <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-24">
                <HistoryTape
                  history={history}
                  onClearHistory={handleClearHistory}
                  onSelectRecord={handleSelectHistoryRecord}
                  onViewPython={handleOpenPythonView}
                />
              </div>
            </div>

            {/* Feature strip below calculator */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-900">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  + -
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">4 Operações Básicas</div>
                  <div className="text-[11px] text-slate-400">Soma, Sub, Mult e Divisão</div>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                  fx
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Modo Científico</div>
                  <div className="text-[11px] text-slate-400">Raiz, Potência, Trig, Log</div>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
                  ⌨
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Suporte a Teclado</div>
                  <div className="text-[11px] text-slate-400">Digite direto no teclado físico</div>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                  🐍
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Ponte para Python</div>
                  <div className="text-[11px] text-slate-400">Veja o código correspondente</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Unit Converter */}
        {activeTab === 'converter' && (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-200">
            <UnitConverter />
          </div>
        )}

        {/* Tab 3: Dedicated Full History View */}
        {activeTab === 'history' && (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-200">
            <HistoryTape
              history={history}
              onClearHistory={handleClearHistory}
              onSelectRecord={handleSelectHistoryRecord}
              onViewPython={handleOpenPythonView}
            />
          </div>
        )}

        {/* Tab 4: Python Learning Companion */}
        {activeTab === 'python' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Sub-navigation for Python learning */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-sky-400" />
                  Módulo de Aprendizado Python
                </h2>
                <p className="text-xs text-slate-400">
                  Aprenda os conceitos de programação por trás das calculadoras.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setPythonSubTab('code')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    pythonSubTab === 'code' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Código-Fonte
                </button>
                <button
                  onClick={() => setPythonSubTab('terminal')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    pythonSubTab === 'terminal' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Terminal Interativo
                </button>
                <button
                  onClick={() => setPythonSubTab('concepts')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    pythonSubTab === 'concepts' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Conceitos
                </button>
                <button
                  onClick={() => setPythonSubTab('guide')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    pythonSubTab === 'guide' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Como Rodar no PC
                </button>
                <button
                  onClick={() => setPythonSubTab('challenges')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    pythonSubTab === 'challenges' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Desafios
                </button>
              </div>
            </div>

            {pythonSubTab === 'code' && (
              <CodeViewer
                activeVersion={activeVersion}
                onVersionChange={setActiveVersion}
                selectedLine={selectedLine}
                onSelectLine={setSelectedLine}
              />
            )}

            {pythonSubTab === 'terminal' && <TerminalSimulator />}

            {pythonSubTab === 'concepts' && <ConceptExplainer />}

            {pythonSubTab === 'guide' && <HowToRunGuide />}

            {pythonSubTab === 'challenges' && <ChallengesSection />}
          </div>
        )}
      </main>

      {/* Python Equivalent Code Modal */}
      <PythonCodeModal
        isOpen={pythonModalOpen}
        onClose={() => setPythonModalOpen(false)}
        codeSnippet={activePythonSnippet}
        onGoToTerminal={() => {
          setActiveTab('python');
          setPythonSubTab('terminal');
        }}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardHelperModal
        isOpen={keyboardModalOpen}
        onClose={() => setKeyboardModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>Calculadora Web Moderna • 4 Operações, Científica & Ponte Python</div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setKeyboardModalOpen(true)}
              className="hover:text-slate-200 transition"
            >
              Atalhos de Teclado
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveTab('python');
                setPythonSubTab('code');
              }}
              className="hover:text-slate-200 transition"
            >
              Tutorial Python
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
