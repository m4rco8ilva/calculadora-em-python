# 🧮 Calculadora em Python & Web Moderna

> Uma calculadora completa e didática desenvolvida para quem está dando os primeiros passos na programação em **Python** e deseja também uma **aplicação web moderna** com as 4 operações matemáticas básicas, modo científico, histórico e atalhos de teclado.

---

## 📌 Sumário

1. [Visão Geral](#-visão-geral)
2. [Principais Funcionalidades](#-principais-funcionalidades)
3. [Versões do Código em Python](#-versões-do-código-em-python)
4. [Como Executar o Código Python](#-como-executar-o-código-python)
5. [Como Executar a Aplicação Web](#-como-executar-a-aplicação-web)
6. [Explicação dos Principais Componentes do Código](#-explicação-dos-principais-componentes-do-código)
7. [Atalhos de Teclado (Aplicação Web)](#-atalhos-de-teclado-aplicação-web)
8. [Perguntas Frequentes & Erros Comuns](#-perguntas-frequentes--erros-comuns)

---

## 🎯 Visão Geral

Este projeto foi desenhado com um duplo propósito:
- **Para Estudantes de Programação:** Um código em Python limpo, muito bem comentado e organizado de forma progressiva (do mais básico ao avançado com funções e repetições).
- **Para Usuários da Web:** Uma interface web moderna, rápida e responsiva que executa cálculos instantaneamente, registra o histórico e mostra em tempo real o código Python equivalente de cada operação realizada.

---

## ✨ Principais Funcionalidades

### 1. As Quatro Operações Básicas
- **Adição (`+`):** Soma entre números inteiros e decimais.
- **Subtração (`-`):** Diferença entre valores, suportando números negativos.
- **Multiplicação (`*` ou `×`):** Produto de dois fatores.
- **Divisão (`/` ou `÷`):** Quociente real com proteção automática contra divisão por zero (`ZeroDivisionError`).

### 2. Recursos Avançados na Web
- **Modo Científico Expandido:** Potência ($x^y$, $x^2$), Raiz Quadrada ($\sqrt{x}$), Constantes ($\pi$, $e$), Trigonometria ($\sin$, $\cos$, $\tan$), Logaritmos ($\log_{10}$, $\ln$) e Fatorial ($n!$).
- **Fita de Histórico:** Guarda os últimos cálculos com horário. Permite recarregar expressões no visor com um clique e exportar para arquivo `.txt`.
- **Conversor de Unidades:** Conversão instantânea de Comprimento, Peso/Massa, Temperatura e Armazenamento Digital.
- **Ponte Didática Python:** Cada cálculo feito na interface gráfica gera automaticamente o código Python correspondente com botão para inspecionar.
- **Feedback Sonoro:** Sons sutis de clique mecânico sintetizados via Web Audio (com botão liga/desliga).

---

## 🐍 Versões do Código em Python

O projeto disponibiliza 3 versões didáticas:

| Versão | Arquivo | Descrição | Nível |
|---|---|---|---|
| **1. Simples** | `calculadora_simples.py` | Estrutura linear direta de cima para baixo com `if/elif/else`. | Iniciante (1º dia) |
| **2. Modular** | `calculadora_funcoes.py` | Cada operação isolada em sua própria função (`def`) com `try/except`. | Boas Práticas |
| **3. Contínua** | `calculadora_continua.py` | Menu interativo com loop `while True`, não fecha após uma conta. | Completo |

---

## 🚀 Como Executar o Código Python

### Opção 1: No seu Computador (Terminal / Prompt de Comando)

1. Certifique-se de ter o Python 3 instalado. Verifique digitando no terminal:
   ```bash
   python --version
   # ou no Mac/Linux:
   python3 --version
   ```
   *(Caso não tenha, baixe gratuitamente em [python.org/downloads](https://www.python.org/downloads). No Windows, lembre-se de marcar a opção **"Add python.exe to PATH"**).*

2. Abra o terminal e navegue até a pasta onde salvou o arquivo:
   ```bash
   cd ~/Downloads  # ou o caminho da sua pasta
   ```

3. Execute o script desejado:
   ```bash
   python calculadora_simples.py
   ```
   *(No macOS ou Linux, use: `python3 calculadora_simples.py`)*

---

### Opção 2: No Visual Studio Code (VS Code)

1. Abra o VS Code e instale a extensão oficial **Python** (da Microsoft).
2. Abra o arquivo `calculadora_simples.py`.
3. Clique no botão de **Play (▶)** no canto superior direito do editor ou pressione <kbd>F5</kbd>.
4. O programa será executado no painel de terminal integrado na parte inferior da tela.

---

### Opção 3: No Navegador (Sem Instalar Nada)

Você pode colar o código diretamente no **[Google Colab](https://colab.research.google.com)** ou no **[Replit](https://replit.com)** e clicar em Executar.

---

## 💻 Como Executar a Aplicação Web

A interface web moderna foi construída com **React 19**, **TypeScript**, **Vite** e **Tailwind CSS**.

### Requisitos:
- Node.js versão 18 ou superior instalado.

### Passos:
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento local:
   ```bash
   npm run dev
   ```

3. Abra o navegador no endereço exibido no terminal (geralmente `http://localhost:3000`).

---

## 🧠 Explicação dos Principais Componentes do Código

Abaixo estão explicados os blocos fundamentais utilizados no script Python para quem está aprendendo:

### 1. Entrada de Dados e Conversão de Tipo (`float(input(...))`)
```python
num1 = float(input("Digite o primeiro número: "))
```
- **`input()`:** Pausa a execução e aguarda o usuário digitar um valor e pressionar <kbd>Enter</kbd>.
- **Atenção:** O `input()` **sempre** retorna o valor como texto (`string`). Se somarmos `"10"` + `"20"`, o resultado seria `"1020"` (concatenação de texto).
- **`float()`:** Converte esse texto para um número decimal (ponto flutuante), permitindo realizar contas matemáticas reais com números inteiros e decimais (ex: `7.5`, `3.14`).

---

### 2. Estrutura de Decisão (`if`, `elif`, `else`)
```python
if opcao == "1":
    resultado = num1 + num2
elif opcao == "2":
    resultado = num1 - num2
elif opcao == "3":
    resultado = num1 * num2
elif opcao == "4":
    # Divisão com verificação
    if num2 != 0:
        resultado = num1 / num2
    else:
        print("Erro: Divisão por zero!")
else:
    print("Opção inválida!")
```
- **`==` (Dois iguais):** Operador de comparação. Compara se a variável é igual ao valor esperado.
- **`if`:** Testa a primeira condição. Se for verdadeira, executa o bloco indentado correspondente.
- **`elif`:** Abreviação de *else if* ("senão se"). Só é testado caso as condições anteriores tenham sido falsas.
- **`else`:** Caminho de escape ("senão"). É executado se nenhuma das condições anteriores tiver sido atendida.

---

### 3. Prevenção de Erro de Divisão por Zero (`if num2 != 0`)
Na matemática clássica, não existe divisão de um número por zero. No Python, tentar fazer `10 / 0` gera uma exceção fatal chamada `ZeroDivisionError` que interrompe o programa. O código verifica se `num2 != 0` antes de calcular, garantindo estabilidade.

---

### 4. Formatação de Texto com *F-Strings*
```python
print(f"Resultado: {num1} + {num2} = {resultado}")
```
Ao colocar a letra `f` antes das aspas, podemos colocar nomes de variáveis dentro de chaves `{}`. O Python substitui o nome da variável pelo seu valor em tempo de execução de forma muito limpa e legível.

---

### 5. Funções Reutilizáveis (`def` e `return`)
```python
def somar(a, b):
    return a + b
```
- **`def`:** Define uma nova função chamada `somar` que recebe dois parâmetros (`a` e `b`).
- **`return`:** Devolve o valor calculado para a parte do programa que chamou a função, permitindo reutilizar o cálculo em qualquer lugar do sistema.

---

## ⌨️ Atalhos de Teclado (Aplicação Web)

A calculadora web aceita comandos diretamente do seu teclado físico:

| Tecla | Ação |
|---|---|
| `0` a `9` | Digita o número correspondente no visor |
| `+` | Operação de Adição |
| `-` | Operação de Subtração |
| `*` ou `x` | Operação de Multiplicação |
| `/` | Operação de Divisão |
| `Enter` ou `=` | Calcula o resultado da expressão |
| `Backspace` (⌫) | Apaga o último dígito inserido |
| `Escape` (Esc) | Limpa todo o visor (`AC` - All Clear) |
| `.` ou `,` | Insere o ponto decimal |
| `%` | Calcula porcentagem |

---

## ❓ Perguntas Frequentes & Erros Comuns

### 1. `IndentationError: unexpected indent`
- **Causa:** O Python usa recuos de espaço (indentação) no início da linha para determinar o que pertence a cada bloco (`if`, `def`, `while`).
- **Solução:** Mantenha sempre 4 espaços (ou uma tecla <kbd>Tab</kbd>) alinhados uniformemente em todo o código.

### 2. `ValueError: could not convert string to float`
- **Causa:** O usuário digitou letras (ex: `"dez"`) em um campo onde o programa esperava dígitos numéricos (`"10"`).
- **Solução:** Na versão modular (`calculadora_funcoes.py`), usamos o bloco `try/except ValueError` para capturar a digitação incorreta e orientar o usuário sem travar o aplicativo.

### 3. Digitar vírgula em vez de ponto (`3,5` vs `3.5`)
- O Python utiliza o padrão americano de notação numérica com ponto (`.`). No entanto, a aplicação web e as dicas avançadas do projeto ensinam a usar `.replace(",", ".")` para aceitar ambos os formatos com total flexibilidade.

---

## 📄 Licença

Este projeto é de código aberto e livre para estudos, modificações e uso pessoal.
Bons estudos e boa prática na sua jornada de programação! 🚀
