# OpenCode Academy

Curso interativo para iniciantes aprenderem a usar o OpenCode - a ferramenta de programacao assistida por IA.

**Criado por:** Prof. Igor Morais Vasconcelos - INTEIA (Instituto de Treinamento e Estudos em IA)

## Sobre o Projeto

O OpenCode Academy e um curso online interativo projetado para pessoas sem experiencia em programacao (juristas, servidores publicos, pessoas 65+) aprenderem a usar o OpenCode de forma pratica e guiada.

### Caracteristicas

- **8 modulos** de conteudo progressivo
- **30+ licoes** com micro-passos confirmados
- **Coach IA** integrado (Google Gemini) com base de 35+ erros conhecidos
- **Gamificacao** com confete e celebracoes
- **Adaptativo** para Windows e Mac
- **Login com Google** OAuth
- **Design Apple-style** limpo e acessivel

## Stack Tecnologica

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Estilizacao:** Tailwind CSS, shadcn/ui
- **Autenticacao:** NextAuth.js com Google OAuth
- **Banco de Dados:** Prisma com SQLite (dev) / compativel com Turso, PlanetScale
- **IA:** Google Gemini Flash
- **Deploy:** Vercel

## Desenvolvimento Local

### Pre-requisitos

- Node.js 18+
- npm ou yarn

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/igormorais123/opencode-academy.git
cd opencode-academy

# Instale as dependencias
npm install

# Copie o arquivo de ambiente
cp .env.example .env

# Configure as variaveis no .env (veja abaixo)

# Gere o cliente Prisma e crie o banco
npx prisma generate
npx prisma db push

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## Configuracao das Variaveis de Ambiente

### 1. Google OAuth (Login)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto ou selecione existente
3. Va em "APIs e Servicos" > "Credenciais"
4. Clique "Criar credenciais" > "ID do cliente OAuth"
5. Tipo: "Aplicativo da Web"
6. Adicione URIs de redirecionamento:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://seu-site.vercel.app/api/auth/callback/google` (prod)
7. Copie o **Client ID** e **Client Secret** para o `.env`

### 2. Google Gemini (Coach IA)

1. Acesse [Google AI Studio](https://aistudio.google.com)
2. Clique em "Get API Key"
3. Crie uma nova chave
4. Copie para `GOOGLE_AI_API_KEY` no `.env`

### 3. NextAuth Secret

Gere uma chave secreta:
```bash
openssl rand -base64 32
```
Copie para `NEXTAUTH_SECRET` no `.env`

## Deploy na Vercel

### Opcao 1: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faca login
2. Clique "Add New" > "Project"
3. Importe o repositorio `opencode-academy` do GitHub
4. Configure as variaveis de ambiente:
   - `DATABASE_URL` = `file:./dev.db` (ou Turso/PlanetScale para prod)
   - `NEXTAUTH_URL` = deixe vazio (Vercel preenche automaticamente)
   - `NEXTAUTH_SECRET` = sua chave secreta
   - `GOOGLE_CLIENT_ID` = seu client ID
   - `GOOGLE_CLIENT_SECRET` = seu client secret
   - `GOOGLE_AI_API_KEY` = sua chave Gemini
   - `ADMIN_EMAIL` = igormorais123@gmail.com
5. Clique "Deploy"

### Opcao 2: Via CLI

```bash
# Login na Vercel
vercel login

# Deploy
vercel --prod
```

### Apos o Deploy

1. Copie a URL do deploy (ex: `https://opencode-academy.vercel.app`)
2. Volte ao Google Cloud Console
3. Adicione a URL de callback nas credenciais OAuth:
   `https://opencode-academy.vercel.app/api/auth/callback/google`

## Estrutura do Projeto

```
opencode-academy/
├── prisma/
│   └── schema.prisma      # Schema do banco de dados
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── curso/         # Paginas do curso
│   │   ├── login/         # Pagina de login
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   ├── coach/         # Coach IA
│   │   ├── course/        # Componentes do curso
│   │   ├── providers/     # Context providers
│   │   └── ui/            # shadcn/ui components
│   ├── content/
│   │   ├── modules.ts     # Conteudo dos 8 modulos
│   │   └── errors-database.ts  # Base de erros conhecidos
│   └── lib/
│       ├── auth.ts        # Configuracao NextAuth
│       └── prisma.ts      # Cliente Prisma
├── .env.example           # Template de variaveis
├── vercel.json            # Configuracao Vercel
└── package.json
```

## Modulos do Curso

0. **O Superpoder** - Por que IA vai transformar seu trabalho
1. **O que e o OpenCode?** - Conhecendo a ferramenta
2. **Preparando seu Computador** - Instalando VS Code e Git
3. **Instalando o OpenCode** - Extensao e configuracao
4. **Sua Primeira Conversa** - Usando a IA pela primeira vez
5. **Criando seu Primeiro Projeto** - Mao na massa
6. **Editando e Evoluindo** - Refinando com a IA
7. **Proximos Passos** - Continuando a jornada

## Licenca

Todos os direitos reservados - INTEIA 2024

---

Desenvolvido com Claude Code
