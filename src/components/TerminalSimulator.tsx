import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Terminal, CheckCircle2, AlertTriangle, ArrowRight, Cpu } from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'output' | 'input-prompt' | 'user-input' | 'error' | 'success' | 'system';
  text: string;
}

type ExecStep = 'idle' | 'await_choice' | 'await_num1' | 'await_num2' | 'completed';

export const TerminalSimulator: React.FC = () => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Python 3.12.0 (main, standard interpreter)',
    },
    {
      id: 'init-2',
      type: 'system',
      text: '$ python calculadora.py',
    },
    {
      id: 'menu-1',
      type: 'output',
      text: '=== CALCULADORA BÁSICA ===\n1 - Adição (+)\n2 - Subtração (-)\n3 - Multiplicação (*)\n4 - Divisão (/)',
    },
    {
      id: 'prompt-1',
      type: 'input-prompt',
      text: 'Escolha uma operação (1, 2, 3 ou 4): ',
    },
  ]);

  const [step, setStep] = useState<ExecStep>('await_choice');
  const [inputValue, setInputValue] = useState('');
  const [choice, setChoice] = useState<string>('');
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [result, setResult] = useState<number | string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (step !== 'completed' && step !== 'idle') {
      inputRef.current?.focus();
    }
  }, [logs, step]);

  const resetTerminal = () => {
    setLogs([
      {
        id: 'sys-restart',
        type: 'system',
        text: '$ python calculadora.py',
      },
      {
        id: 'menu-new',
        type: 'output',
        text: '=== CALCULADORA BÁSICA ===\n1 - Adição (+)\n2 - Subtração (-)\n3 - Multiplicação (*)\n4 - Divisão (/)',
      },
      {
        id: 'prompt-new',
        type: 'input-prompt',
        text: 'Escolha uma operação (1, 2, 3 ou 4): ',
      },
    ]);
    setStep('await_choice');
    setInputValue('');
    setChoice('');
    setNum1(null);
    setNum2(null);
    setResult(null);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val && step !== 'completed') return;

    if (step === 'await_choice') {
      // Record user input
      setLogs((prev) => [
        ...prev,
        { id: `input-${Date.now()}`, type: 'user-input', text: val },
      ]);
      setInputValue('');

      if (!['1', '2', '3', '4'].includes(val)) {
        setLogs((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            type: 'error',
            text: 'Opção inválida! Escolha apenas entre 1, 2, 3 ou 4.',
          },
        ]);
        setStep('completed');
        return;
      }

      setChoice(val);
      setStep('await_num1');
      setLogs((prev) => [
        ...prev,
        {
          id: `p-n1-${Date.now()}`,
          type: 'input-prompt',
          text: 'Digite o primeiro número: ',
        },
      ]);
      return;
    }

    if (step === 'await_num1') {
      setLogs((prev) => [
        ...prev,
        { id: `input-${Date.now()}`, type: 'user-input', text: val },
      ]);
      setInputValue('');

      // Normalize comma to dot for friendly localized input
      const normalized = val.replace(',', '.');
      const parsed = parseFloat(normalized);

      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            type: 'error',
            text: `ValueError: could not convert string to float: '${val}'\n(No Python puro, digitar letras aqui trava o programa com ValueError!)`,
          },
        ]);
        setStep('completed');
        return;
      }

      setNum1(parsed);
      setStep('await_num2');
      setLogs((prev) => [
        ...prev,
        {
          id: `p-n2-${Date.now()}`,
          type: 'input-prompt',
          text: 'Digite o segundo número: ',
        },
      ]);
      return;
    }

    if (step === 'await_num2') {
      setLogs((prev) => [
        ...prev,
        { id: `input-${Date.now()}`, type: 'user-input', text: val },
      ]);
      setInputValue('');

      const normalized = val.replace(',', '.');
      const parsed = parseFloat(normalized);

      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            type: 'error',
            text: `ValueError: could not convert string to float: '${val}'`,
          },
        ]);
        setStep('completed');
        return;
      }

      setNum2(parsed);
      calculateResult(choice, num1 ?? 0, parsed);
    }
  };

  const calculateResult = (op: string, a: number, b: number) => {
    let res: number | string = 0;
    let symbol = '+';

    if (op === '1') {
      res = a + b;
      symbol = '+';
      setLogs((prev) => [
        ...prev,
        {
          id: `res-${Date.now()}`,
          type: 'success',
          text: `Resultado: ${a} + ${b} = ${res}`,
        },
      ]);
    } else if (op === '2') {
      res = a - b;
      symbol = '-';
      setLogs((prev) => [
        ...prev,
        {
          id: `res-${Date.now()}`,
          type: 'success',
          text: `Resultado: ${a} - ${b} = ${res}`,
        },
      ]);
    } else if (op === '3') {
      res = a * b;
      symbol = '*';
      setLogs((prev) => [
        ...prev,
        {
          id: `res-${Date.now()}`,
          type: 'success',
          text: `Resultado: ${a} * ${b} = ${res}`,
        },
      ]);
    } else if (op === '4') {
      symbol = '/';
      if (b === 0) {
        res = 'ZeroDivisionError';
        setLogs((prev) => [
          ...prev,
          {
            id: `res-${Date.now()}`,
            type: 'error',
            text: 'Erro: Não é possível dividir nenhum número por zero!\n(O código evitou com sucesso um ZeroDivisionError)',
          },
        ]);
      } else {
        res = a / b;
        setLogs((prev) => [
          ...prev,
          {
            id: `res-${Date.now()}`,
            type: 'success',
            text: `Resultado: ${a} / ${b} = ${res}`,
          },
        ]);
      }
    }

    setResult(res);
    setStep('completed');
  };

  // Helper for 1-click test scenarios
  const runPreset = (op: string, a: number, b: number, label: string) => {
    resetTerminal();
    setTimeout(() => {
      setChoice(op);
      setNum1(a);
      setNum2(b);

      const opSymbol = op === '1' ? '+' : op === '2' ? '-' : op === '3' ? '*' : '/';
      let resText = '';
      let isErr = false;

      if (op === '4' && b === 0) {
        resText = 'Erro: Não é possível dividir nenhum número por zero!';
        isErr = true;
      } else {
        const computed = op === '1' ? a + b : op === '2' ? a - b : op === '3' ? a * b : a / b;
        resText = `Resultado: ${a} ${opSymbol} ${b} = ${computed}`;
        setResult(computed);
      }

      setLogs([
        { id: '1', type: 'system', text: '$ python calculadora.py' },
        { id: '2', type: 'output', text: '=== CALCULADORA BÁSICA ===\n1 - Adição (+)\n2 - Subtração (-)\n3 - Multiplicação (*)\n4 - Divisão (/)' },
        { id: '3', type: 'input-prompt', text: 'Escolha uma operação (1, 2, 3 ou 4): ' },
        { id: '4', type: 'user-input', text: op },
        { id: '5', type: 'input-prompt', text: 'Digite o primeiro número: ' },
        { id: '6', type: 'user-input', text: String(a) },
        { id: '7', type: 'input-prompt', text: 'Digite o segundo número: ' },
        { id: '8', type: 'user-input', text: String(b) },
        {
          id: '9',
          type: isErr ? 'error' : 'success',
          text: resText,
        },
      ]);
      setStep('completed');
    }, 150);
  };

  const getOpName = (op: string) => {
    switch (op) {
      case '1': return 'Adição (+)';
      case '2': return 'Subtração (-)';
      case '3': return 'Multiplicação (*)';
      case '4': return 'Divisão (/)';
      default: return 'Não definida';
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Scenarios Quick Buttons */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Cenários de Teste Rápidos (Clique para simular):
          </div>
          <button
            onClick={resetTerminal}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Terminal
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => runPreset('1', 15, 27, 'Soma')}
            className="text-xs p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 transition text-left"
          >
            <span className="text-emerald-400 font-bold block mb-0.5">Soma</span>
            15 + 27 = 42
          </button>

          <button
            onClick={() => runPreset('2', 50.5, 18.2, 'Subtração')}
            className="text-xs p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-sky-500/50 hover:bg-sky-500/10 text-slate-300 transition text-left"
          >
            <span className="text-sky-400 font-bold block mb-0.5">Subtração</span>
            50.5 - 18.2 = 32.3
          </button>

          <button
            onClick={() => runPreset('3', 8.5, 4, 'Multiplicação')}
            className="text-xs p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-300 transition text-left"
          >
            <span className="text-purple-400 font-bold block mb-0.5">Multiplicação</span>
            8.5 * 4 = 34
          </button>

          <button
            onClick={() => runPreset('4', 100, 4, 'Divisão')}
            className="text-xs p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300 transition text-left"
          >
            <span className="text-blue-400 font-bold block mb-0.5">Divisão Real</span>
            100 / 4 = 25.0
          </button>

          <button
            onClick={() => runPreset('4', 42, 0, 'Divisão por Zero')}
            className="text-xs p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:border-rose-500/70 text-rose-200 transition text-left"
          >
            <span className="text-rose-400 font-bold block mb-0.5">Teste Zero</span>
            42 / 0 (Erro seguro)
          </button>

          <button
            onClick={() => {
              resetTerminal();
              setLogs((prev) => [
                ...prev,
                { id: 't-1', type: 'user-input', text: '1' },
                { id: 't-2', type: 'input-prompt', text: 'Digite o primeiro número: ' },
                { id: 't-3', type: 'user-input', text: 'dez' },
                {
                  id: 't-4',
                  type: 'error',
                  text: "ValueError: could not convert string to float: 'dez'\n💡 Dica: O Python só aceita dígitos no float()! Para evitar isso, usa-se 'try / except'.",
                },
              ]);
              setStep('completed');
            }}
            className="text-xs p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/70 text-amber-200 transition text-left"
          >
            <span className="text-amber-400 font-bold block mb-0.5">Teste Letra</span>
            float("dez") ➜ Erro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Terminal Window */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          {/* Terminal Window Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                bash — python3 calculadora.py
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {step === 'completed' ? 'Finalizado' : 'Aguardando Entrada'}
            </span>
          </div>

          {/* Terminal Screen Body */}
          <div className="p-4 sm:p-5 font-mono text-sm leading-relaxed min-h-[340px] max-h-[440px] overflow-y-auto space-y-2">
            {logs.map((log) => {
              if (log.type === 'system') {
                return (
                  <div key={log.id} className="text-slate-500 text-xs">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'output') {
                return (
                  <div key={log.id} className="text-slate-300 whitespace-pre-line py-1">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'input-prompt') {
                return (
                  <span key={log.id} className="text-sky-300 inline mr-1">
                    {log.text}
                  </span>
                );
              }
              if (log.type === 'user-input') {
                return (
                  <span key={log.id} className="text-emerald-400 font-bold block mb-1">
                    {log.text}
                  </span>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={log.id} className="text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60 whitespace-pre-line text-xs my-2">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={log.id} className="text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/60 font-semibold my-2">
                    {log.text}
                  </div>
                );
              }
              return null;
            })}

            {/* Active Input Line */}
            {step !== 'completed' && (
              <form onSubmit={handleInputSubmit} className="flex items-center gap-1.5 pt-1">
                <span className="text-emerald-400 font-bold">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    step === 'await_choice'
                      ? 'Digite 1, 2, 3 ou 4 e tecle Enter...'
                      : 'Digite o número e tecle Enter...'
                  }
                  className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-sm placeholder:text-slate-600 focus:ring-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded font-sans font-medium transition"
                >
                  Enviar ↵
                </button>
              </form>
            )}

            {step === 'completed' && (
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-500">
                  Processo finalizado com código de saída 0.
                </span>
                <button
                  onClick={resetTerminal}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Fazer outro cálculo
                </button>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Python Variable Inspector (Inspects RAM variables during execution!) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-sm text-slate-200">
              Memória do Python (Variáveis)
            </h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Veja exatamente o que o Python está armazenando na memória durante cada passo do código:
          </p>

          <div className="space-y-2.5">
            {/* opcao */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-purple-400 font-semibold block">opcao</span>
                <span className="text-[11px] text-slate-500">Tipo: str (string)</span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300">
                {choice ? `"${choice}" (${getOpName(choice)})` : 'None (vazio)'}
              </span>
            </div>

            {/* num1 */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-sky-400 font-semibold block">num1</span>
                <span className="text-[11px] text-slate-500">Tipo: float (decimal)</span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-300">
                {num1 !== null ? `${num1}` : 'None'}
              </span>
            </div>

            {/* num2 */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-sky-400 font-semibold block">num2</span>
                <span className="text-[11px] text-slate-500">Tipo: float (decimal)</span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-300">
                {num2 !== null ? `${num2}` : 'None'}
              </span>
            </div>

            {/* resultado */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-semibold block">resultado</span>
                <span className="text-[11px] text-slate-500">Tipo: {typeof result === 'number' ? 'float' : 'str'}</span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-bold">
                {result !== null ? `${result}` : 'Aguardando...'}
              </span>
            </div>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-100 block mb-1">Como o Python pensa:</strong>
            Quando você digita no terminal, o comando <code className="text-sky-300">input()</code> captura texto. O <code className="text-purple-300">float()</code> transforma em número. Então a condição <code className="text-emerald-300">if</code> escolhe o operador exato!
          </div>
        </div>
      </div>
    </div>
  );
};
