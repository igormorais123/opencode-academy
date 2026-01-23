// Base de dados de erros conhecidos para o Coach IA
// OpenCode Academy - Prof. Igor Morais Vasconcelos

export const errorsDatabase = {
  windows: {
    node: {
      "node nao reconhecido": {
        causa: "Node.js nao instalado ou computador nao reiniciado",
        solucao: [
          "1. Reinicie o computador (obrigatorio!)",
          "2. Se ja reiniciou, reinstale o Node.js de nodejs.org",
          "3. Escolha a versao LTS (botao verde grande)",
          "4. Durante instalacao, marque 'Add to PATH' se aparecer",
          "5. Reinicie novamente"
        ]
      },
      "ENOENT npm": {
        causa: "Pasta npm nao existe no Windows",
        solucao: [
          "1. Abra o Explorador de Arquivos",
          "2. Na barra de endereco, digite: %APPDATA%",
          "3. Pressione Enter",
          "4. Se nao existir pasta 'npm', crie uma",
          "5. Tente o comando novamente"
        ]
      },
      "EACCES permission": {
        causa: "Precisa executar como administrador",
        solucao: [
          "1. Feche o WezTerm",
          "2. Clique com botao direito no icone do WezTerm",
          "3. Selecione 'Executar como administrador'",
          "4. Clique 'Sim' quando perguntado",
          "5. Tente o comando novamente"
        ]
      },
      "ENOSPC": {
        causa: "Disco cheio",
        solucao: [
          "1. Verifique espaco no disco C:",
          "2. Libere pelo menos 1GB",
          "3. Esvazie a Lixeira",
          "4. Tente novamente"
        ]
      },
      "ETIMEDOUT": {
        causa: "Problema de internet ou firewall",
        solucao: [
          "1. Verifique sua internet",
          "2. Se em rede corporativa, pode ser bloqueio",
          "3. Tente em casa ou com dados moveis",
          "4. Tente mais tarde"
        ]
      }
    },
    chocolatey: {
      "choco nao reconhecido": {
        causa: "Chocolatey nao instalado ou terminal nao reaberto",
        solucao: [
          "1. Feche o WezTerm completamente",
          "2. Abra novamente COMO ADMINISTRADOR",
          "3. Se ainda nao funcionar, reinstale o Chocolatey",
          "4. Cole o comando completo de instalacao novamente"
        ]
      },
      "ExecutionPolicy": {
        causa: "PowerShell bloqueando scripts",
        solucao: [
          "1. O comando de instalacao ja inclui bypass",
          "2. Certifique-se de copiar o comando COMPLETO",
          "3. Execute como administrador"
        ]
      }
    },
    opencode: {
      "opencode nao reconhecido": {
        causa: "OpenCode nao instalado corretamente",
        solucao: [
          "1. Feche o WezTerm completamente",
          "2. Abra como administrador",
          "3. Execute: choco install opencode --force",
          "4. Digite Y quando perguntar",
          "5. Feche e abra o terminal novamente"
        ]
      },
      "ProviderInitError": {
        causa: "Configuracao corrompida",
        solucao: [
          "1. Abra o Explorador de Arquivos",
          "2. Na barra, cole: %USERPROFILE%\\.local\\share",
          "3. Delete a pasta 'opencode'",
          "4. Abra o OpenCode novamente",
          "5. Use /connect para reconectar"
        ]
      },
      "AI_APICallError": {
        causa: "Cache de provedores desatualizado",
        solucao: [
          "1. Abra o Explorador de Arquivos",
          "2. Na barra, cole: %USERPROFILE%\\.cache",
          "3. Delete a pasta 'opencode'",
          "4. Reinicie o OpenCode"
        ]
      },
      "tela preta": {
        causa: "Problema de renderizacao",
        solucao: [
          "1. Use o WezTerm (nao o Prompt de Comando)",
          "2. Tente: opencode --print-logs",
          "3. Atualize: opencode upgrade",
          "4. Se persistir, reinstale"
        ]
      },
      "chave invalida": {
        causa: "Chave de API incorreta ou expirada",
        solucao: [
          "1. Va ao site do provedor",
          "2. Gere uma nova chave",
          "3. Copie SEM espacos extras",
          "4. Use /connect no OpenCode",
          "5. Cole a nova chave"
        ]
      },
      "credential Claude": {
        causa: "Anthropic bloqueou uso em ferramentas terceiras",
        solucao: [
          "1. Este erro e normal - Anthropic restringiu o Claude",
          "2. Use outro modelo: GPT, Gemini, GLM",
          "3. Va em aistudio.google.com para chave Gemini",
          "4. Ou use opencode.ai/auth para OpenCode Zen"
        ]
      }
    }
  },
  mac: {
    node: {
      "command not found node": {
        causa: "Node.js nao instalado",
        solucao: [
          "1. Feche e reabra o Terminal/WezTerm",
          "2. Se persistir, va em nodejs.org",
          "3. Baixe a versao LTS para Mac",
          "4. Instale e reabra o terminal"
        ]
      },
      "EACCES": {
        causa: "Problema de permissao",
        solucao: [
          "1. No terminal, digite:",
          "   sudo chown -R $(whoami) ~/.npm",
          "2. Digite sua senha (nao aparece)",
          "3. Tente novamente"
        ]
      }
    },
    homebrew: {
      "command not found brew": {
        causa: "Homebrew nao instalado",
        solucao: [
          "1. Abra o Terminal",
          "2. Cole o comando de instalacao do Homebrew",
          "3. Digite sua senha quando pedido",
          "4. Execute os comandos de PATH que aparecem no final",
          "5. Feche e reabra o terminal"
        ]
      },
      "Xcode": {
        causa: "Ferramentas de desenvolvimento nao instaladas",
        solucao: [
          "1. No terminal, digite: xcode-select --install",
          "2. Clique 'Instalar' na janela que aparecer",
          "3. Aguarde o download (pode demorar)",
          "4. Tente novamente"
        ]
      }
    },
    opencode: {
      "command not found opencode": {
        causa: "OpenCode nao instalado",
        solucao: [
          "1. Feche e abra o terminal",
          "2. Execute: brew reinstall anomalyco/tap/opencode",
          "3. Feche e abra novamente"
        ]
      },
      "ProviderInitError": {
        causa: "Configuracao corrompida",
        solucao: [
          "1. No terminal: rm -rf ~/.local/share/opencode",
          "2. Abra o OpenCode novamente",
          "3. Use /connect para reconectar"
        ]
      }
    }
  }
}

// Funcao para buscar erro na base
export function findError(errorMessage: string, os: 'windows' | 'mac') {
  const osErrors = errorsDatabase[os]
  const lowerMessage = errorMessage.toLowerCase()
  
  for (const category of Object.values(osErrors)) {
    for (const [key, value] of Object.entries(category as Record<string, any>)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return value
      }
    }
  }
  
  return null
}

// Gerar prompt para escalar para outra IA
export function generateEscalationPrompt(
  error: string, 
  os: 'windows' | 'mac',
  module: number,
  attempts: string[]
) {
  return `Estou fazendo um curso para instalar o OpenCode (ferramenta de IA para terminal).

MEU SISTEMA: ${os === 'windows' ? 'Windows 10/11' : 'macOS'}

ONDE ESTOU: Modulo ${module}, instalacao/configuracao

O ERRO QUE APARECE:
${error}

O QUE JA TENTEI:
${attempts.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Por favor, me ajude a resolver passo a passo, explicando de forma simples como se eu nunca tivesse usado terminal antes.`
}
