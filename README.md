<p align="center">
  <img src="./assets/logo-agente-busca.png" width="320" alt="Logo Agente Busca" />
</p>

# 🧑‍🔧 Agente Busca — Super App de Serviços

O **Agente Busca** é um super aplicativo criado para conectar **clientes** a **prestadores de serviço** de forma rápida, inteligente e organizada.

A plataforma permite que o usuário:
- Crie pedidos de serviço
- Receba orçamentos gratuitos
- Compare propostas
- Acompanhe o andamento
- Avalie o profissional

Inspirado em plataformas como **OLX**, **GetNinjas** e **Uber**, o Agente Busca unifica tudo em uma única experiência moderna.

---

## 🚀 Status do Projeto

**Sprint atual:** Backend Base  
**Status:** 🟢 Em desenvolvimento ativo

✔ Ambiente configurado  
✔ Monorepo funcionando  
✔ Autenticação com tokens  
✔ Prisma configurado  
✔ API rodando corretamente  

---

## ✨ Funcionalidades do MVP

### 👤 Cliente
- Cadastro e login
- Criar pedidos com descrição
- Receber pré-orçamentos
- Receber propostas
- Acompanhar serviços
- Avaliar prestadores

### 👨‍🔧 Prestador
- Cadastro por categoria
- Receber pedidos compatíveis
- Enviar pré-orçamentos
- Enviar propostas completas
- Receber avaliações
- Subir no ranking

### 🧠 Sistema
- Autenticação com token
- Middleware de proteção
- Ranking por desempenho
- Categorias organizadas
- Fluxo completo de serviço:
requested → matched → scheduled → in_progress → delivered → completed

markdown
Copiar código
- Chat básico (MVP)

---

## 🛠️ Tecnologias Utilizadas

### 🔧 Backend
- **AdonisJS 6**
- **Prisma ORM**
- **PostgreSQL**
- **Autenticação com Token**
- **Validações**
- **MVC + Services**

### 🌐 Frontend (Planejado)
- **Next.js 15**
- **TailwindCSS**
- **TanStack Query**
- **shadcn/ui**

### 📱 Mobile (Futuro)
- **Expo**
- **React Native**
- **Expo Router**

### ⚙ Infra & DevOps
- **Turborepo**
- **pnpm**
- **Docker**
- **GitHub Actions**
- **PostgreSQL**
- **SSH + GitHub**

---

## 🧱 Estrutura do Projeto

agente-busca/
├── apps/
│ ├── api/ # Backend AdonisJS
│ └── web/ # Frontend Next.js (futuro)
├── packages/
│ ├── ui/ # Componentes compartilhados
│ ├── types/ # Tipagens globais
│ └── config/ # Configurações comuns
├── infra/
│ └── docker/ # Banco e serviços
├── assets/
│ └── logo-agente-busca.png
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md

markdown
Copiar código

---

## 📅 Roadmap Oficial

### ✅ Sprint 0 — Setup
- Ambiente Linux
- Git + GitHub
- Monorepo
- API Adonis criada

### 🟠 Sprint 1 — Backend Base (ATUAL)
- Prisma + PostgreSQL
- Auth (login / logout)
- Middleware de autenticação
- Categorias
- Tokens funcionando

### 🔜 Sprint 2 — Pedidos
- Criar pedidos
- Upload de imagens
- Listagens

### 🔜 Sprint 3 — Prestadores
- Cadastro
- Pré-orçamento
- Matching

### 🔜 Sprint 4 — Propostas
- Proposta completa
- Fluxo de job

### 🔜 Sprint 5 — Chat
- Chat básico
- Notificações

### 🔜 Sprint 6 — Avaliação & Ranking
- Sistema de avaliação
- Ranking global

### 🔜 Sprint 7 — Deploy
- API (Railway / Fly.io)
- Web (Vercel)
- Banco (Neon)
- CI/CD

---

## ▶️ Como Rodar Localmente

### 1️⃣ Instalar dependências
```bash
pnpm install
2️⃣ Rodar a API
bash
Copiar código
cd apps/api
pnpm dev
A API ficará disponível em:

arduino
Copiar código
http://localhost:3333
3️⃣ Configurar Banco de Dados
Crie o arquivo .env em apps/api:

env
Copiar código
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agente_busca"
Rodar migrações:

bash
Copiar código
pnpm prisma migrate dev
🤝 Contribuição
Fork o projeto

Crie uma branch:

bash
Copiar código
git checkout -b feature/minha-feature
Commit suas alterações

Envie um Pull Request

📜 Licença
MIT License — livre para uso e modificação.

<p align="center"> Desenvolvido com ❤️ por <strong>Roger Reis</strong> </p> ```
