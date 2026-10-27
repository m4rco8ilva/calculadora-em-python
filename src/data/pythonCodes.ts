import { CodeVersion } from '../types';

export const PYTHON_VERSIONS: Record<string, CodeVersion> = {
  simples: {
    id: 'simples',
    title: '1. Direto ao Ponto (Mais Simples)',
    subtitle: 'Estrutura linear com if/elif/else e conversão de dados',
    badge: 'Recomendado para o 1º dia',
    description: 'Versão ideal para quem nunca programou. Não usa funções complexas, executando de cima para baixo de forma muito intuitiva.',
    filename: 'calculadora_simples.py',
    code: `# ==========================================
# CALCULADORA SIMPLES EM PYTHON
# Operações: +, -, * e /
# ==========================================

print("=== CALCULADORA BÁSICA ===")
print("1 - Adição (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")

# 1. Escolha da operação
opcao = input("Escolha uma operação (1, 2, 3 ou 4): ")

# 2. Entrada dos dois números (convertidos para float)
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

# 3. Processamento e cálculo conforme a opção escolhida
if opcao == "1":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif opcao == "2":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif opcao == "3":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif opcao == "4":
    # Verificação para evitar erro de divisão por zero!
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro: Não é possível dividir nenhum número por zero!")

else:
    print("Opção inválida! Escolha apenas entre 1, 2, 3 ou 4.")
`,
    annotations: {
      1: {
        line: 1,
        label: 'Comentários (#)',
        concept: 'Comentários no Python',
        explanation: 'Qualquer texto que comece com o símbolo "#" é ignorado pelo Python. Serve exclusivamente para nós, humanos, documentarmos o que o código faz.',
        beginnerTip: 'Use comentários para explicar o "porquê" de algo no seu código, não apenas o "o quê".'
      },
      6: {
        line: 6,
        label: 'print(...)',
        concept: 'Saída de Dados na Tela',
        explanation: 'A função print() escreve mensagens no terminal ou tela do usuário. O texto deve ficar entre aspas duplas ("...") ou simples (\'...\').',
        beginnerTip: 'Sem o print, o computador pode fazer o cálculo na memória, mas você nunca verá o resultado!'
      },
      12: {
        line: 12,
        label: 'opcao = input(...)',
        concept: 'Entrada do Usuário e Variáveis',
        explanation: 'input() pausa a execução e aguarda o usuário digitar algo e apertar ENTER. O valor digitado é guardado na variável "opcao" como texto (string).',
        beginnerTip: 'O que o usuário digita no input() SEMPRE chega como texto (str), mesmo se ele digitar um número como 1.'
      },
      15: {
        line: 15,
        label: 'float(input(...))',
        concept: 'Conversão de Tipo (Type Casting)',
        explanation: 'Como input() devolve texto, se somarmos "5" + "5" o Python resultaria em "55" (concatenação)! float() converte esse texto em número decimal com ponto flutuante.',
        beginnerTip: 'Usamos float em vez de int porque uma calculadora deve aceitar números decimais como 2.5 ou 10.75.'
      },
      19: {
        line: 19,
        label: 'if opcao == "1":',
        concept: 'Condicional (Se...)',
        explanation: 'O comando "if" testa uma condição lógica. Usamos "==" (dois iguais) para comparar igualdade. Se opcao for "1", o bloco indentado abaixo será executado.',
        beginnerTip: 'Cuidado: um igual só (=) atribui valor; dois iguais (==) compara se dois valores são iguais!'
      },
      20: {
        line: 20,
        label: 'resultado = num1 + num2',
        concept: 'Operador de Adição (+)',
        explanation: 'Realiza a soma matemática entre as duas variáveis numéricas num1 e num2 e armazena o valor calculado na variável "resultado".'
      },
      21: {
        line: 21,
        label: 'print(f"Resultado: ...")',
        concept: 'F-Strings (Interpolação de Texto)',
        explanation: 'A letra "f" antes das aspas permite colocar variáveis dentro de chaves {num1}, {num2} e {resultado}. O Python substitui automaticamente pelos valores!',
        beginnerTip: 'F-strings foram introduzidas no Python 3.6 e são a forma mais limpa e moderna de formatar texto.'
      },
      23: {
        line: 23,
        label: 'elif opcao == "2":',
        concept: 'Elif (Senão Se...)',
        explanation: 'Abreviação de "else if". Só é verificado se a condição anterior (o if) tiver sido FALSA. Permite encadear várias opções mutuamente exclusivas.',
        beginnerTip: 'Se a opção 1 já foi verdadeira, o Python nem perde tempo testando os elifs abaixo.'
      },
      31: {
        line: 31,
        label: 'if num2 != 0:',
        concept: 'Tratamento de Divisão por Zero',
        explanation: 'Na matemática e na computação, dividir por zero é indefinido e gera um erro fatal (ZeroDivisionError). O operador "!=" significa "diferente de".',
        beginnerTip: 'Sempre proteja divisões verificando se o divisor é diferente de zero antes de dividir!'
      },
      38: {
        line: 38,
        label: 'else:',
        concept: 'Else (Senão)',
        explanation: 'É o caminho de segurança final. Se nenhuma das opções anteriores (1, 2, 3 ou 4) for verdadeira, o bloco do "else" é acionado avisando que a opção é inválida.'
      }
    }
  },

  funcoes: {
    id: 'funcoes',
    title: '2. Modular com Funções (def)',
    subtitle: 'Código organizado em funções reutilizáveis e limpas',
    badge: 'Boas Práticas',
    description: 'Organiza cada operação matemática em sua própria função com a palavra-chave "def". Facilita a manutenção, testes e reaproveitamento.',
    filename: 'calculadora_funcoes.py',
    code: `# ==========================================
# CALCULADORA MODULAR COM FUNÇÕES EM PYTHON
# ==========================================

# 1. Definindo as funções matemáticas básicas
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração de b em relação a a."""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão de a por b com validação."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. Função principal que gerencia o fluxo
def calculadora():
    print("=" * 32)
    print("    CALCULADORA COM FUNÇÕES")
    print("=" * 32)
    print("1 - Somar (+)")
    print("2 - Subtrair (-)")
    print("3 - Multiplicar (*)")
    print("4 - Dividir (/)")
    print("=" * 32)

    opcao = input("Escolha a operação (1-4): ")

    # Validação simples da opção
    if opcao not in ["1", "2", "3", "4"]:
        print("Opção inválida! Escolha entre 1 e 4.")
        return

    # Entrada de dados segura com try/except
    try:
        n1 = float(input("Digite o 1º número: "))
        n2 = float(input("Digite o 2º número: "))
    except ValueError:
        print("Erro: Entrada inválida! Digite apenas números.")
        return

    # Executa a função correspondente
    if opcao == "1":
        print(f"Resultado: {n1} + {n2} = {somar(n1, n2)}")
    elif opcao == "2":
        print(f"Resultado: {n1} - {n2} = {subtrair(n1, n2)}")
    elif opcao == "3":
        print(f"Resultado: {n1} * {n2} = {multiplicar(n1, n2)}")
    elif opcao == "4":
        resultado = dividir(n1, n2)
        print(f"Resultado: {resultado}")

# 3. Ponto de entrada do programa
if __name__ == "__main__":
    calculadora()
`,
    annotations: {
      6: {
        line: 6,
        label: 'def somar(a, b):',
        concept: 'Declaração de Funções (def)',
        explanation: '"def" vem de "define". Cria uma função com nome e parâmetros "a" e "b". Uma função é como uma pequena fábrica: recebe matérias-primas e entrega um produto.',
        beginnerTip: 'O código dentro da função só roda quando você "chama" a função pelo nome em outro lugar.'
      },
      8: {
        line: 8,
        label: 'return a + b',
        concept: 'Comando return',
        explanation: 'Envia o resultado do cálculo de volta para quem chamou a função. Ao encontrar "return", a função encerra imediatamente a sua execução.',
        beginnerTip: 'Diferença crucial: print() apenas joga o texto na tela; return entrega o valor para que outra parte do programa possa usá-lo em cálculos.'
      },
      18: {
        line: 18,
        label: 'def dividir(a, b):',
        concept: 'Função com Validação Interna',
        explanation: 'A própria função assume a responsabilidade de verificar se b == 0. Se for zero, devolve uma mensagem de erro em vez de quebrar o programa.'
      },
      38: {
        line: 38,
        label: 'try ... except ValueError:',
        concept: 'Tratamento de Exceções (Try/Except)',
        explanation: 'Se o usuário digitar letras como "abc" onde o Python espera números no float(), normalmente geraria um erro vermelho e travaria. O try/except captura esse erro gentilmente!',
        beginnerTip: 'Pense no "try" como "tente fazer isso" e no "except" como "se der esse erro específico, faça isso em vez de travar".'
      },
      60: {
        line: 60,
        label: 'if __name__ == "__main__":',
        concept: 'Boas Práticas de Módulos Python',
        explanation: 'Garante que a calculadora só execute automaticamente se o arquivo for rodado diretamente, e não se for importado como biblioteca por outro arquivo Python.',
        beginnerTip: 'É uma convenção padrão da comunidade Python profissional!'
      }
    }
  },

  loop: {
    id: 'loop',
    title: '3. Contínua com Menu e Repetição (while True)',
    subtitle: 'Não fecha após uma conta: continue calculando até desejar sair',
    badge: 'Mais Completa',
    description: 'Usa a estrutura de repetição "while True" para manter o programa aberto após cada cálculo, permitindo realizar várias contas seguidas.',
    filename: 'calculadora_continua.py',
    code: `# ==========================================
# CALCULADORA CONTÍNUA EM PYTHON (WHILE LOOP)
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return None  # Indica impossibilidade
    return a / b

# Loop infinito que só para quando o usuário escolher sair
while True:
    print("\n" + "=" * 32)
    print("      CALCULADORA CONTÍNUA")
    print("=" * 32)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("0 - Sair do programa")
    print("=" * 32)

    opcao = input("Escolha uma opção (0 a 4): ")

    # Condição de saída do loop
    if opcao == "0":
        print("\nObrigado por usar a calculadora! Até logo.")
        break  # Interrompe o loop 'while'

    if opcao not in ["1", "2", "3", "4"]:
        print("\n[!] Opção inválida. Tente novamente.")
        continue  # Volta imediatamente para o início do loop

    try:
        num1 = float(input("Digite o 1º número: "))
        num2 = float(input("Digite o 2º número: "))
    except ValueError:
        print("\n[!] Erro: Você deve digitar números válidos!")
        continue

    print("-" * 32)
    if opcao == "1":
        print(f"Resultado: {num1} + {num2} = {somar(num1, num2)}")
    elif opcao == "2":
        print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
    elif opcao == "3":
        print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
    elif opcao == "4":
        resp = dividir(num1, num2)
        if resp is None:
            print("Resultado: [Erro] Divisão por zero não é permitida.")
        else:
            print(f"Resultado: {num1} / {num2} = {resp}")
    print("-" * 32)
`,
    annotations: {
      18: {
        line: 18,
        label: 'while True:',
        concept: 'Loop Infinito Controlado',
        explanation: '"while True" cria uma repetição contínua. O código dentro dele fica rodando repetidamente até encontrar um comando "break".',
        beginnerTip: 'É excelente para menus interativos, evitando que a pessoa tenha que reabrir o terminal para cada continha.'
      },
      32: {
        line: 32,
        label: 'break',
        concept: 'Comando break',
        explanation: 'O comando "break" quebra a repetição do loop imediatamente e salta para a linha seguinte fora do while. É a chave para sair do programa de forma limpa.'
      },
      36: {
        line: 36,
        label: 'continue',
        concept: 'Comando continue',
        explanation: 'Pula o restante do bloco atual e volta direto para o topo do while, exibindo o menu novamente sem executar cálculos inválidos.'
      }
    }
  }
};
