import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface KeyboardHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardHelperModal: React.FC<KeyboardHelperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 – 9', desc: 'Digita os números diretamente no visor' },
    { key: '+  -  *  /', desc: 'Executa as 4 operações matemáticas' },
    { key: 'Enter ou =', desc: 'Calcula o resultado da expressão' },
    { key: 'Backspace (⌫)', desc: 'Apaga o último dígito inserido' },
    { key: 'Escape (Esc)', desc: 'Limpa tudo (All Clear - AC)' },
    { key: '. ou ,', desc: 'Insere o ponto decimal' },
    { key: '%', desc: 'Calcula porcentagem do valor atual' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Atalhos de Teclado</h3>
              <p className="text-xs text-slate-400">Você pode usar seu teclado físico normalmente.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
            >
              <kbd className="font-mono bg-slate-900 border border-slate-700/80 px-2 py-1 rounded text-slate-200 font-semibold shadow-sm">
                {sc.key}
              </kbd>
              <span className="text-slate-300">{sc.desc}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
