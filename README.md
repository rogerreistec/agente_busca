<p align="center">
  <img src="./assets/logo-agente-busca.png" width="320" alt="Logo Agente Busca" />
</p>

# 🧑‍🔧 Agente Busca — Super App de Serviços

O **Agente Busca** é um super aplicativo projetado para conectar **clientes** a **prestadores de serviço** de forma rápida, inteligente e intuitiva.  
A plataforma permite criar pedidos, receber orçamentos gratuitos, comparar propostas, acompanhar o serviço e avaliar o profissional — tudo dentro do app.

Inspirado em modelos como **OLX**, **GetNinjas** e **Uber**, o Agente Busca traz:

- fluxo completo de orçamento → proposta → execução → finalização  
- ranking de prestadores baseado em desempenho  
- categorias organizadas  
- experiência simples e visual  

---

## 🚀 Status do Projeto

**Sprint Atual:** _Preparação do backend (Prisma + Auth + Categorias)_  
**Progresso:** Ambiente configurado · GitHub OK · Monorepo ativo · Copilot integrado

---

## ✨ Funcionalidades do MVP

### 👤 Cliente

- Cadastro e login  
- Criar pedidos com descrição e fotos  
- Receber **pré-orçamentos gratuitos**  
- Receber propostas detalhadas dos prestadores  
- Acompanhar o andamento do serviço  
- Avaliar prestador e serviço  

### 👨‍🔧 Prestador

- Cadastro com categorias e raio de atendimento  
- Receber pedidos compatíveis  
- Enviar pré-orçamento estilo "Tinder" (aceitar / pular)  
- Enviar propostas completas  
- Receber avaliações e subir no ranking  

### 🧠 Sistema

- Ranking de prestadores por desempenho  
- Categorias estilo OLX  
- Fluxo completo:  
  `requested → matched → scheduled → in_progress → delivered → completed`  
- Chat simples entre cliente e prestador (MVP)  
- Histórico de serviços  
- Autenticação moderna com tokens  

---

## 🛠️ Tecnologias Utilizadas

### **Backend**

- **AdonisJS 6**  
- **Prisma ORM** (em implementação)  
- **PostgreSQL**  
- Autenticação com API Tokens  
- Validação (ex.: Zod)  
- MVC + Services  

### **Frontend Web (planejado)**

- **Next.js 15**  
- TailwindCSS  
- TanStack Query  
- shadcn/UI  

### **Mobile (futuro MVP)**

- Expo / React Native  
- Expo Router  
- TanStack Query  

### **Infra & DevOps**

- Turborepo (monorepo)  
- pnpm  
- Docker (PostgreSQL e serviços)  
- GitHub Actions  
- SSH Keys + Versionamento  

---

## 🧱 Arquitetura do Projeto (planejada)

```text
agente-busca/
├── apps/
│   ├── api/        → Backend AdonisJS (já existe)
│   └── web/        → Frontend Next.js (planejado)
├── packages/
│   ├── ui/         → Componentes compartilhados (planejado)
│   ├── types/      → Tipos compartilhados (planejado)
│   └── config/     → ESLint, Tailwind, TS configs (planejado)
├── infra/
│   └── docker/     → Banco, Redis etc. (planejado)
├── assets/
│   └── logo-agente-busca.png
├── turbo.json      → Config do Turborepo (se aplicável)
├── pnpm-workspace.yaml
├── package.json
└── README.md
Algumas pastas ainda serão criadas ao longo das sprints (packages, web, infra).

📅 Roadmap Oficial (Sprints)
✅ Sprint 0 — Ambiente & Setup (CONCLUÍDA)
Ambiente Linux + VSCode

Git + SSH + GitHub

Repositório agente_busca criado

Estrutura base com apps/

AdonisJS API criada e rodando

🟠 Sprint 1 — Backend Base (ATUAL)
PostgreSQL + Prisma configurados

Schema inicial: User e Category

Migrations rodando

Auth (registro + login com tokens)

Seeds de categorias base

🔜 Sprint 2 — Pedidos
Criar pedidos

Upload de imagens

Listagens do cliente

Filtros básicos

🔜 Sprint 3 — Prestadores & Pré-Orçamentos
Onboarding do prestador

Cadastro de categorias

Pré-orçamento estilo "Tinder"

🔜 Sprint 4 — Propostas & Jobs
Proposta completa

Workflow de job

Histórico

🔜 Sprint 5 — Chat & Acompanhamento
Chat básico

Notificações locais (MVP)

🔜 Sprint 6 — Avaliações & Ranking
Sistema de avaliação

Ranking global

Ordenação por score

🔜 Sprint 7 — Deploy
API na Railway/Fly.io

Web na Vercel

Banco na Neon

Variáveis de ambiente

Testes finais

▶️ Como Rodar Localmente
1️⃣ Instalar dependências
Na raiz do projeto:

bash
Copiar código
pnpm install
2️⃣ Rodar a API
bash
Copiar código
cd apps/api
pnpm dev
API disponível (padrão AdonisJS):

text
Copiar código
http://localhost:3333
3️⃣ (Opcional) Rodar o Frontend Web
Apenas quando o apps/web estiver criado.

bash
Copiar código
cd apps/web
pnpm dev
4️⃣ Configurar Banco de Dados (PostgreSQL + Prisma)
Na pasta apps/api, crie o arquivo .env:

env
Copiar código
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agente_busca"
Depois, rode as migrações (quando o Prisma estiver configurado):

bash
Copiar código
cd apps/api
pnpm prisma:migrate
🤝 Contribuindo
Faça um fork do repositório

Crie uma branch: feature/minha-ideia

Faça seus commits

Abra um Pull Request

📜 Licença
Licença MIT — livre para uso e modificação.

<p align="center"> Desenvolvido com ❤️ por <strong>Roger Reis</strong> </p> ```