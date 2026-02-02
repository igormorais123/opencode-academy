// Base de dados de erros conhecidos para o Coach IA - Claude Code
// INTEIA Academy - Prof. Igor Morais Vasconcelos

export const claudeCodeErrorsDatabase = {
  windows: {
    node: {
      "node nao reconhecido": {
        causa: "Node.js nao instalado ou terminal nao reaberto",
        solucao: [
          "1. Feche e abra o VS Code",
          "2. Se nao resolver, reinstale o Node.js de nodejs.org",
          "3. Escolha a versao LTS",
          "4. Durante instalacao, certifique-se que 'Add to PATH' esta marcado",
          "5. Reinicie o VS Code novamente"
        ]
      },
      "npm not found": {
        causa: "npm nao instalado (vem junto com o Node.js)",
        solucao: [
          "1. Reinstale o Node.js de nodejs.org",
          "2. O npm ja vem incluso",
          "3. Feche e abra o VS Code apos instalar"
        ]
      },
      "EACCES permission": {
        causa: "Precisa de permissao de administrador",
        solucao: [
          "1. Feche o VS Code",
          "2. Clique com botao direito no icone do VS Code",
          "3. Selecione 'Executar como administrador'",
          "4. Tente o comando novamente"
        ]
      }
    },
    claude: {
      "command not found: claude": {
        causa: "Claude Code nao instalado ou PATH nao configurado",
        solucao: [
          "1. Feche e abra o VS Code",
          "2. No terminal, execute: npm install -g @anthropic-ai/claude-code",
          "3. Aguarde terminar",
          "4. Tente 'claude' novamente"
        ]
      },
      "invalid_api_key": {
        causa: "Chave de API invalida ou expirada",
        solucao: [
          "1. Acesse console.anthropic.com",
          "2. Va em API Keys",
          "3. Crie uma nova chave",
          "4. Copie SEM espacos",
          "5. Configure novamente no terminal"
        ]
      },
      "rate_limit_exceeded": {
        causa: "Voce fez muitas requisicoes em pouco tempo",
        solucao: [
          "1. Aguarde 1-2 minutos",
          "2. Tente novamente",
          "3. Se persistir, use /model haiku (modelo mais leve)",
          "4. Ou aguarde mais tempo entre pedidos"
        ]
      },
      "insufficient_quota": {
        causa: "Creditos da API acabaram",
        solucao: [
          "1. Acesse console.anthropic.com",
          "2. Va em Billing",
          "3. Adicione mais creditos",
          "4. Ou considere o plano Max para uso ilimitado"
        ]
      },
      "context window exceeded": {
        causa: "A conversa ficou muito longa",
        solucao: [
          "1. Use /clear para limpar a conversa",
          "2. Comece um novo pedido do zero",
          "3. Tente ser mais especifico no pedido",
          "4. Divida tarefas grandes em partes menores"
        ]
      },
      "permission denied": {
        causa: "O Claude tentou acessar algo sem permissao",
        solucao: [
          "1. Quando o Claude pedir permissao, leia com atencao",
          "2. Digite Y para aceitar ou N para recusar",
          "3. Se recusou sem querer, faca o pedido novamente"
        ]
      },
      "file not found": {
        causa: "O arquivo que voce mencionou nao existe",
        solucao: [
          "1. Verifique se o nome do arquivo esta correto",
          "2. Verifique se voce esta na pasta certa",
          "3. Use @nomedoarquivo para referenciar",
          "4. Peca ao Claude: 'liste os arquivos desta pasta'"
        ]
      },
      "ECONNREFUSED": {
        causa: "Problema de conexao com a internet",
        solucao: [
          "1. Verifique sua internet",
          "2. Se em rede corporativa, pode ser bloqueio de firewall",
          "3. Tente desconectar e reconectar o Wi-Fi",
          "4. Tente novamente em alguns minutos"
        ]
      },
      "authentication failed": {
        causa: "Problema no login da conta Anthropic",
        solucao: [
          "1. Execute: claude logout",
          "2. Depois: claude login",
          "3. Siga as instrucoes para fazer login novamente",
          "4. Se usar API key, verifique se esta correta"
        ]
      }
    }
  },
  mac: {
    node: {
      "command not found node": {
        causa: "Node.js nao instalado",
        solucao: [
          "1. Feche e reabra o VS Code",
          "2. Se persistir, va em nodejs.org",
          "3. Baixe a versao LTS para Mac",
          "4. Instale e reabra o VS Code"
        ]
      },
      "EACCES": {
        causa: "Problema de permissao no Mac",
        solucao: [
          "1. Use sudo antes do comando",
          "2. Exemplo: sudo npm install -g @anthropic-ai/claude-code",
          "3. Digite sua senha (nao aparece enquanto digita)",
          "4. Tente novamente"
        ]
      }
    },
    claude: {
      "command not found claude": {
        causa: "Claude Code nao instalado",
        solucao: [
          "1. Feche e abra o VS Code",
          "2. Execute: sudo npm install -g @anthropic-ai/claude-code",
          "3. Digite sua senha",
          "4. Tente 'claude' novamente"
        ]
      },
      "invalid_api_key": {
        causa: "Chave de API invalida",
        solucao: [
          "1. Acesse console.anthropic.com",
          "2. Crie uma nova API key",
          "3. Configure: export ANTHROPIC_API_KEY=sua-chave",
          "4. Tente novamente"
        ]
      },
      "EACCES npm global": {
        causa: "Permissao negada para instalar globalmente",
        solucao: [
          "1. No terminal, execute:",
          "   sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}",
          "2. Digite sua senha",
          "3. Tente instalar novamente sem sudo"
        ]
      }
    }
  }
}

// Funcao para buscar erro na base do Claude Code
export function findClaudeCodeError(errorMessage: string, os: 'windows' | 'mac') {
  const osErrors = claudeCodeErrorsDatabase[os]
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
