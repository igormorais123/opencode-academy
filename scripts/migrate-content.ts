// Script para migrar conteudo do modules.ts para o banco de dados
// Execute: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/migrate-content.ts
// Ou: npx tsx scripts/migrate-content.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Importar conteudo diretamente (inline para evitar problemas de import)
const modules = [
  // MODULO 0: O SUPERPODER
  {
    id: 0,
    title: "O Superpoder",
    description: "Descubra por que a IA vai transformar seu trabalho",
    duration: "5-7 min",
    badge: "Visionario",
    badgeIcon: "👁️",
    lessons: [
      {
        id: "0.1",
        title: "Seu Tempo Vale Ouro",
        steps: [
          { id: "0.1.1", type: "text", content: "Pense na sua semana de trabalho...\n\nQuantas horas voce gasta em tarefas repetitivas?\n\n• Organizar arquivos em pastas\n• Procurar documentos perdidos\n• Formatar textos e relatorios\n• Revisar contratos longos\n• Criar apresentacoes\n• Responder e-mails similares" },
          { id: "0.1.2", type: "tip", content: "Profissionais gastam em media 4,5 horas por semana em tarefas que poderiam ser automatizadas. Isso sao 234 horas por ano. Quase 10 dias!" },
          { id: "0.1.3", type: "checker", content: "Voce se identificou com isso?" }
        ]
      },
      {
        id: "0.2",
        title: "E Se Voce Tivesse um Assistente?",
        steps: [
          { id: "0.2.1", type: "text", content: "Imagine ter um assistente que:\n\n✓ Nunca cansa\n✓ Trabalha 24 horas por dia\n✓ Entende portugues perfeitamente\n✓ Organiza seus arquivos em segundos\n✓ Revisa contratos em minutos\n✓ Cria apresentacoes enquanto voce toma cafe\n✓ Nao cobra hora extra" },
          { id: "0.2.2", type: "text", content: "Esse assistente existe. E a Inteligencia Artificial.\n\nE voce vai aprender a usa-la de verdade hoje." }
        ]
      },
      {
        id: "0.3",
        title: "ChatGPT E So o Comeco",
        steps: [
          { id: "0.3.1", type: "text", content: "Voce provavelmente ja conhece o ChatGPT.\nEle e otimo para conversar e tirar duvidas.\n\nMas tem limitacoes importantes:" },
          { id: "0.3.2", type: "text", content: "CHATGPT:\n❌ Nao ve seus arquivos\n❌ Nao organiza pastas\n❌ Nao edita documentos\n❌ So 1 modelo de IA\n❌ Copia e cola manual\n\nOPENCODE:\n✓ Ve seus arquivos\n✓ Organiza pastas\n✓ Edita documentos\n✓ Varios modelos\n✓ Faz direto" },
          { id: "0.3.3", type: "tip", content: "EM RESUMO:\n\nChatGPT = Conversa sobre seus arquivos\nOpenCode = Trabalha COM seus arquivos" }
        ]
      },
      {
        id: "0.4",
        title: "O Que Voce Vai Conseguir Fazer",
        steps: [
          { id: "0.4.1", type: "text", content: "Ao final deste curso, voce vai poder:\n\n📁 ORGANIZACAO\n\"Organize os 500 arquivos desta pasta por data e tipo\"\n\n📄 DOCUMENTOS\n\"Revise este contrato e aponte as clausulas problematicas\"\n\n📊 APRESENTACOES\n\"Crie uma apresentacao sobre este tema com 10 slides\"\n\n⚙️ CONFIGURACOES\n\"Configure meu computador para fazer backup automatico\"\n\n🔧 PEQUENOS PROGRAMAS\n\"Crie um programa que renomeie fotos pela data\"" },
          { id: "0.4.2", type: "text", content: "E o melhor: voce faz tudo isso conversando em portugues.\nSem precisar aprender a programar." }
        ]
      }
    ]
  },
  // MODULO 1: TERMINAL SEM MEDO
  {
    id: 1,
    title: "Terminal Sem Medo",
    description: "Entenda o que e um terminal de forma simples",
    duration: "10-12 min",
    badge: "Desmistificador",
    badgeIcon: "🎯",
    lessons: [
      {
        id: "1.1",
        title: "O Que E Um Terminal?",
        steps: [
          { id: "1.1.1", type: "text", content: "Voce ja viu em filmes: uma tela preta com letras verdes, alguem digitando muito rapido.\n\nParece coisa de hacker, ne?" },
          { id: "1.1.2", type: "tip", content: "DEFINICAO SIMPLES:\n\nTerminal e so uma forma de CONVERSAR com o computador usando TEXTO em vez de cliques.\n\nEm vez de clicar em icones, voce escreve o que quer." },
          { id: "1.1.3", type: "text", content: "Pense assim:\n\nINTERFACE GRAFICA (o que voce conhece)\n= Conversa por GESTOS\n= Apontar, clicar, arrastar\n\nTERMINAL\n= Conversa por TEXTO\n= Escrever o que voce quer" },
          { id: "1.1.4", type: "text", content: "E como a diferenca entre:\n\n• Apontar para o cardapio e fazer gesto de \"quero isso\"\n• Ou simplesmente dizer \"quero um cafe, por favor\"\n\nAs duas formas funcionam. Sao apenas jeitos diferentes de pedir." }
        ]
      },
      {
        id: "1.2",
        title: "Por Que Usar o Terminal?",
        steps: [
          { id: "1.2.1", type: "text", content: "\"Se cliques funcionam, por que aprender isso?\"\n\nBoa pergunta! Aqui estao os motivos:\n\n1️⃣ O OpenCode FUNCIONA no terminal\nE onde a magica acontece.\n\n2️⃣ E MAIS RAPIDO para certas tarefas\nDigitar um comando e mais rapido que 10 cliques.\n\n3️⃣ Voce pode AUTOMATIZAR\nComandos podem ser repetidos automaticamente.\n\n4️⃣ E uma HABILIDADE VALIOSA\nPoucos profissionais sabem usar. Voce vai saber." },
          { id: "1.2.2", type: "tip", content: "BOA NOTICIA:\n\nVoce so precisa aprender 5 comandos para usar o OpenCode.\nCinco. Eu prometo que voce consegue." }
        ]
      },
      {
        id: "1.3",
        title: "Os 5 Comandos Que Importam",
        steps: [
          { id: "1.3.1-win", type: "text", osSpecific: "windows", content: "OS UNICOS 5 COMANDOS QUE VOCE PRECISA SABER:\n\n🪟 PARA WINDOWS:\n\ncd          → Muda de pasta\ncd ..       → Volta uma pasta\ndir         → Lista arquivos\ncls         → Limpa a tela\nopencode    → Abre o OpenCode" },
          { id: "1.3.1-mac", type: "text", osSpecific: "mac", content: "OS UNICOS 5 COMANDOS QUE VOCE PRECISA SABER:\n\n🍎 PARA MAC:\n\ncd          → Muda de pasta\ncd ..       → Volta uma pasta\nls          → Lista arquivos\nclear       → Limpa a tela\nopencode    → Abre o OpenCode" },
          { id: "1.3.2", type: "theory", content: "O QUE SIGNIFICA \"cd\"?\n\n\"cd\" vem de \"change directory\" (mudar diretorio).\n\"Diretorio\" e so outro nome para \"pasta\".\n\nEntao \"cd Documents\" significa: \"va para a pasta Documents\"" }
        ]
      },
      {
        id: "1.4",
        title: "O Truque CRUCIAL do Copiar/Colar",
        steps: [
          { id: "1.4.1", type: "warning", content: "ATENCAO: ISTO E MUITO IMPORTANTE!\n\nNo terminal, CTRL+V NAO FUNCIONA para colar!\n\nIsso confunde muita gente no comeco." },
          { id: "1.4.2-win", type: "text", osSpecific: "windows", content: "🪟 NO WINDOWS:\n\nPara COLAR:   CTRL + SHIFT + V\n(Segure CTRL e SHIFT, depois aperte V)\n\nPara COPIAR:  CTRL + SHIFT + C\n(Segure CTRL e SHIFT, depois aperte C)" },
          { id: "1.4.2-mac", type: "text", osSpecific: "mac", content: "🍎 NO MAC:\n\nPara COLAR:   CMD + V\n(Segure CMD, depois aperte V)\n\nPara COPIAR:  CMD + C\n(Segure CMD, depois aperte C)\n\n(No Mac funciona igual ao normal!)" },
          { id: "1.4.3", type: "tip", content: "DECORE ISSO!\n\nVoce vai usar MUITO durante o curso.\nSempre que ver uma caixinha de codigo, vai precisar colar." }
        ]
      }
    ]
  },
  // MODULO 2: INSTALANDO WEZTERM
  {
    id: 2,
    title: "Instalando o WezTerm",
    description: "Instale o programa de terminal",
    duration: "8-10 min",
    badge: "Primeiro Passo",
    badgeIcon: "🚀",
    lessons: [
      {
        id: "2.1",
        title: "O Que E o WezTerm?",
        steps: [
          { id: "2.1.1", type: "text", content: "WezTerm e um programa de terminal.\n\nLembra que o terminal e uma forma de conversar com o computador por texto?\n\nO WezTerm e o PROGRAMA onde essa conversa acontece.\nE como o WhatsApp e o programa onde voce conversa com outras pessoas." },
          { id: "2.1.2-win", type: "text", osSpecific: "windows", content: "O Windows tem um terminal proprio, mas o WezTerm e melhor porque funciona perfeitamente com o OpenCode." },
          { id: "2.1.2-mac", type: "text", osSpecific: "mac", content: "O Mac tem um terminal proprio chamado Terminal, mas o WezTerm e melhor porque funciona perfeitamente com o OpenCode." }
        ]
      },
      {
        id: "2.2",
        title: "Baixando o WezTerm",
        steps: [
          { id: "2.2.1", type: "text", content: "PASSO 1: ABRIR O NAVEGADOR\n\nPrimeiro, vamos abrir seu navegador de internet.\n\nPode ser Microsoft Edge, Google Chrome ou Firefox.\n\nProcure o icone do navegador na sua area de trabalho ou na barra de tarefas.\n\nDe dois cliques no icone para abrir." },
          { id: "2.2.2", type: "checker", content: "Conseguiu abrir o navegador?" },
          { id: "2.2.3", type: "text", content: "PASSO 2: ACESSAR O SITE\n\nAgora vamos acessar o site onde baixamos o WezTerm.\n\n1. Clique na barra de endereco (onde aparece o site atual)\n2. Apague o que estiver escrito\n3. Digite ou cole este endereco:" },
          { id: "2.2.4", type: "code", content: "Digite este endereco no navegador:", codeContent: "wezterm.org/installation.html" },
          { id: "2.2.5", type: "text", content: "4. Pressione a tecla ENTER no teclado" },
          { id: "2.2.6", type: "checker", content: "O site do WezTerm abriu?" },
          { id: "2.2.7-win", type: "text", osSpecific: "windows", content: "PASSO 3: ENCONTRAR O DOWNLOAD\n\n1. Role a pagina para baixo\n2. Procure a secao que diz \"Windows\"\n3. Clique no link que termina com \".exe\"\n   Vai ser algo como: WezTerm-windows-20240101.exe" },
          { id: "2.2.7-mac", type: "text", osSpecific: "mac", content: "PASSO 3: ENCONTRAR O DOWNLOAD\n\n1. Role a pagina para baixo\n2. Procure a secao que diz \"macOS\"\n3. Clique no link que termina com \".zip\"\n   Vai ser algo como: WezTerm-macos-20240101.zip" },
          { id: "2.2.8", type: "tip", osSpecific: "windows", content: "\".exe\" significa que e um programa executavel para Windows.\nE isso que voce precisa baixar." },
          { id: "2.2.9", type: "checker", content: "Clicou e o download comecou?" }
        ]
      },
      {
        id: "2.3",
        title: "Instalando o WezTerm",
        steps: [
          { id: "2.3.1", type: "text", content: "Aguarde o download terminar.\nNormalmente leva menos de 1 minuto." },
          { id: "2.3.2-win", type: "text", osSpecific: "windows", content: "INSTALANDO NO WINDOWS:\n\n1. Abra a pasta Downloads\n   (Clique no icone de pasta amarela na barra de tarefas,\n   depois clique em \"Downloads\" no menu lateral)\n\n2. Procure o arquivo que voce baixou\n   (Vai ter \"WezTerm\" no nome)\n\n3. De DOIS CLIQUES no arquivo" },
          { id: "2.3.2-mac", type: "text", osSpecific: "mac", content: "INSTALANDO NO MAC:\n\n1. Abra o Finder (icone de rosto sorridente azul)\n\n2. Clique em \"Downloads\" no menu lateral\n\n3. Procure o arquivo .zip que voce baixou\n\n4. De DOIS CLIQUES para descompactar\n\n5. Arraste o WezTerm para a pasta \"Aplicativos\"" },
          { id: "2.3.3", type: "text", osSpecific: "windows", content: "4. Se aparecer uma pergunta:\n   \"Deseja permitir que este app faca alteracoes?\"\n   Clique em SIM\n\n5. Clique NEXT em todas as telas\n\n6. Clique INSTALL\n\n7. Clique FINISH" },
          { id: "2.3.4", type: "checker", content: "A instalacao terminou?" }
        ]
      },
      {
        id: "2.4",
        title: "Abrindo o WezTerm",
        steps: [
          { id: "2.4.1-win", type: "text", osSpecific: "windows", content: "ABRINDO O WEZTERM:\n\n1. Clique no botao Iniciar (icone do Windows no canto inferior esquerdo)\n\n2. Digite: WezTerm\n\n3. Clique no icone que aparecer" },
          { id: "2.4.1-mac", type: "text", osSpecific: "mac", content: "ABRINDO O WEZTERM:\n\n1. Abra a pasta Aplicativos\n\n2. Encontre o WezTerm\n\n3. De dois cliques para abrir\n\n4. Se perguntar se confia no app, clique \"Abrir\"" },
          { id: "2.4.2", type: "text", content: "Uma janela preta vai aparecer.\nIsso e o terminal! Voce conseguiu!\n\nNao se assuste com a tela preta - e assim mesmo." },
          { id: "2.4.3-win", type: "tip", osSpecific: "windows", content: "FIXANDO NA BARRA DE TAREFAS:\n\n1. Com o WezTerm aberto, clique com o botao DIREITO no icone dele na barra de tarefas\n\n2. Clique em \"Fixar na barra de tarefas\"\n\nAgora voce pode abrir o WezTerm com um clique!" },
          { id: "2.4.3-mac", type: "tip", osSpecific: "mac", content: "FIXANDO NO DOCK:\n\n1. Com o WezTerm aberto, clique com o botao DIREITO no icone dele no Dock\n\n2. Clique em \"Opcoes\" > \"Manter no Dock\"\n\nAgora voce pode abrir o WezTerm com um clique!" },
          { id: "2.4.4", type: "checker", content: "O WezTerm esta aberto?" }
        ]
      }
    ]
  },
  // MODULO 3: INSTALANDO NODE.JS
  {
    id: 3,
    title: "Instalando o Node.js",
    description: "Instale o motor que faz o OpenCode funcionar",
    duration: "8-10 min",
    badge: "Motor Ligado",
    badgeIcon: "⚡",
    lessons: [
      {
        id: "3.1",
        title: "O Que E o Node.js?",
        steps: [
          { id: "3.1.1", type: "text", content: "Node.js e um \"motor\" que faz o OpenCode funcionar.\n\nVoce nao vai usar diretamente, mas precisa estar instalado." },
          { id: "3.1.2", type: "theory", content: "ANALOGIA:\n\nPense como o motor de um carro.\nVoce nao mexe nele diretamente, mas sem ele o carro nao anda.\n\nO Node.js e o motor. O OpenCode e o carro." }
        ]
      },
      {
        id: "3.2",
        title: "Baixando o Node.js",
        steps: [
          { id: "3.2.1", type: "warning", content: "IMPORTANTE: Feche o WezTerm antes de continuar!\n\nSe ele estiver aberto, feche agora.\nIsso e necessario para a instalacao funcionar." },
          { id: "3.2.2", type: "text", content: "1. Abra seu navegador\n\n2. Acesse este site:" },
          { id: "3.2.3", type: "code", content: "Digite este endereco:", codeContent: "nodejs.org" },
          { id: "3.2.4", type: "text", content: "3. Voce vai ver dois botoes grandes verdes\n\n4. Clique no botao que diz \"LTS\" (ou \"Recomendado para a maioria\")" },
          { id: "3.2.5", type: "tip", content: "Por que LTS?\n\nLTS significa \"versao estavel\". E a mais testada e confiavel.\nSempre escolha LTS." },
          { id: "3.2.6", type: "checker", content: "O download comecou?" }
        ]
      },
      {
        id: "3.3",
        title: "Instalando o Node.js",
        steps: [
          { id: "3.3.1-win", type: "text", osSpecific: "windows", content: "INSTALANDO NO WINDOWS:\n\n1. Abra a pasta Downloads\n\n2. Procure o arquivo que termina com .msi\n\n3. De DOIS CLIQUES no arquivo\n\n4. Clique NEXT varias vezes\n\n5. Se aparecer a opcao:\n   \"Automatically install necessary tools\"\n   MARQUE ELA (clique na caixinha)\n\n6. Clique INSTALL\n\n7. Se abrir uma janela preta, deixe rodar ate fechar sozinha\n\n8. Clique FINISH" },
          { id: "3.3.1-mac", type: "text", osSpecific: "mac", content: "INSTALANDO NO MAC:\n\n1. Abra a pasta Downloads no Finder\n\n2. Procure o arquivo que termina com .pkg\n\n3. De DOIS CLIQUES no arquivo\n\n4. Clique CONTINUAR varias vezes\n\n5. Digite sua senha se pedir\n\n6. Clique FECHAR" },
          { id: "3.3.2", type: "checker", content: "A instalacao terminou?" }
        ]
      },
      {
        id: "3.4",
        title: "Reiniciando o Computador",
        steps: [
          { id: "3.4.1", type: "warning", content: "OBRIGATORIO!\n\nReinicie o computador AGORA.\n\nSem reiniciar, o sistema nao reconhece que o Node.js foi instalado e os proximos passos vao dar erro." },
          { id: "3.4.2-win", type: "text", osSpecific: "windows", content: "COMO REINICIAR NO WINDOWS:\n\n1. Clique no botao Iniciar\n2. Clique no icone de energia (circulo com uma linha)\n3. Clique em \"Reiniciar\"" },
          { id: "3.4.2-mac", type: "text", osSpecific: "mac", content: "COMO REINICIAR NO MAC:\n\n1. Clique no icone da maca no canto superior esquerdo\n2. Clique em \"Reiniciar...\"\n3. Confirme" },
          { id: "3.4.3", type: "text", content: "Depois que o computador ligar novamente, volte aqui e continue." },
          { id: "3.4.4", type: "checker", content: "Reiniciou o computador?" }
        ]
      },
      {
        id: "3.5",
        title: "Verificando a Instalacao",
        steps: [
          { id: "3.5.1", type: "text", content: "Agora vamos verificar se o Node.js foi instalado corretamente.\n\n1. Abra o WezTerm\n\n2. Digite o comando abaixo e pressione ENTER:" },
          { id: "3.5.2", type: "code", content: "Digite este comando:", codeContent: "node --version" },
          { id: "3.5.3", type: "text", content: "Deve aparecer algo como:\n\nv22.13.0\n\n(O numero pode ser diferente, tudo bem)" },
          { id: "3.5.4", type: "tip", content: "ESSE FOI SEU PRIMEIRO COMANDO!\n\nVoce acabou de executar seu primeiro comando no terminal.\nViu como e simples?" },
          { id: "3.5.5", type: "checker", content: "Apareceu um numero de versao?" }
        ]
      }
    ]
  },
  // MODULO 4: INSTALANDO OPENCODE
  {
    id: 4,
    title: "Instalando o OpenCode",
    description: "Instale a ferramenta principal",
    duration: "10-12 min",
    badge: "Ambiente Pronto",
    badgeIcon: "🛠️",
    lessons: [
      {
        id: "4.1",
        title: "Instalando o Gerenciador de Pacotes",
        steps: [
          { id: "4.1.1-win", type: "text", osSpecific: "windows", content: "Primeiro, vamos instalar o Chocolatey.\n\nChocolatey e um \"instalador de programas\" via terminal.\nCom ele, instalar programas fica muito mais facil." },
          { id: "4.1.1-mac", type: "text", osSpecific: "mac", content: "Primeiro, vamos instalar o Homebrew.\n\nHomebrew e um \"instalador de programas\" via terminal.\nCom ele, instalar programas fica muito mais facil." },
          { id: "4.1.2", type: "warning", osSpecific: "windows", content: "IMPORTANTE!\n\nVoce precisa abrir o WezTerm COMO ADMINISTRADOR.\n\n1. Feche o WezTerm se estiver aberto\n2. Clique com o BOTAO DIREITO no icone do WezTerm\n3. Clique em \"Executar como administrador\"\n4. Clique SIM quando perguntar" },
          { id: "4.1.3-win", type: "text", osSpecific: "windows", content: "Agora copie e cole este comando INTEIRO no terminal:" },
          { id: "4.1.3-mac", type: "text", osSpecific: "mac", content: "Abra o WezTerm e copie e cole este comando:" },
          { id: "4.1.4-win", type: "code", osSpecific: "windows", content: "Copie este comando (e grande, copie TUDO):", codeContent: "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" },
          { id: "4.1.4-mac", type: "code", osSpecific: "mac", content: "Copie este comando:", codeContent: "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"" },
          { id: "4.1.5", type: "warning", osSpecific: "windows", content: "LEMBRE-SE!\n\nPara colar no terminal Windows:\nCTRL + SHIFT + V\n\n(Nao e CTRL+V normal!)" },
          { id: "4.1.6", type: "text", content: "Depois de colar, pressione ENTER e aguarde.\nPode demorar 2-3 minutos." },
          { id: "4.1.7", type: "text", osSpecific: "mac", content: "O Mac vai pedir sua senha.\nDigite sua senha (ela nao aparece enquanto digita, e normal).\nPressione ENTER." },
          { id: "4.1.8", type: "checker", content: "A instalacao terminou?" }
        ]
      },
      {
        id: "4.2",
        title: "Instalando o OpenCode",
        steps: [
          { id: "4.2.1-win", type: "text", osSpecific: "windows", content: "Agora vamos instalar o OpenCode!\n\nCom o WezTerm AINDA ABERTO COMO ADMINISTRADOR,\ndigite este comando:" },
          { id: "4.2.1-mac", type: "text", osSpecific: "mac", content: "Agora vamos instalar o OpenCode!\n\nNo WezTerm, digite este comando:" },
          { id: "4.2.2-win", type: "code", osSpecific: "windows", content: "Digite:", codeContent: "choco install opencode" },
          { id: "4.2.2-mac", type: "code", osSpecific: "mac", content: "Digite:", codeContent: "brew install anomalyco/tap/opencode" },
          { id: "4.2.3", type: "text", content: "Pressione ENTER." },
          { id: "4.2.4", type: "text", osSpecific: "windows", content: "Quando perguntar:\n\"Do you want to run the script?\"\n\nDigite Y (a letra Y) e pressione ENTER." },
          { id: "4.2.5", type: "text", content: "Aguarde terminar.\nPode levar 1-2 minutos." },
          { id: "4.2.6", type: "checker", content: "A instalacao terminou?" }
        ]
      },
      {
        id: "4.3",
        title: "Verificando a Instalacao",
        steps: [
          { id: "4.3.1", type: "text", content: "Agora vamos verificar se o OpenCode foi instalado.\n\n1. FECHE o WezTerm completamente\n\n2. Abra novamente (nao precisa ser como administrador desta vez)\n\n3. Digite:" },
          { id: "4.3.2", type: "code", content: "Digite:", codeContent: "opencode --version" },
          { id: "4.3.3", type: "text", content: "Deve aparecer um numero de versao, como:\n\n1.1.27\n\n(O numero pode ser diferente)" },
          { id: "4.3.4", type: "tip", content: "PARABENS!\n\nO OpenCode esta instalado no seu computador!\nVoce tem um superpoder agora." },
          { id: "4.3.5", type: "checker", content: "Apareceu o numero da versao?" }
        ]
      }
    ]
  },
  // MODULO 5: CONECTANDO A IA
  {
    id: 5,
    title: "Conectando a IA",
    description: "Configure seu provedor de inteligencia artificial",
    duration: "12-15 min",
    badge: "Conectado",
    badgeIcon: "🔗",
    lessons: [
      {
        id: "5.1",
        title: "Criando sua Pasta de Trabalho",
        steps: [
          { id: "5.1.1", type: "text", content: "O OpenCode funciona DENTRO de uma pasta especifica.\nEle so consegue ver os arquivos que estao nessa pasta.\n\nE uma protecao: ele nao mexe em arquivos de outras partes do computador." },
          { id: "5.1.2-win", type: "text", osSpecific: "windows", content: "CRIANDO A PASTA:\n\n1. Abra o Explorador de Arquivos (icone de pasta amarela)\n\n2. Clique em \"Documentos\" no menu lateral\n\n3. Clique com o botao direito em um espaco vazio\n\n4. Clique em \"Novo\" → \"Pasta\"\n\n5. Digite o nome: MeuOpenCode\n\n6. Pressione ENTER" },
          { id: "5.1.2-mac", type: "text", osSpecific: "mac", content: "CRIANDO A PASTA:\n\n1. Abra o Finder\n\n2. Clique em \"Documentos\" no menu lateral\n\n3. Clique com o botao direito em um espaco vazio\n\n4. Clique em \"Nova Pasta\"\n\n5. Digite o nome: MeuOpenCode\n\n6. Pressione ENTER" },
          { id: "5.1.3", type: "checker", content: "Criou a pasta MeuOpenCode?" }
        ]
      },
      {
        id: "5.2",
        title: "Abrindo o OpenCode",
        steps: [
          { id: "5.2.1", type: "text", content: "Agora vamos abrir o OpenCode dentro da sua pasta.\n\n1. Abra o WezTerm" },
          { id: "5.2.2-win", type: "text", osSpecific: "windows", content: "2. Digite este comando para ir ate sua pasta:\n\n(Substitua \"SeuNome\" pelo seu nome de usuario do Windows)" },
          { id: "5.2.2-mac", type: "text", osSpecific: "mac", content: "2. Digite este comando para ir ate sua pasta:" },
          { id: "5.2.3-win", type: "code", osSpecific: "windows", content: "Digite (troque SeuNome pelo seu usuario):", codeContent: "cd C:\\Users\\SeuNome\\Documents\\MeuOpenCode" },
          { id: "5.2.3-mac", type: "code", osSpecific: "mac", content: "Digite:", codeContent: "cd ~/Documents/MeuOpenCode" },
          { id: "5.2.4", type: "tip", osSpecific: "windows", content: "NAO SABE SEU NOME DE USUARIO?\n\nDigite apenas: cd\nVai mostrar algo como: C:\\Users\\Joao\nUse esse nome no comando." },
          { id: "5.2.5", type: "text", content: "3. Pressione ENTER\n\n4. Agora digite:" },
          { id: "5.2.6", type: "code", content: "Digite:", codeContent: "opencode" },
          { id: "5.2.7", type: "text", content: "5. Pressione ENTER\n\nUma interface vai aparecer dentro do terminal!" },
          { id: "5.2.8", type: "checker", content: "O OpenCode abriu?" }
        ]
      },
      {
        id: "5.3",
        title: "Entendendo os Provedores",
        steps: [
          { id: "5.3.1", type: "text", content: "Agora precisamos conectar um \"cerebro\" de IA.\n\nProvedores sao empresas que fornecem a inteligencia artificial.\n\nExemplos: Google (Gemini), OpenAI (ChatGPT), OpenCode Zen." },
          { id: "5.3.2", type: "text", content: "Vou te ensinar a conectar o GOOGLE GEMINI porque:\n\n✓ E gratuito (ate um limite generoso)\n✓ E facil de configurar\n✓ Funciona muito bem" },
          { id: "5.3.3", type: "text", content: "OBTENDO A CHAVE DO GOOGLE:\n\n1. Abra seu navegador\n\n2. Acesse:" },
          { id: "5.3.4", type: "code", content: "Acesse este site:", codeContent: "aistudio.google.com/apikey" },
          { id: "5.3.5", type: "text", content: "3. Faca login com sua conta Google\n\n4. Clique em \"Create API Key\" (Criar chave de API)\n\n5. Selecione ou crie um projeto\n\n6. Uma chave vai aparecer. COPIE ELA!" },
          { id: "5.3.6", type: "warning", content: "IMPORTANTE!\n\nA chave so aparece UMA VEZ.\nCopie e cole em um arquivo de texto para guardar.\nVoce vai precisar dela agora." },
          { id: "5.3.7", type: "checker", content: "Conseguiu copiar a chave do Google?" }
        ]
      },
      {
        id: "5.4",
        title: "Conectando no OpenCode",
        steps: [
          { id: "5.4.1", type: "text", content: "Agora vamos conectar a chave no OpenCode.\n\n1. Com o OpenCode aberto, pressione:" },
          { id: "5.4.2-win", type: "code", osSpecific: "windows", content: "Pressione estas teclas:", codeContent: "CTRL + P" },
          { id: "5.4.2-mac", type: "code", osSpecific: "mac", content: "Pressione estas teclas:", codeContent: "CMD + P" },
          { id: "5.4.3", type: "text", content: "2. Uma caixa de busca aparece no topo\n\n3. Digite: connect\n\n4. Selecione a opcao /connect (use as setas e ENTER)\n\n5. Uma lista de provedores aparece\n\n6. Selecione \"Google\"\n\n7. Cole sua chave de API" },
          { id: "5.4.4", type: "tip", osSpecific: "windows", content: "LEMBRE-SE!\n\nPara colar no terminal:\nCTRL + SHIFT + V" },
          { id: "5.4.5", type: "text", content: "8. Pressione ENTER" },
          { id: "5.4.6", type: "checker", content: "Conseguiu conectar?" }
        ]
      },
      {
        id: "5.5",
        title: "Testando a Conexao",
        steps: [
          { id: "5.5.1", type: "text", content: "Vamos testar se esta funcionando!\n\nNo OpenCode, digite uma pergunta simples:" },
          { id: "5.5.2", type: "code", content: "Digite:", codeContent: "Ola! Quem e voce?" },
          { id: "5.5.3", type: "text", content: "Pressione ENTER.\n\nSe a IA responder, PARABENS!\nVoce conectou com sucesso!" },
          { id: "5.5.4", type: "tip", content: "VOCE CONSEGUIU!\n\nAgora voce tem uma IA funcionando no seu computador,\npronta para ajudar com seus arquivos e tarefas." },
          { id: "5.5.5", type: "checker", content: "A IA respondeu?" }
        ]
      }
    ]
  },
  // MODULO 6: USANDO NO DIA A DIA
  {
    id: 6,
    title: "Usando no Dia a Dia",
    description: "Aprenda os comandos essenciais",
    duration: "15-18 min",
    badge: "Praticante",
    badgeIcon: "💪",
    lessons: [
      {
        id: "6.1",
        title: "Modo Plan vs Modo Build",
        steps: [
          { id: "6.1.1", type: "warning", content: "ISTO E MUITO IMPORTANTE!\n\nO OpenCode tem dois modos.\nEntender isso e fundamental." },
          { id: "6.1.2", type: "text", content: "MODO PLAN (Planejar):\n✓ O OpenCode apenas ANALISA e SUGERE\n✓ NAO faz alteracoes em arquivos\n✓ Ideal para: entender um problema, pedir opinioes\n\nMODO BUILD (Construir):\n✓ O OpenCode EXECUTA alteracoes\n✓ Cria, edita e modifica arquivos REAIS\n✓ Ideal para: aplicar mudancas, criar documentos" },
          { id: "6.1.3", type: "text", content: "COMO ALTERNAR:\n\nPressione a tecla TAB no teclado.\n\nUm indicador no canto mostra o modo atual." },
          { id: "6.1.4", type: "tip", content: "REGRA DE OURO:\n\nSempre comece no modo PLAN.\nSo mude para BUILD quando entender o que vai acontecer." }
        ]
      },
      {
        id: "6.2",
        title: "Referenciando Arquivos",
        steps: [
          { id: "6.2.1", type: "text", content: "Para pedir ao OpenCode que trabalhe com um arquivo,\nuse o simbolo @ seguido do nome:\n\nExemplo:\n@contrato.docx analise este documento" },
          { id: "6.2.2", type: "tip", content: "DICA:\n\nVoce pode ARRASTAR arquivos para a janela do terminal!\nO OpenCode vai reconhece-los automaticamente." }
        ]
      },
      {
        id: "6.3",
        title: "Comandos Essenciais",
        steps: [
          { id: "6.3.1", type: "text", content: "Todos os comandos comecam com /\n\nCOMANDOS PRINCIPAIS:\n\n/help     → Mostra ajuda\n/models   → Lista e troca modelos\n/connect  → Conecta provedores\n/init     → Inicializa projeto\n/undo     → Desfaz ultima acao\n/redo     → Refaz acao desfeita\n/new      → Nova conversa\n/exit     → Sai do OpenCode" },
          { id: "6.3.2", type: "tip", content: "ATALHO MAGICO:\n\nCTRL + P (ou CMD + P no Mac)\n\nAbre a paleta de comandos.\nDigite o que procura e selecione." }
        ]
      },
      {
        id: "6.4",
        title: "Exercicio Pratico",
        steps: [
          { id: "6.4.1", type: "text", content: "Vamos praticar!\n\n1. Certifique-se que esta no modo PLAN\n   (Pressione TAB ate aparecer \"Plan\")\n\n2. Digite esta pergunta:" },
          { id: "6.4.2", type: "code", content: "Digite:", codeContent: "Liste 5 formas que voce pode me ajudar no trabalho de escritorio" },
          { id: "6.4.3", type: "text", content: "3. Pressione ENTER\n\n4. Leia a resposta da IA" },
          { id: "6.4.4", type: "checker", content: "A IA listou as 5 formas?" }
        ]
      }
    ]
  },
  // MODULO 7: ALEM DO BASICO
  {
    id: 7,
    title: "Alem do Basico",
    description: "Conheca recursos avancados",
    duration: "10-12 min",
    badge: "Expert",
    badgeIcon: "🎓",
    lessons: [
      {
        id: "7.1",
        title: "Personalizando o Visual",
        steps: [
          { id: "7.1.1", type: "text", content: "O OpenCode tem varios temas visuais.\n\nPara mudar:\n\n1. Pressione CTRL + X\n2. Solte\n3. Pressione T\n\nUse as setas para navegar e ENTER para escolher." },
          { id: "7.1.2", type: "tip", content: "Temas populares:\n• Dracula (escuro)\n• Nord (azul suave)\n• One Dark\n• Catppuccin" }
        ]
      },
      {
        id: "7.2",
        title: "Trocando de Modelo",
        steps: [
          { id: "7.2.1", type: "text", content: "Voce pode usar diferentes modelos de IA.\n\nPara trocar:\n\n1. Digite: /models\n2. Pressione ENTER\n3. Selecione outro modelo\n\nCada modelo tem caracteristicas diferentes.\nExperimente!" }
        ]
      },
      {
        id: "7.3",
        title: "Dicas para seu Trabalho",
        steps: [
          { id: "7.3.1", type: "text", content: "DICAS PARA PROFISSIONAIS:\n\n1. SEJA ESPECIFICO\n   Em vez de: \"revise este texto\"\n   Diga: \"revise este texto focando em clareza e formalidade juridica\"\n\n2. DE CONTEXTO\n   Explique o que voce esta fazendo e por que\n\n3. PECAS MENORES\n   Divida tarefas grandes em partes\n\n4. REVISE SEMPRE\n   Confira o que a IA fez antes de usar" }
        ]
      },
      {
        id: "7.4",
        title: "Proximos Passos",
        steps: [
          { id: "7.4.1", type: "text", content: "PARABENS!\n\nVoce completou o curso!\n\nAgora voce sabe:\n✓ O que e um terminal\n✓ Como instalar e usar o OpenCode\n✓ Como conectar e usar a IA\n✓ Os comandos essenciais" },
          { id: "7.4.2", type: "tip", content: "CONTINUE APRENDENDO:\n\n• Experimente pedir ajuda para tarefas reais\n• Nao tenha medo de errar\n• Use o modo Plan para entender antes de executar\n• Visite opencode.ai/docs para mais recursos" },
          { id: "7.4.3", type: "text", content: "BEM-VINDO AO OUTRO LADO.\n\nVoce agora faz parte de um grupo seleto de profissionais\nque sabem usar ferramentas do futuro.\n\nUse esse poder com sabedoria." }
        ]
      }
    ]
  }
]

interface StepData {
  id: string
  type: string
  content: string
  codeContent?: string
  options?: { label: string; correct?: boolean }[]
  osSpecific?: string
}

interface LessonData {
  id: string
  title: string
  steps: StepData[]
}

interface ModuleData {
  id: number
  title: string
  description: string
  duration: string
  badge: string
  badgeIcon: string
  lessons: LessonData[]
}

async function main() {
  console.log('🚀 Iniciando migração de conteúdo...\n')

  // 1. Criar ou atualizar o curso OpenCode Academy
  console.log('📚 Criando curso OpenCode Academy...')

  const course = await prisma.course.upsert({
    where: { slug: 'opencode-academy' },
    update: {
      title: 'OpenCode Academy',
      description: 'Aprenda a usar IA no terminal para automatizar seu trabalho. Curso completo para não-programadores.',
      price: 0, // Gratuito por enquanto
      published: true,
      featured: true,
    },
    create: {
      slug: 'opencode-academy',
      title: 'OpenCode Academy',
      description: 'Aprenda a usar IA no terminal para automatizar seu trabalho. Curso completo para não-programadores.',
      price: 0,
      published: true,
      featured: true,
    },
  })

  console.log(`✅ Curso criado: ${course.title} (${course.id})\n`)

  // 2. Limpar módulos existentes (para evitar duplicatas)
  console.log('🧹 Limpando módulos existentes...')
  await prisma.courseModule.deleteMany({
    where: { courseId: course.id },
  })

  // 3. Criar módulos, lições e steps
  console.log('📝 Criando módulos, lições e steps...\n')

  for (const moduleData of modules as ModuleData[]) {
    console.log(`  📦 Módulo ${moduleData.id}: ${moduleData.title}`)

    const courseModule = await prisma.courseModule.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        duration: moduleData.duration,
        badge: moduleData.badge,
        badgeIcon: moduleData.badgeIcon,
        order: moduleData.id,
      },
    })

    for (let lessonIndex = 0; lessonIndex < moduleData.lessons.length; lessonIndex++) {
      const lessonData = moduleData.lessons[lessonIndex]
      console.log(`    📄 Lição ${lessonData.id}: ${lessonData.title}`)

      const lesson = await prisma.lesson.create({
        data: {
          moduleId: courseModule.id,
          title: lessonData.title,
          order: lessonIndex,
        },
      })

      for (let stepIndex = 0; stepIndex < lessonData.steps.length; stepIndex++) {
        const stepData = lessonData.steps[stepIndex]

        await prisma.step.create({
          data: {
            lessonId: lesson.id,
            type: stepData.type,
            content: stepData.content,
            codeContent: stepData.codeContent || null,
            options: stepData.options ? JSON.stringify(stepData.options) : null,
            osSpecific: stepData.osSpecific || null,
            order: stepIndex,
          },
        })
      }

      console.log(`      ✅ ${lessonData.steps.length} steps criados`)
    }
  }

  // 4. Estatísticas finais
  const stats = {
    modules: await prisma.courseModule.count({ where: { courseId: course.id } }),
    lessons: await prisma.lesson.count({
      where: { module: { courseId: course.id } },
    }),
    steps: await prisma.step.count({
      where: { lesson: { module: { courseId: course.id } } },
    }),
  }

  console.log('\n✨ Migração concluída!\n')
  console.log('📊 Estatísticas:')
  console.log(`   - Módulos: ${stats.modules}`)
  console.log(`   - Lições: ${stats.lessons}`)
  console.log(`   - Steps: ${stats.steps}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro na migração:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
