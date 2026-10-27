import React, { useState } from 'react';
import {
  X,
  Download,
  FileCode2,
  FolderArchive,
  Copy,
  Check,
  Terminal,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { PYTHON_VERSIONS } from '../data/pythonCodes';
import { downloadFile, downloadPythonBundleZip } from '../utils/zipExporter';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = async (key: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadPythonBundleZip();
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Central de Download</h3>
              <p className="text-xs text-slate-400">
                Baixe os arquivos de código para executar no seu computador.
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

        {/* Option 1: Full Python Bundle ZIP */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">
                Pacote Completo em Python (.zip)
              </h4>
              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Recomendado
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Contém as 3 versões (.py) + arquivo explicativo de texto com instruções passo a passo.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Gerando arquivo...' : 'Baixar Pacote ZIP'}</span>
          </button>
        </div>

        {/* Option 2: Individual Python Scripts */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode2 className="w-4 h-4 text-sky-400" />
            Ou baixe os arquivos individuais (.py):
          </h4>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Version 1 */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    calculadora_simples.py
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                    Iniciante
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Estrutura direta com as 4 operações (+, -, *, /) e if/elif/else.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopyCode('simples', PYTHON_VERSIONS.simples.code)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Copiar código para a área de transferência"
                >
                  {copiedKey === 'simples' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    downloadFile('calculadora_simples.py', PYTHON_VERSIONS.simples.code)
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .py</span>
                </button>
              </div>
            </div>

            {/* Version 2 */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    calculadora_funcoes.py
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                    Modular
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Código estruturado em funções com <code>def</code> e tratamento de erro com <code>try/except</code>.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopyCode('funcoes', PYTHON_VERSIONS.funcoes.code)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Copiar código para a área de transferência"
                >
                  {copiedKey === 'funcoes' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    downloadFile('calculadora_funcoes.py', PYTHON_VERSIONS.funcoes.code)
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .py</span>
                </button>
              </div>
            </div>

            {/* Version 3 */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-200">
                    calculadora_continua.py
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                    Com Loop
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Não fecha após uma conta: menu interativo contínuo com <code>while True</code>.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopyCode('loop', PYTHON_VERSIONS.loop.code)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Copiar código para a área de transferência"
                >
                  {copiedKey === 'loop' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    downloadFile('calculadora_continua.py', PYTHON_VERSIONS.loop.code)
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .py</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Instructions on How to Run */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Como executar no seu terminal após baixar:
          </div>
          <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            python calculadora_simples.py
          </div>
          <p className="text-[11px] text-slate-400">
            (No Mac ou Linux, utilize <code className="text-slate-300">python3 calculadora_simples.py</code>). Certifique-se de navegar antes até a pasta do arquivo com <code className="text-slate-300">cd Downloads</code>.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
