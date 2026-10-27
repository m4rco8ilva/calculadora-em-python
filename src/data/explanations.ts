import { PythonConcept, BeginnerChallenge } from '../types';

export const PYTHON_CONCEPTS: PythonConcept[] = [
  {
    id: 'input-casting',
    title: 'input() e Conversão (Casting)',
    badge: 'Fundamental',
    iconName: 'Terminal',
    shortSummary: 'O input() sempre lê dados como texto (string). Para fazer contas matemáticas, precisamos converter para float().',
    codeSnippet: `# Sem converter (comportamento de texto):
a = input("Digite 5: ")  # a recebe "5" (string)
b = input("Digite 5: ")  # b recebe "5" (string)
print(a + b)             # Imprime "55", NÃO 10!

# Convertendo corretamente com float():
x = float(input("Digite 5: "))  # x recebe 5.0
y = float(input("Digite 5: "))  # y recebe 5.0
print(x + y)                    # Imprime 10.0!`,
    whyItMatters: 'Sem a conversão, o operador "+" faz concatenação (junta os textos lado a lado) em vez de somar valores numéricos.',
    commonMistake: 'Esquecer de envolver o input() com float() ou int(), gerando resultados inesperados como "10" + "20" = "1020".',
    bestPractice: 'Para calculadoras, prefira float() em vez de int(), pois float permite números com casas decimais (ex: 7.5, 3.14).'
  },
  {
    id: 'operators',
    title: 'Operadores Matemáticos no Python',
    badge: 'Aritmética',
    iconName: 'Calculator',
    shortSummary: 'Python possui operadores específicos para as 4 operações básicas e também para potência, resto e divisão inteira.',
    codeSnippet: `adicao = 10 + 3       # 13
subtracao = 10 - 3    # 7
multiplicacao = 10 * 3# 30
divisao = 10 / 3      # 3.3333333333333335 (sempre float)

# Bônus úteis em Python:
divisao_inteira = 10 // 3 # 3 (descarta os decimais)
resto_modulo = 10 % 3     # 1 (o resto da divisão)
potencia = 2 ** 3         # 8 (2 elevado ao cubo)`,
    whyItMatters: 'Diferente de outras linguagens onde a divisão de inteiros pode truncar casas decimais, em Python o operador "/" sempre retorna um float exato.',
    commonMistake: 'Usar o acento circunflexo "^" achando que é potência. Em Python, "^" é uma operação bitwise (XOR). Para potência use "**"!',
    bestPractice: 'Lembre-se da ordem de precedência da matemática: parênteses têm prioridade, depois multiplicação e divisão, e por fim adição e subtração.'
  },
  {
    id: 'conditionals',
    title: 'Condicionais (if, elif, else)',
    badge: 'Fluxo de Controle',
    iconName: 'GitFork',
    shortSummary: 'Permite que seu programa tome decisões e execute caminhos diferentes dependendo da opção que o usuário escolheu.',
    codeSnippet: `opcao = input("Escolha (1-soma, 2-sub): ")

if opcao == "1":
    print("Você escolheu soma")
elif opcao == "2":
    print("Você escolheu subtração")
else:
    print("Opção desconhecida!")`,
    whyItMatters: 'É a base do raciocínio lógico na programação: se algo for verdade, faça X; se outra coisa for verdade, faça Y; caso contrário, faça Z.',
    commonMistake: 'Usar "=" (atribuição) em vez de "==" (comparação de igualdade), ou esquecer os dois pontos ":" no final da linha do if.',
    bestPractice: 'Mantenha as condições simples e lembre-se que a indentação (4 espaços) define o que pertence a cada bloco condicional.'
  },
  {
    id: 'functions',
    title: 'Funções (def e return)',
    badge: 'Modularização',
    iconName: 'Boxes',
    shortSummary: 'Funções agrupam linhas de código sob um nome. Você pode reaproveitá-las várias vezes sem repetir código (DRY: Don\'t Repeat Yourself).',
    codeSnippet: `# Declaração da função
def somar(a, b):
    resultado = a + b
    return resultado  # Entrega o valor calculado

# Uso da função (chamada)
total = somar(15, 25)
print(f"O total é {total}")  # Imprime: O total é 40`,
    whyItMatters: 'Dividir seu programa em pequenas funções testáveis torna o código legível, fácil de consertar e profissional.',
    commonMistake: 'Confundir print() com return. Se você colocar apenas print() dentro da função sem return, a função devolverá o valor "None" para quem a chamou.',
    bestPractice: 'Dê nomes descritivos com verbos às suas funções: "somar", "calcular_media", "obter_numero_valido".'
  },
  {
    id: 'error-handling',
    title: 'Tratamento de Erros (Zero & Letras)',
    badge: 'Segurança',
    iconName: 'ShieldAlert',
    shortSummary: 'Prevenir que o programa "quebre" feio com mensagens de erro vermelhas caso o usuário faça algo imprevisto.',
    codeSnippet: `# 1. Protegendo contra divisão por zero:
if divisor == 0:
    print("Erro: Impossível dividir por zero!")
else:
    print(dividendo / divisor)

# 2. Protegendo contra digitação de letras com try/except:
try:
    numero = float(input("Digite um número: "))
except ValueError:
    print("Aviso: Você digitou um texto em vez de um número!")`,
    whyItMatters: 'Usuários reais digitam coisas erradas o tempo todo! Programas de qualidade preveem esses deslizes e guiam o usuário.',
    commonMistake: 'Deixar uma divisão acontecer sem antes checar se o denominador é 0, causando um "ZeroDivisionError" que fecha o aplicativo abruptamente.',
    bestPractice: 'Sempre capture exceções específicas (ex: "except ValueError") em vez de um "except" genérico vazio.'
  },
  {
    id: 'f-strings',
    title: 'F-Strings (Formatação de Texto)',
    badge: 'Produtividade',
    iconName: 'FileCode2',
    shortSummary: 'A forma mais rápida, limpa e legível de misturar texto com o valor de variáveis no Python.',
    codeSnippet: `nome = "Maria"
valor1 = 12.5
valor2 = 3.5
resultado = valor1 + valor2

# Modo Moderno com F-String (basta colocar 'f' antes das aspas):
print(f"Olá {nome}, a soma de {valor1} + {valor2} é igual a {resultado:.2f}")
# Saída: Olá Maria, a soma de 12.5 + 3.5 é igual a 16.00

# O ":.2f" formata para exatamente 2 casas decimais!`,
    whyItMatters: 'Evita concatenações cheias de "+" e conversores manuais como "Olá " + nome + ", soma = " + str(resultado).',
    commonMistake: 'Esquecer de colocar a letra minúscula "f" antes da abertura das aspas.',
    bestPractice: 'Use formatação numérica dentro das f-strings quando trabalhar com moeda ou divisões: "{preco:.2f}".'
  }
];

export const BEGINNER_CHALLENGES: BeginnerChallenge[] = [
  {
    id: 'desafio-potencia',
    title: 'Desafio 1: Adicionar Exponenciação (Potência)',
    difficulty: 'Fácil',
    description: 'Modifique a calculadora para incluir a opção "5 - Potência (base elevado ao expoente)", usando o operador de potência do Python.',
    hint: 'Em Python, o operador de exponenciação é o duplo asterisco "**". Exemplo: 2 ** 3 resulta em 8.',
    solutionCode: `# Adicione a opção no menu:
print("5 - Potência (^)")

# No bloco de if/elif:
elif opcao == "5":
    resultado = num1 ** num2
    print(f"Resultado: {num1} elevado a {num2} = {resultado}")`,
    solutionExplanation: 'O operador "**" calcula a base elevada ao expoente. Se num1 for 2 e num2 for 3, 2 ** 3 = 8.0.'
  },
  {
    id: 'desafio-resto',
    title: 'Desafio 2: Adicionar Resto da Divisão (Módulo)',
    difficulty: 'Fácil',
    description: 'Adicione uma operação que calcula o resto da divisão entre dois números inteiros usando o operador "%". Muito útil para saber se um número é par ou ímpar!',
    hint: 'O operador "%" (módulo) retorna a sobra de uma divisão. Exemplo: 7 % 3 é 1 (porque 3 cabe duas vezes em 7, sobrando 1).',
    solutionCode: `print("6 - Resto da Divisão (%)")

elif opcao == "6":
    if num2 != 0:
        resultado = num1 % num2
        print(f"Resto da divisão de {num1} por {num2} é: {resultado}")
    else:
        print("Erro: Não existe divisão por zero!")`,
    solutionExplanation: 'O resto da divisão é crucial para verificar números pares (n % 2 == 0) e em ciclos de repetição.'
  },
  {
    id: 'desafio-virgula',
    title: 'Desafio 3: Aceitar vírgula em vez de ponto',
    difficulty: 'Médio',
    description: 'No Brasil usamos vírgula para números decimais (ex: 3,5), mas o Python espera ponto (3.5). Faça o programa aceitar números digitados com vírgula!',
    hint: 'Você pode usar o método de strings .replace(",", ".") antes de passar o valor para float().',
    solutionCode: `# Entrada como texto primeiro
entrada1 = input("Digite o 1º número: ").replace(",", ".")
entrada2 = input("Digite o 2º número: ").replace(",", ".")

# Agora a conversão funciona tanto para "3.5" quanto para "3,5"!
num1 = float(entrada1)
num2 = float(entrada2)`,
    solutionExplanation: 'O método .replace(",", ".") substitui qualquer vírgula por ponto, tornando a experiência do usuário em português muito mais natural!'
  },
  {
    id: 'desafio-historico',
    title: 'Desafio 4: Guardar Histórico das Contas',
    difficulty: 'Desafio',
    description: 'Na versão contínua com loop, crie uma lista para armazenar cada cálculo realizado e imprima o histórico completo ao sair do programa.',
    hint: 'Crie uma lista vazia "historico = []" antes do while e use "historico.append(...)" após cada cálculo com sucesso.',
    solutionCode: `historico = []

while True:
    # ... escolhe opcao e numeros ...
    # Ao calcular com sucesso:
    registro = f"{num1} + {num2} = {resultado}"
    historico.append(registro)

    # Ao sair do loop (opcao == "0"):
    print("\n--- HISTÓRICO DE CÁLCULOS ---")
    for item in historico:
        print(f"-> {item}")
    break`,
    solutionExplanation: 'Listas e o método .append() são essenciais para acumular dados dinamicamente durante a execução de um programa Python.'
  }
];
