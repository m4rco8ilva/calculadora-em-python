import JSZip from 'jszip';
import { PYTHON_VERSIONS } from '../data/pythonCodes';

export function downloadFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadPythonBundleZip() {
  const zip = new JSZip();

  // Add Python versions
  zip.file('1_calculadora_simples.py', PYTHON_VERSIONS.simples.code);
  zip.file('2_calculadora_funcoes.py', PYTHON_VERSIONS.funcoes.code);
  zip.file('3_calculadora_continua.py', PYTHON_VERSIONS.loop.code);

  const readme = `# CALCULADORA EM PYTHON - GUIA DE EXECUÇÃO

Parabéns pelo download! Este pacote contém 3 versões didáticas da calculadora:

1. "1_calculadora_simples.py"
   - A versão mais direta e recomendada para quem está começando hoje.
   - Executa as 4 operações (+, -, *, /) usando if/elif/else e tratamento de divisão por zero.

2. "2_calculadora_funcoes.py"
   - Organizada em funções ("def") reutilizáveis com tratamento de erro try/except.

3. "3_calculadora_continua.py"
   - Inclui um loop ("while True") e menu contínuo com opção de sair digitando 0.

---
COMO EXECUTAR NO SEU COMPUTADOR:

1. Tenha o Python 3 instalado (baixe em https://www.python.org se ainda não tiver).
   * No Windows, marque a opção "Add python.exe to PATH" durante a instalação!

2. Abra o terminal (Prompt de Comando, PowerShell ou Terminal do Mac/Linux).

3. Navegue até a pasta onde salvou estes arquivos:
   cd ~/Downloads  (ou a pasta onde você descompactou)

4. Execute o arquivo desejado:
   python 1_calculadora_simples.py
   (no Mac/Linux, use: python3 1_calculadora_simples.py)

Bons estudos e boa prática!
`;

  zip.file('COMO_RODAR_LEIA_ME.txt', readme);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'calculadora_python_completa.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
