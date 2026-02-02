// Conteudo dos modulos do curso Claude Code
// INTEIA Academy - Prof. Igor Morais Vasconcelos - INTEIA

import { Step, Lesson, Module } from './modules'

export const claudeCodeModules: Module[] = [
  // ========================================
  // MODULO 0: O SUPERPODER DO CLAUDE CODE
  // ========================================
  {
    id: 0,
    title: "O Superpoder do Claude Code",
    description: "Descubra por que o Claude Code vai transformar sua forma de programar",
    duration: "5-7 min",
    badge: "Visionario",
    badgeIcon: "✨",
    lessons: [
      {
        id: "0.1",
        title: "O Que E o Claude Code?",
        steps: [
          {
            id: "0.1.1",
            type: "text",
            content: "Imagine ter um programador experiente sentado ao seu lado, 24 horas por dia.\n\nEle le seus arquivos, entende seu projeto, escreve codigo, corrige bugs e ate cria projetos inteiros do zero.\n\nIsso e o Claude Code."
          },
          {
            id: "0.1.2",
            type: "tip",
            content: "DEFINICAO SIMPLES:\n\nClaude Code e uma ferramenta da Anthropic que coloca a IA Claude diretamente no seu terminal.\nEla le, edita e cria arquivos no seu computador, conversando com voce em portugues."
          },
          {
            id: "0.1.3",
            type: "checker",
            content: "Entendeu o que e o Claude Code?"
          }
        ]
      },
      {
        id: "0.2",
        title: "Claude Code vs ChatGPT",
        steps: [
          {
            id: "0.2.1",
            type: "text",
            content: "Voce provavelmente ja conhece o ChatGPT.\nEle e otimo para conversas e tirar duvidas.\n\nMas tem limitacoes importantes:"
          },
          {
            id: "0.2.2",
            type: "text",
            content: "CHATGPT (no navegador):\n❌ Nao ve seus arquivos\n❌ Nao edita seu codigo\n❌ Voce copia e cola manualmente\n❌ Perde contexto entre conversas\n❌ Nao executa comandos\n\nCLAUDE CODE (no terminal):\n✓ Le todos seus arquivos\n✓ Edita codigo diretamente\n✓ Executa comandos por voce\n✓ Entende todo o projeto\n✓ Cria commits no Git"
          },
          {
            id: "0.2.3",
            type: "tip",
            content: "EM RESUMO:\n\nChatGPT = Conversa SOBRE codigo\nClaude Code = Trabalha COM seu codigo"
          }
        ]
      },
      {
        id: "0.3",
        title: "O Que Voce Vai Conseguir Fazer",
        steps: [
          {
            id: "0.3.1",
            type: "text",
            content: "Ao final deste curso, voce vai poder:\n\n🚀 CRIAR PROJETOS\n\"Crie um site com pagina de login e dashboard\"\n\n🐛 CORRIGIR BUGS\n\"Encontre e corrija o erro neste arquivo\"\n\n📝 EDITAR CODIGO\n\"Adicione validacao de email neste formulario\"\n\n🔍 ENTENDER CODIGO\n\"Explique o que esta funcao faz\"\n\n⚡ AUTOMATIZAR\n\"Crie um script que organize essas fotos por data\""
          },
          {
            id: "0.3.2",
            type: "text",
            content: "E o melhor: voce faz tudo isso conversando em portugues.\nO Claude Code entende o que voce quer e executa."
          }
        ]
      },
      {
        id: "0.4",
        title: "Como Este Curso Funciona",
        steps: [
          {
            id: "0.4.1",
            type: "text",
            content: "Este curso tem 8 modulos:\n\n0. O Superpoder (voce esta aqui!)\n1. Terminal sem medo\n2. Instalando o VS Code\n3. Instalando o Claude Code\n4. Primeira sessao\n5. Custos e modelos\n6. Usando no dia a dia\n7. Alem do basico\n\nCada modulo tem licoes curtas com passos que voce confirma."
          },
          {
            id: "0.4.2",
            type: "tip",
            content: "DICA:\n\nVa no seu ritmo. Nao tem pressa.\nSe travar em algum passo, use o Coach IA (botao no canto inferior)."
          },
          {
            id: "0.4.3",
            type: "checker",
            content: "Pronto para comecar?"
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 1: TERMINAL SEM MEDO
  // ========================================
  {
    id: 1,
    title: "Terminal Sem Medo",
    description: "Entenda o que e um terminal de forma simples",
    duration: "8-10 min",
    badge: "Desmistificador",
    badgeIcon: "🎯",
    lessons: [
      {
        id: "1.1",
        title: "O Que E Um Terminal?",
        steps: [
          {
            id: "1.1.1",
            type: "text",
            content: "Voce ja viu em filmes: uma tela preta com letras verdes, alguem digitando muito rapido.\n\nParece coisa de hacker, ne?"
          },
          {
            id: "1.1.2",
            type: "tip",
            content: "DEFINICAO SIMPLES:\n\nTerminal e so uma forma de CONVERSAR com o computador usando TEXTO em vez de cliques.\n\nEm vez de clicar em icones, voce escreve o que quer."
          },
          {
            id: "1.1.3",
            type: "text",
            content: "Pense assim:\n\nINTERFACE GRAFICA (o que voce conhece)\n= Conversa por GESTOS\n= Apontar, clicar, arrastar\n\nTERMINAL\n= Conversa por TEXTO\n= Escrever o que voce quer"
          },
          {
            id: "1.1.4",
            type: "text",
            content: "E como a diferenca entre:\n\n• Apontar para o cardapio e fazer gesto de \"quero isso\"\n• Ou simplesmente dizer \"quero um cafe, por favor\"\n\nAs duas formas funcionam. Sao apenas jeitos diferentes de pedir."
          }
        ]
      },
      {
        id: "1.2",
        title: "Por Que o Terminal?",
        steps: [
          {
            id: "1.2.1",
            type: "text",
            content: "\"Se cliques funcionam, por que aprender isso?\"\n\nBoa pergunta! Aqui estao os motivos:\n\n1️⃣ O Claude Code FUNCIONA no terminal\nE onde a magica acontece.\n\n2️⃣ E MAIS RAPIDO para certas tarefas\nDigitar um comando e mais rapido que 10 cliques.\n\n3️⃣ Voce pode AUTOMATIZAR\nComandos podem ser repetidos automaticamente.\n\n4️⃣ E uma HABILIDADE VALIOSA\nTodo desenvolvedor usa terminal."
          },
          {
            id: "1.2.2",
            type: "tip",
            content: "BOA NOTICIA:\n\nVoce vai usar o terminal DENTRO do VS Code.\nNao precisa decorar comandos complicados.\nO Claude Code faz o trabalho pesado."
          }
        ]
      },
      {
        id: "1.3",
        title: "Os Comandos Basicos",
        steps: [
          {
            id: "1.3.1",
            type: "text",
            osSpecific: "windows",
            content: "OS COMANDOS QUE VOCE PODE PRECISAR:\n\n🪟 PARA WINDOWS:\n\ncd pasta     → Entra numa pasta\ncd ..        → Volta uma pasta\ndir          → Lista arquivos\ncls          → Limpa a tela\nclaude       → Abre o Claude Code"
          },
          {
            id: "1.3.1",
            type: "text",
            osSpecific: "mac",
            content: "OS COMANDOS QUE VOCE PODE PRECISAR:\n\n🍎 PARA MAC:\n\ncd pasta     → Entra numa pasta\ncd ..        → Volta uma pasta\nls           → Lista arquivos\nclear        → Limpa a tela\nclaude       → Abre o Claude Code"
          },
          {
            id: "1.3.2",
            type: "theory",
            content: "O QUE SIGNIFICA \"cd\"?\n\n\"cd\" vem de \"change directory\" (mudar diretorio).\n\"Diretorio\" e so outro nome para \"pasta\".\n\nEntao \"cd Documents\" significa: \"va para a pasta Documents\""
          }
        ]
      },
      {
        id: "1.4",
        title: "O Truque do Copiar/Colar",
        steps: [
          {
            id: "1.4.1",
            type: "warning",
            content: "ATENCAO: ISTO E MUITO IMPORTANTE!\n\nNo terminal do Windows, CTRL+V as vezes nao funciona para colar!"
          },
          {
            id: "1.4.2",
            type: "text",
            osSpecific: "windows",
            content: "🪟 NO WINDOWS (terminal):\n\nPara COLAR:   CTRL + SHIFT + V\n(Segure CTRL e SHIFT, depois aperte V)\n\nPara COPIAR:  CTRL + SHIFT + C\n(Segure CTRL e SHIFT, depois aperte C)\n\nNo terminal do VS Code funciona CTRL+V normal!"
          },
          {
            id: "1.4.2",
            type: "text",
            osSpecific: "mac",
            content: "🍎 NO MAC:\n\nPara COLAR:   CMD + V\nPara COPIAR:  CMD + C\n\n(No Mac funciona igual ao normal!)"
          },
          {
            id: "1.4.3",
            type: "tip",
            content: "NAO SE PREOCUPE!\n\nVoce vai usar o terminal dentro do VS Code,\nonde copiar e colar funciona normalmente."
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 2: INSTALANDO O VS CODE
  // ========================================
  {
    id: 2,
    title: "Instalando o VS Code",
    description: "Instale o editor de codigo mais popular do mundo",
    duration: "10-12 min",
    badge: "Equipado",
    badgeIcon: "🛠️",
    lessons: [
      {
        id: "2.1",
        title: "O Que E o VS Code?",
        steps: [
          {
            id: "2.1.1",
            type: "text",
            content: "VS Code (Visual Studio Code) e um editor de codigo feito pela Microsoft.\n\nPense nele como o \"Word\" para programadores.\nMas muito mais poderoso."
          },
          {
            id: "2.1.2",
            type: "text",
            content: "Por que vamos usar o VS Code?\n\n✓ Gratuito\n✓ Tem terminal integrado (nao precisa abrir outro programa)\n✓ Mostra seus arquivos organizados\n✓ Funciona perfeitamente com o Claude Code\n✓ E o editor mais usado no mundo"
          },
          {
            id: "2.1.3",
            type: "theory",
            content: "ANALOGIA:\n\nSe o Claude Code e o motorista,\no VS Code e o carro.\n\nVoce precisa dos dois para a viagem funcionar."
          }
        ]
      },
      {
        id: "2.2",
        title: "Baixando e Instalando",
        steps: [
          {
            id: "2.2.1",
            type: "text",
            content: "PASSO 1: ABRIR O NAVEGADOR\n\nAbra seu navegador (Chrome, Edge, Firefox).\n\nDigite este endereco:"
          },
          {
            id: "2.2.2",
            type: "code",
            content: "Acesse este site:",
            codeContent: "code.visualstudio.com"
          },
          {
            id: "2.2.3",
            type: "text",
            osSpecific: "windows",
            content: "PASSO 2: BAIXAR\n\n1. No site, clique no botao grande azul \"Download for Windows\"\n2. Aguarde o download terminar"
          },
          {
            id: "2.2.3",
            type: "text",
            osSpecific: "mac",
            content: "PASSO 2: BAIXAR\n\n1. No site, clique no botao grande azul \"Download for Mac\"\n2. Escolha a versao correta:\n   - Apple Silicon (M1, M2, M3, M4) - Macs mais novos\n   - Intel - Macs mais antigos\n3. Aguarde o download terminar"
          },
          {
            id: "2.2.4",
            type: "checker",
            content: "O download comecou?"
          },
          {
            id: "2.2.5",
            type: "text",
            osSpecific: "windows",
            content: "PASSO 3: INSTALAR\n\n1. Abra a pasta Downloads\n2. De dois cliques no arquivo baixado\n3. Aceite os termos\n4. IMPORTANTE: Marque a opcao \"Add to PATH\"\n5. Clique Next ate terminar\n6. Clique Finish"
          },
          {
            id: "2.2.5",
            type: "text",
            osSpecific: "mac",
            content: "PASSO 3: INSTALAR\n\n1. Abra a pasta Downloads no Finder\n2. De dois cliques no arquivo .zip para descompactar\n3. Arraste o icone do VS Code para a pasta Aplicativos\n4. Abra o VS Code pela pasta Aplicativos"
          },
          {
            id: "2.2.6",
            type: "checker",
            content: "A instalacao terminou?"
          }
        ]
      },
      {
        id: "2.3",
        title: "Abrindo o VS Code",
        steps: [
          {
            id: "2.3.1",
            type: "text",
            osSpecific: "windows",
            content: "ABRINDO O VS CODE:\n\n1. Clique no botao Iniciar (icone do Windows)\n2. Digite: Visual Studio Code\n3. Clique no icone que aparecer\n\nUma janela vai abrir com a tela de boas-vindas."
          },
          {
            id: "2.3.1",
            type: "text",
            osSpecific: "mac",
            content: "ABRINDO O VS CODE:\n\n1. Abra a pasta Aplicativos\n2. De dois cliques em Visual Studio Code\n3. Se perguntar se confia, clique \"Abrir\"\n\nUma janela vai abrir com a tela de boas-vindas."
          },
          {
            id: "2.3.2",
            type: "tip",
            content: "FIXE O VS CODE!\n\nWindows: Clique com botao direito no icone na barra → Fixar\nMac: Clique com botao direito no Dock → Manter no Dock\n\nVoce vai usar muito!"
          },
          {
            id: "2.3.3",
            type: "checker",
            content: "O VS Code esta aberto?"
          }
        ]
      },
      {
        id: "2.4",
        title: "Conhecendo o Terminal Integrado",
        steps: [
          {
            id: "2.4.1",
            type: "text",
            content: "O VS Code tem um terminal DENTRO dele!\nIsso e muito pratico: voce ve o codigo e o terminal na mesma tela.\n\nPara abrir o terminal integrado:"
          },
          {
            id: "2.4.2",
            type: "code",
            content: "Pressione este atalho:",
            codeContent: "CTRL + ` (a crase, tecla abaixo do ESC)"
          },
          {
            id: "2.4.3",
            type: "text",
            content: "Um painel vai aparecer na parte de baixo da tela.\nIsso e o terminal! E aqui que vamos usar o Claude Code."
          },
          {
            id: "2.4.4",
            type: "tip",
            content: "DICA:\n\nVoce tambem pode abrir pelo menu:\nTerminal → New Terminal\n\nOu pelo atalho: CTRL + SHIFT + ' (aspas)"
          },
          {
            id: "2.4.5",
            type: "checker",
            content: "O terminal apareceu na parte de baixo?"
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 3: INSTALANDO O CLAUDE CODE
  // ========================================
  {
    id: 3,
    title: "Instalando o Claude Code",
    description: "Instale o Claude Code no seu computador",
    duration: "12-15 min",
    badge: "Instalador",
    badgeIcon: "⚡",
    lessons: [
      {
        id: "3.1",
        title: "O Que Precisamos Instalar?",
        steps: [
          {
            id: "3.1.1",
            type: "text",
            content: "Para o Claude Code funcionar, precisamos de duas coisas:\n\n1. Node.js → O \"motor\" que faz o Claude Code rodar\n2. Claude Code → A ferramenta em si\n\nVamos instalar os dois agora."
          },
          {
            id: "3.1.2",
            type: "theory",
            content: "ANALOGIA:\n\nNode.js e como a gasolina do carro.\nClaude Code e o carro.\n\nSem gasolina, o carro nao anda.\nSem Node.js, o Claude Code nao funciona."
          }
        ]
      },
      {
        id: "3.2",
        title: "Instalando o Node.js",
        steps: [
          {
            id: "3.2.1",
            type: "text",
            content: "1. Abra seu navegador\n2. Acesse este site:"
          },
          {
            id: "3.2.2",
            type: "code",
            content: "Digite este endereco:",
            codeContent: "nodejs.org"
          },
          {
            id: "3.2.3",
            type: "text",
            content: "3. Voce vai ver botoes de download\n4. Clique no botao que diz \"LTS\" (versao estavel)\n5. Baixe e instale"
          },
          {
            id: "3.2.4",
            type: "text",
            osSpecific: "windows",
            content: "INSTALANDO NO WINDOWS:\n\n1. Abra a pasta Downloads\n2. De dois cliques no arquivo .msi\n3. Clique Next varias vezes\n4. Clique Install\n5. Clique Finish"
          },
          {
            id: "3.2.4",
            type: "text",
            osSpecific: "mac",
            content: "INSTALANDO NO MAC:\n\n1. Abra a pasta Downloads\n2. De dois cliques no arquivo .pkg\n3. Clique Continuar varias vezes\n4. Digite sua senha se pedir\n5. Clique Fechar"
          },
          {
            id: "3.2.5",
            type: "warning",
            content: "IMPORTANTE!\n\nDepois de instalar o Node.js, feche e abra novamente o VS Code.\nIsso e necessario para ele reconhecer a instalacao."
          },
          {
            id: "3.2.6",
            type: "checker",
            content: "Instalou o Node.js e reabriu o VS Code?"
          }
        ]
      },
      {
        id: "3.3",
        title: "Verificando o Node.js",
        steps: [
          {
            id: "3.3.1",
            type: "text",
            content: "Vamos verificar se o Node.js foi instalado.\n\n1. No VS Code, abra o terminal (CTRL + `)\n2. Digite o comando abaixo e pressione ENTER:"
          },
          {
            id: "3.3.2",
            type: "code",
            content: "Digite este comando:",
            codeContent: "node --version"
          },
          {
            id: "3.3.3",
            type: "text",
            content: "Deve aparecer algo como:\nv22.13.0\n\n(O numero pode ser diferente, tudo bem)"
          },
          {
            id: "3.3.4",
            type: "checker",
            content: "Apareceu um numero de versao?"
          }
        ]
      },
      {
        id: "3.4",
        title: "Instalando o Claude Code",
        steps: [
          {
            id: "3.4.1",
            type: "text",
            content: "Agora vamos instalar o Claude Code!\n\nNo terminal do VS Code, digite:"
          },
          {
            id: "3.4.2",
            type: "code",
            content: "Digite este comando:",
            codeContent: "npm install -g @anthropic-ai/claude-code"
          },
          {
            id: "3.4.3",
            type: "text",
            content: "Pressione ENTER e aguarde.\nVai aparecer uma barra de progresso.\nPode levar 1-2 minutos."
          },
          {
            id: "3.4.4",
            type: "warning",
            osSpecific: "mac",
            content: "SE DER ERRO DE PERMISSAO NO MAC:\n\nUse este comando em vez do anterior:"
          },
          {
            id: "3.4.5",
            type: "code",
            osSpecific: "mac",
            content: "Comando alternativo para Mac:",
            codeContent: "sudo npm install -g @anthropic-ai/claude-code"
          },
          {
            id: "3.4.6",
            type: "text",
            osSpecific: "mac",
            content: "O Mac vai pedir sua senha.\nDigite (nao aparece enquanto digita, e normal).\nPressione ENTER."
          },
          {
            id: "3.4.7",
            type: "checker",
            content: "A instalacao terminou sem erros?"
          }
        ]
      },
      {
        id: "3.5",
        title: "Criando sua Conta Anthropic",
        steps: [
          {
            id: "3.5.1",
            type: "text",
            content: "O Claude Code precisa de uma conta na Anthropic (a empresa que criou o Claude).\n\nExistem duas formas de usar:\n\n1. PLANO MAX (assinatura mensal) - Uso ilimitado\n2. API (paga por uso) - Voce carrega creditos\n\nVamos configurar na proxima licao. Por enquanto, so saiba que precisa de uma conta."
          },
          {
            id: "3.5.2",
            type: "tip",
            content: "NAO SE PREOCUPE COM CUSTOS AGORA!\n\nNo modulo 5 vamos explicar tudo sobre precos e planos.\nPor enquanto, vamos so deixar tudo instalado."
          },
          {
            id: "3.5.3",
            type: "checker",
            content: "Entendeu que precisa de uma conta Anthropic?"
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 4: PRIMEIRA SESSAO
  // ========================================
  {
    id: 4,
    title: "Primeira Sessao",
    description: "Abra o Claude Code e faca seu primeiro pedido",
    duration: "10-12 min",
    badge: "Primeiro Contato",
    badgeIcon: "🚀",
    lessons: [
      {
        id: "4.1",
        title: "Abrindo o Claude Code",
        steps: [
          {
            id: "4.1.1",
            type: "text",
            content: "Vamos abrir o Claude Code!\n\n1. Abra o VS Code\n2. Abra o terminal (CTRL + `)\n3. Navegue ate uma pasta qualquer (ou crie uma)\n4. Digite:"
          },
          {
            id: "4.1.2",
            type: "code",
            content: "Digite no terminal:",
            codeContent: "claude"
          },
          {
            id: "4.1.3",
            type: "text",
            content: "Na primeira vez, o Claude Code vai pedir para voce fazer login.\n\nSiga as instrucoes na tela:\n1. Um link vai aparecer\n2. Clique nele (ou copie para o navegador)\n3. Faca login com sua conta Anthropic\n4. Autorize o acesso\n5. Volte para o terminal"
          },
          {
            id: "4.1.4",
            type: "checker",
            content: "Conseguiu fazer login?"
          }
        ]
      },
      {
        id: "4.2",
        title: "A Interface do Claude Code",
        steps: [
          {
            id: "4.2.1",
            type: "text",
            content: "Depois do login, voce vera algo assim:\n\n╭─────────────────────────────╮\n│  Claude Code                │\n│                             │\n│  > Escreva seu pedido aqui  │\n╰─────────────────────────────╯\n\nE simples: voce digita o que quer e o Claude faz."
          },
          {
            id: "4.2.2",
            type: "text",
            content: "ELEMENTOS IMPORTANTES:\n\n• Barra de entrada: onde voce digita seus pedidos\n• Respostas do Claude: aparecem acima\n• Permissoes: o Claude pede permissao antes de alterar arquivos\n• Custo: mostra quanto esta gastando na sessao"
          },
          {
            id: "4.2.3",
            type: "tip",
            content: "O Claude Code sempre pede PERMISSAO antes de fazer algo.\nSe ele quiser criar ou editar um arquivo, vai perguntar primeiro.\nVoce pode aceitar ou recusar."
          }
        ]
      },
      {
        id: "4.3",
        title: "Seu Primeiro Pedido",
        steps: [
          {
            id: "4.3.1",
            type: "text",
            content: "Vamos testar! Digite este pedido:"
          },
          {
            id: "4.3.2",
            type: "code",
            content: "Digite no Claude Code:",
            codeContent: "Crie um arquivo chamado ola.txt com uma mensagem de boas-vindas em portugues"
          },
          {
            id: "4.3.3",
            type: "text",
            content: "O Claude vai:\n1. Entender seu pedido\n2. Mostrar o que pretende fazer\n3. Pedir sua permissao\n4. Criar o arquivo\n\nQuando ele pedir permissao, digite Y (sim) e pressione ENTER."
          },
          {
            id: "4.3.4",
            type: "tip",
            content: "PARABENS!\n\nSe o arquivo foi criado, voce acabou de usar IA para programar!\nVoce pode ver o arquivo na barra lateral do VS Code."
          },
          {
            id: "4.3.5",
            type: "checker",
            content: "O Claude criou o arquivo?"
          }
        ]
      },
      {
        id: "4.4",
        title: "Entendendo as Permissoes",
        steps: [
          {
            id: "4.4.1",
            type: "text",
            content: "O Claude Code tem um sistema de seguranca:\n\nEle SEMPRE pede permissao antes de:\n• Criar arquivos\n• Editar arquivos\n• Executar comandos no terminal\n• Acessar a internet\n\nVoce controla tudo."
          },
          {
            id: "4.4.2",
            type: "text",
            content: "OPCOES DE RESPOSTA:\n\nY (Yes) → Aceita esta acao\nN (No) → Recusa esta acao\nA (Always) → Aceita este tipo de acao sempre\n\nPara iniciantes, recomendo usar Y para cada acao.\nAssim voce ve tudo que o Claude faz."
          },
          {
            id: "4.4.3",
            type: "warning",
            content: "REGRA DE OURO:\n\nSempre LEIA o que o Claude quer fazer antes de aceitar.\nSe nao entender, pergunte: \"Explique o que voce vai fazer\""
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 5: CUSTOS E MODELOS
  // ========================================
  {
    id: 5,
    title: "Custos e Modelos",
    description: "Entenda os planos e quanto custa usar",
    duration: "8-10 min",
    badge: "Estrategista",
    badgeIcon: "💰",
    lessons: [
      {
        id: "5.1",
        title: "Como Funciona o Pagamento",
        steps: [
          {
            id: "5.1.1",
            type: "text",
            content: "O Claude Code tem duas formas de pagamento:\n\n1. PLANO MAX (Claude Pro/Max)\n   • Assinatura mensal ($20-100/mes)\n   • Uso com limites generosos\n   • Mais simples de usar\n\n2. API (Pague por uso)\n   • Carrega creditos ($5 minimo)\n   • Paga por quantidade de texto processado\n   • Mais barato para uso leve"
          },
          {
            id: "5.1.2",
            type: "tip",
            content: "PARA COMECAR:\n\nA API com $5 de credito e suficiente para aprender.\nVoce consegue fazer MUITA coisa com isso.\n\nSe gostar, pode assinar o plano Max depois."
          }
        ]
      },
      {
        id: "5.2",
        title: "Os Modelos Claude",
        steps: [
          {
            id: "5.2.1",
            type: "text",
            content: "O Claude tem diferentes \"cerebros\" (modelos):\n\nCLAUDE HAIKU (rapido e barato)\n• Tarefas simples e rapidas\n• Perguntas diretas\n• Custo baixo\n\nCLAUDE SONNET (equilibrado)\n• Bom para a maioria das tarefas\n• Programacao geral\n• Melhor custo-beneficio\n\nCLAUDE OPUS (poderoso)\n• Tarefas complexas\n• Problemas dificeis\n• Mais caro"
          },
          {
            id: "5.2.2",
            type: "theory",
            content: "ANALOGIA:\n\nHaiku = Carro popular (economico)\nSonnet = Carro executivo (bom para tudo)\nOpus = Carro de luxo (maximo desempenho)\n\nPara aprender, o Sonnet e perfeito."
          },
          {
            id: "5.2.3",
            type: "text",
            content: "Para trocar de modelo no Claude Code, digite:"
          },
          {
            id: "5.2.4",
            type: "code",
            content: "Comando para trocar modelo:",
            codeContent: "/model sonnet"
          }
        ]
      },
      {
        id: "5.3",
        title: "Configurando a API Key",
        steps: [
          {
            id: "5.3.1",
            type: "text",
            content: "Se voce escolheu usar a API, precisa de uma chave.\n\n1. Acesse:"
          },
          {
            id: "5.3.2",
            type: "code",
            content: "Acesse este site:",
            codeContent: "console.anthropic.com"
          },
          {
            id: "5.3.3",
            type: "text",
            content: "2. Crie uma conta ou faca login\n3. Va em \"API Keys\"\n4. Clique em \"Create Key\"\n5. De um nome (ex: \"meu-claude-code\")\n6. Copie a chave gerada"
          },
          {
            id: "5.3.4",
            type: "warning",
            content: "GUARDE SUA CHAVE!\n\nA chave so aparece UMA VEZ.\nCopie e guarde em lugar seguro.\nNunca compartilhe com ninguem."
          },
          {
            id: "5.3.5",
            type: "text",
            content: "Agora configure no terminal:"
          },
          {
            id: "5.3.6",
            type: "code",
            osSpecific: "windows",
            content: "Configure a chave (substitua pela sua):",
            codeContent: "set ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui"
          },
          {
            id: "5.3.6",
            type: "code",
            osSpecific: "mac",
            content: "Configure a chave (substitua pela sua):",
            codeContent: "export ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui"
          },
          {
            id: "5.3.7",
            type: "checker",
            content: "Configurou sua forma de pagamento?"
          }
        ]
      },
      {
        id: "5.4",
        title: "Dicas para Economizar",
        steps: [
          {
            id: "5.4.1",
            type: "text",
            content: "DICAS PARA GASTAR MENOS:\n\n1. USE O MODELO CERTO\n   Tarefas simples → Haiku (mais barato)\n   Tarefas normais → Sonnet\n   So use Opus quando realmente precisar\n\n2. SEJA ESPECIFICO\n   Quanto mais claro seu pedido, menos idas e vindas\n\n3. USE /clear ENTRE TAREFAS\n   Isso limpa o contexto e economiza tokens\n\n4. APROVEITE O CLAUDE.md\n   Instrucoes no arquivo CLAUDE.md evitam repeticoes"
          },
          {
            id: "5.4.2",
            type: "tip",
            content: "QUANTO CUSTA NA PRATICA?\n\nUma sessao tipica de 30 min custa entre $0.10 e $0.50.\nCom $5, voce programa por semanas como iniciante."
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 6: USANDO NO DIA A DIA
  // ========================================
  {
    id: 6,
    title: "Usando no Dia a Dia",
    description: "Aprenda os recursos essenciais do Claude Code",
    duration: "15-18 min",
    badge: "Praticante",
    badgeIcon: "💪",
    lessons: [
      {
        id: "6.1",
        title: "O Arquivo CLAUDE.md",
        steps: [
          {
            id: "6.1.1",
            type: "text",
            content: "O CLAUDE.md e um arquivo especial que o Claude Code le automaticamente.\n\nPense nele como uma \"carta de instrucoes\" para o Claude.\nVoce coloca la suas preferencias e regras."
          },
          {
            id: "6.1.2",
            type: "text",
            content: "EXEMPLO DE CLAUDE.md:\n\n# Meu Projeto\n\n## Regras\n- Sempre responder em portugues\n- Usar TypeScript\n- Testar antes de entregar\n\n## Sobre o Projeto\n- App de lista de tarefas\n- Usa React e Next.js"
          },
          {
            id: "6.1.3",
            type: "text",
            content: "Para criar:\n\n1. Na raiz do seu projeto, crie um arquivo chamado CLAUDE.md\n2. Escreva suas instrucoes\n3. O Claude vai ler automaticamente toda vez que iniciar"
          },
          {
            id: "6.1.4",
            type: "tip",
            content: "DICA PODEROSA:\n\nPeca ao proprio Claude para criar o CLAUDE.md!\n\nDigite: \"Crie um CLAUDE.md para este projeto com boas praticas\""
          },
          {
            id: "6.1.5",
            type: "checker",
            content: "Entendeu para que serve o CLAUDE.md?"
          }
        ]
      },
      {
        id: "6.2",
        title: "Plan Mode vs Code Mode",
        steps: [
          {
            id: "6.2.1",
            type: "warning",
            content: "ISTO E MUITO IMPORTANTE!\n\nO Claude Code tem dois modos.\nEntender isso e fundamental."
          },
          {
            id: "6.2.2",
            type: "text",
            content: "PLAN MODE (Planejar):\n✓ O Claude apenas ANALISA e SUGERE\n✓ NAO faz alteracoes em arquivos\n✓ Ideal para: entender um problema, planejar\n\nPara ativar, pressione SHIFT + TAB\nOu digite: /plan"
          },
          {
            id: "6.2.3",
            type: "text",
            content: "CODE MODE (Programar) - padrao:\n✓ O Claude EXECUTA alteracoes\n✓ Cria, edita e modifica arquivos REAIS\n✓ Ideal para: implementar, corrigir, criar"
          },
          {
            id: "6.2.4",
            type: "tip",
            content: "REGRA DE OURO:\n\nNao sabe o que fazer? Use Plan Mode primeiro.\nEntendeu o plano? Mude para Code Mode para executar."
          }
        ]
      },
      {
        id: "6.3",
        title: "Referenciando Arquivos",
        steps: [
          {
            id: "6.3.1",
            type: "text",
            content: "Voce pode pedir ao Claude para trabalhar com arquivos especificos usando @:\n\nExemplos:\n\n@src/app.tsx corrija o erro neste arquivo\n@package.json adicione a dependencia axios\n@README.md atualize a documentacao"
          },
          {
            id: "6.3.2",
            type: "text",
            content: "O Claude tambem aceita:\n\n• Pastas inteiras: @src/\n• Imagens: @screenshot.png (ele \"ve\" a imagem!)\n• URLs: cole um link e ele acessa"
          },
          {
            id: "6.3.3",
            type: "tip",
            content: "DICA:\n\nNa maioria das vezes, voce nao precisa usar @.\nO Claude Code ja ve todos os arquivos do projeto.\nUse @ quando quiser ser especifico."
          }
        ]
      },
      {
        id: "6.4",
        title: "Comandos Slash",
        steps: [
          {
            id: "6.4.1",
            type: "text",
            content: "Comandos que comecam com / fazem acoes especiais:\n\nCOMANDOS PRINCIPAIS:\n\n/help       → Mostra ajuda\n/clear      → Limpa conversa (economiza tokens)\n/model      → Troca de modelo\n/plan       → Ativa modo plano\n/review     → Revisa codigo\n/commit     → Cria commit Git\n/init       → Cria CLAUDE.md automatico"
          },
          {
            id: "6.4.2",
            type: "text",
            content: "ATALHOS DE TECLADO:\n\nESC         → Cancela a resposta atual\nCTRL + C    → Sai do Claude Code\nSHIFT + TAB → Alterna Plan/Code mode\nTAB         → Autocomplete"
          },
          {
            id: "6.4.3",
            type: "tip",
            content: "COMANDO MAIS IMPORTANTE:\n\n/clear\n\nUse entre tarefas diferentes.\nIsso reseta o contexto e evita confusao."
          }
        ]
      },
      {
        id: "6.5",
        title: "Exercicio Pratico",
        steps: [
          {
            id: "6.5.1",
            type: "text",
            content: "Vamos praticar! Faca estes pedidos ao Claude Code:\n\n1. Primeiro, no Plan Mode:"
          },
          {
            id: "6.5.2",
            type: "code",
            content: "Digite (apos ativar Plan Mode com /plan):",
            codeContent: "Quero criar uma pagina HTML simples com meu nome e uma lista dos meus hobbies. Como voce faria?"
          },
          {
            id: "6.5.3",
            type: "text",
            content: "2. Depois, no Code Mode normal:"
          },
          {
            id: "6.5.4",
            type: "code",
            content: "Digite:",
            codeContent: "Crie a pagina HTML que voce planejou. Use meu nome como 'Estudante' e 3 hobbies de exemplo."
          },
          {
            id: "6.5.5",
            type: "checker",
            content: "O Claude criou a pagina HTML?"
          }
        ]
      }
    ]
  },

  // ========================================
  // MODULO 7: ALEM DO BASICO
  // ========================================
  {
    id: 7,
    title: "Alem do Basico",
    description: "Conheca recursos avancados do Claude Code",
    duration: "10-12 min",
    badge: "Expert",
    badgeIcon: "🎓",
    lessons: [
      {
        id: "7.1",
        title: "MCP - Conectando Ferramentas",
        steps: [
          {
            id: "7.1.1",
            type: "text",
            content: "MCP (Model Context Protocol) permite conectar o Claude Code a ferramentas externas.\n\nExemplos do que voce pode conectar:\n\n• GitHub → gerenciar repositorios\n• Banco de dados → consultar dados\n• Google Drive → acessar documentos\n• Navegador → interagir com sites"
          },
          {
            id: "7.1.2",
            type: "text",
            content: "Para configurar MCP, voce edita o arquivo:\n.claude/settings.json\n\nMas nao se preocupe: o Claude Code pode fazer isso por voce!\nBasta pedir: \"Configure MCP para o GitHub\""
          },
          {
            id: "7.1.3",
            type: "tip",
            content: "MCP E AVANCADO:\n\nPor enquanto, saiba que existe.\nQuando precisar, o Claude Code te ajuda a configurar."
          }
        ]
      },
      {
        id: "7.2",
        title: "Hooks - Automatizacoes",
        steps: [
          {
            id: "7.2.1",
            type: "text",
            content: "Hooks sao acoes automaticas que acontecem em momentos especificos.\n\nExemplos:\n\n• Antes de salvar: rodar formatacao automatica\n• Antes de commit: verificar erros\n• Ao iniciar: carregar configuracoes"
          },
          {
            id: "7.2.2",
            type: "text",
            content: "E como configurar um despertador:\n\"Quando acontecer X, faca Y automaticamente.\"\n\nVoce configura uma vez e funciona sempre."
          },
          {
            id: "7.2.3",
            type: "tip",
            content: "EXEMPLO PRATICO:\n\nVoce pode configurar um hook que:\n1. Antes de cada commit, roda os testes\n2. Se os testes falharem, o commit nao acontece\n\nIsso evita bugs no codigo!"
          }
        ]
      },
      {
        id: "7.3",
        title: "Subagentes",
        steps: [
          {
            id: "7.3.1",
            type: "text",
            content: "Quando o Claude Code recebe uma tarefa complexa, ele pode criar \"ajudantes\" chamados subagentes.\n\nCada subagente cuida de uma parte da tarefa.\n\nE como um gerente que delega trabalho para a equipe."
          },
          {
            id: "7.3.2",
            type: "text",
            content: "TIPOS DE SUBAGENTES:\n\n• Explore: investiga o codigo\n• Plan: planeja a implementacao\n• Bash: executa comandos\n• General: tarefas gerais\n\nVoce nao precisa criar subagentes.\nO Claude Code faz isso sozinho quando necessario."
          },
          {
            id: "7.3.3",
            type: "tip",
            content: "PARA O DIA A DIA:\n\nVoce nao precisa pensar em subagentes.\nSo saiba que quando uma tarefa demora mais,\ne porque o Claude esta usando ajudantes nos bastidores."
          }
        ]
      },
      {
        id: "7.4",
        title: "Proximos Passos",
        steps: [
          {
            id: "7.4.1",
            type: "text",
            content: "PARABENS!\n\nVoce completou o curso de Claude Code!\n\nAgora voce sabe:\n✓ O que e o Claude Code e por que e poderoso\n✓ Como instalar e configurar\n✓ Como fazer pedidos e controlar permissoes\n✓ Plan Mode vs Code Mode\n✓ Comandos slash e atalhos\n✓ CLAUDE.md para instrucoes\n✓ Conceitos avancados (MCP, hooks, subagentes)"
          },
          {
            id: "7.4.2",
            type: "tip",
            content: "CONTINUE APRENDENDO:\n\n• Pratique com projetos reais do seu dia a dia\n• Comece com tarefas simples e va aumentando\n• Use Plan Mode quando nao souber o que fazer\n• Leia a documentacao: docs.anthropic.com\n• Experimente pedir coisas ousadas - o Claude surpreende!"
          },
          {
            id: "7.4.3",
            type: "text",
            content: "BEM-VINDO AO FUTURO DA PROGRAMACAO.\n\nVoce agora tem uma ferramenta poderosa nas maos.\nUse com sabedoria e criatividade.\n\nBons codigos!"
          },
          {
            id: "7.4.4",
            type: "checker",
            content: "Pronto para programar com Claude Code?"
          }
        ]
      }
    ]
  }
]

// Funcao para obter modulo por ID
export function getClaudeCodeModule(id: number): Module | undefined {
  return claudeCodeModules.find(m => m.id === id)
}

// Funcao para obter licao por ID
export function getClaudeCodeLesson(moduleId: number, lessonId: string): Lesson | undefined {
  const module = getClaudeCodeModule(moduleId)
  return module?.lessons.find(l => l.id === lessonId)
}
