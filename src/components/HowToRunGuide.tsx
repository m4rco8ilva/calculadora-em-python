import React, { useState } from 'react';
import { Laptop, Terminal, Globe, Code, CheckCircle2, AlertOctagon, HelpCircle, ExternalLink } from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'online' | 'vscode' | 'terminal' | 'erros'>('online');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-emerald-400" />
          Guia do Iniciante: Como Rodar o Código Python
        </h2>
        <p className="text-sm text-slate-300">
          Você tem várias maneiras fáceis de rodar sua calculadora. Se não quiser instalar nada agora, comece pela opção online!
        </p>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setActiveTab('online')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
              activeTab === 'online'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            1. No Navegador (Sem Instalar Nada)
          </button>

          <button
            onClick={() => setActiveTab('vscode')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
              activeTab === 'vscode'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            2. No VS Code (Editor Profissional)
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
              activeTab === 'terminal'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            3. Pelo Terminal do seu PC
          </button>

          <button
            onClick={() => setActiveTab('erros')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
              activeTab === 'erros'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            4. Guia de Erros Comuns
          </button>
        </div>
      </div>

      {/* Tab 1: Online */}
      {activeTab === 'online' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Globe className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Opção Mais Rápida: Google Colab ou Replit</h3>
              <p className="text-xs text-slate-400">Funciona direto no seu navegador sem precisar baixar nenhum programa.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">1</span>
              <h4 className="text-sm font-semibold text-white">Abra o Google Colab</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acesse <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline inline-flex items-center gap-0.5">colab.research.google.com <ExternalLink className="w-3 h-3 inline" /></a> e clique em "Novo Notebook".
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">2</span>
              <h4 className="text-sm font-semibold text-white">Cole o Código</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clique na primeira célula de código e cole o código da calculadora copiado daqui.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">3</span>
              <h4 className="text-sm font-semibold text-white">Execute com Play (▶)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clique no botão de Play redondo à esquerda da célula ou aperte <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] text-slate-300">Shift + Enter</kbd>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: VS Code */}
      {activeTab === 'vscode' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Code className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Visual Studio Code (Padrão da Indústria)</h3>
              <p className="text-xs text-slate-400">O editor mais popular do mundo para desenvolver em Python.</p>
            </div>
          </div>

          <ol className="space-y-3 text-xs text-slate-300">
            <li className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
              <span className="font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-xs">Passo 1</span>
              <div>
                <strong>Instale o Python oficial:</strong> Baixe em <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer" className="text-sky-400 underline">python.org/downloads</a>.
                <span className="block text-amber-300 font-semibold mt-1">⚠️ ATENÇÃO NO WINDOWS: Na primeira tela do instalador, marque a caixinha "Add python.exe to PATH"!</span>
              </div>
            </li>

            <li className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
              <span className="font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-xs">Passo 2</span>
              <div>
                <strong>Instale o VS Code:</strong> Baixe em <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="text-sky-400 underline">code.visualstudio.com</a>.
              </div>
            </li>

            <li className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
              <span className="font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-xs">Passo 3</span>
              <div>
                <strong>Instale a Extensão Python da Microsoft:</strong> No VS Code, clique no ícone de blocos à esquerda (Extensões) e busque por "Python". Clique em Install.
              </div>
            </li>

            <li className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
              <span className="font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-xs">Passo 4</span>
              <div>
                <strong>Crie o arquivo:</strong> Crie um novo arquivo chamado <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">calculadora.py</code>, cole o código e aperte o botão de Play (▶) no canto superior direito!
              </div>
            </li>
          </ol>
        </div>
      )}

      {/* Tab 3: Terminal */}
      {activeTab === 'terminal' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Executando pelo Terminal / Prompt de Comando</h3>
              <p className="text-xs text-slate-400">Windows PowerShell, CMD, terminal do Mac ou Linux.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-500"># 1. Verifique se o Python está instalado:</div>
              <div className="text-emerald-400">python --version</div>
              <div className="text-slate-500"># (Em Macs e Linux, pode ser: python3 --version)</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-500"># 2. Navegue até a pasta onde salvou o arquivo:</div>
              <div className="text-emerald-400">cd ~/Downloads  ou  cd Documentos</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-500"># 3. Execute o programa:</div>
              <div className="text-emerald-400">python calculadora_simples.py</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Common Errors */}
      {activeTab === 'erros' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            Os Erros que Todo Iniciante Encontra (e Como Resolver)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="font-mono font-bold text-rose-400">IndentationError: unexpected indent</div>
              <p className="text-slate-300">
                O Python usa espaços no início da linha para saber o que está dentro do if, def ou while.
              </p>
              <div className="text-emerald-400 font-medium">Solução: Use sempre 4 espaços (ou uma tecla Tab) de recuo uniforme.</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="font-mono font-bold text-rose-400">ZeroDivisionError: division by zero</div>
              <p className="text-slate-300">
                Você tentou fazer uma divisão onde o divisor é 0 (ex: 10 / 0).
              </p>
              <div className="text-emerald-400 font-medium">Solução: Sempre coloque um if divisor != 0 antes de dividir.</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="font-mono font-bold text-rose-400">ValueError: could not convert string to float</div>
              <p className="text-slate-300">
                O usuário digitou letras (ex: "cinco") onde o float() esperava dígitos ("5").
              </p>
              <div className="text-emerald-400 font-medium">Solução: Use a estrutura try/except para proteger a leitura.</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="font-mono font-bold text-rose-400">SyntaxError: invalid syntax</div>
              <p className="text-slate-300">
                Geralmente significa que você esqueceu de fechar aspas, parênteses ou esqueceu os dois pontos ":" no final do if/def.
              </p>
              <div className="text-emerald-400 font-medium">Solução: Verifique a linha indicada e veja se falta fechar ")", "]" ou ":".</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
