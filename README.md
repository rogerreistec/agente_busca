<p align="center">
  <img src="./assets/logo-agente-busca.png" alt="Agente Busca" width="180"/>
</p>

<h1 align="center">🧑‍🔧 Agente Busca</h1>

<<<<<<< HEAD
O **Agente Busca** é um super aplicativo criado para conectar **clientes** a **prestadores de serviço** de forma rápida, inteligente e organizada.

A plataforma permite que o usuário:
- Crie pedidos de serviço
- Receba orçamentos gratuitos
- Compare propostas
- Acompanhe o andamento
- Avalie o profissional

Inspirado em plataformas como **OLX**, **GetNinjas** e **Uber**, o Agente Busca unifica tudo em uma única experiência moderna.
=======
<p align="center">
  Plataforma inteligente para conectar clientes a prestadores de serviços de forma rápida, segura e organizada.
</p>
>>>>>>> d0e59098 (docs: update README)

---

## 🚀 Sobre o Projeto

<<<<<<< HEAD
**Sprint atual:** Backend Base  
**Status:** 🟢 Em desenvolvimento ativo

✔ Ambiente configurado  
✔ Monorepo funcionando  
✔ Autenticação com tokens  
✔ Prisma configurado  
✔ API rodando corretamente  
=======
O **Agente Busca** é um **super app de serviços**, inspirado em soluções como **GetNinjas, OLX e Uber**, criado para facilitar:

- Solicitação de serviços
- Envio de propostas
- Acompanhamento do atendimento
- Avaliação de prestadores
- Ranking por desempenho

Tudo isso com **backend robusto**, **autenticação segura**, e arquitetura pronta para escalar.
>>>>>>> d0e59098 (docs: update README)

---

## 🧠 Status Atual do Projeto

<<<<<<< HEAD
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
=======
✅ **Sprint 0 — Concluída**  
✅ Ambiente configurado  
✅ Monorepo estruturado  
✅ API rodando  
✅ PostgreSQL conectado  
✅ Prisma funcionando  
✅ Autenticação completa (login, logout, me)  
✅ Middleware funcional  
✅ Tokens persistidos no banco  

🟡 **Sprint Atual:** Backend base finalizado  
🟢 **Próximo passo:** Pedidos + Prestadores  

---

## 🧱 Arquitetura do Projeto

agente-busca/
├── apps/
│ └── api/ # Backend AdonisJS
│ ├── app/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── services/
│ │ └── models/
│ ├── prisma/
│ ├── start/
│ ├── .env
│ └── server.ts
│
├── assets/
│ └── logo-agente-busca.png
│
├── package.json
├── pnpm-workspace.yaml
└── README.md

yaml
Copiar código
>>>>>>> d0e59098 (docs: update README)

---

## 🛠️ Tecnologias Utilizadas

<<<<<<< HEAD
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
=======
### Backend
- **AdonisJS 6**
- **Prisma ORM**
- **PostgreSQL**
- **Autenticação via Token**
- **TypeScript**

### Infra
- Docker (DB)
- pnpm
- Monorepo
- GitHub

---

## 🔐 Autenticação (100% Funcional)

### ✅ Login
`POST /auth/login`

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
📥 Retorno:

json
Copiar código
{
  "success": true,
  "data": {
    "token": "SEU_TOKEN_AQUI"
  }
}
✅ Logout
POST /auth/logout

🔐 Header:

makefile
Copiar código
Authorization: Bearer SEU_TOKEN
✅ Usuário Autenticado
GET /auth/me

🔐 Header:

makefile
Copiar código
Authorization: Bearer SEU_TOKEN
📤 Retorno:

json
Copiar código
{
  "success": true,
  "message": "Usuário autenticado",
  "data": {
    "id": "...",
    "name": "Usuário Teste",
    "email": "email@email.com",
    "createdAt": "2026-01-17T21:43:50.162Z"
  }
}
🧩 Banco de Dados
Tabelas atuais:
User

UserToken

Category

_prisma_migrations

Exemplo: UserToken
Campo	Tipo
id	text
userId	text
type	auth
hash	text
expiresAt	timestamp
createdAt	timestamp

▶️ Como Rodar o Projeto
1️⃣ Instalar dependências
bash
Copiar código
pnpm install
2️⃣ Configurar o banco
Arquivo .env:

env
Copiar código
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/agente_busca"
3️⃣ Rodar migrações
bash
Copiar código
pnpm prisma migrate dev
4️⃣ Iniciar API
bash
Copiar código
cd apps/api
pnpm dev
📍 API disponível em:

arduino
Copiar código
http://localhost:3333
📌 Roadmap
✅ Sprint 1 — Backend Base
Auth completa

Middleware funcional

Prisma OK

Tokens persistidos

🔜 Sprint 2 — Pedidos
Criar pedidos

Upload de imagens

Listagem por usuário

🔜 Sprint 3 — Prestadores
Cadastro

Categorias

Match automático

🔜 Sprint 4 — Propostas
Envio de propostas

Workflow de serviço

🔜 Sprint 5 — Chat
Comunicação cliente ↔ prestador

🔜 Sprint 6 — Ranking
Avaliação

Score

Destaque

🤝 Contribuição
Fork o projeto

Crie uma branch:

bash
Copiar código
git checkout -b feature/minha-feature
Commit:

bash
Copiar código
git commit -m "feat: nova funcionalidade"
Push:

bash
Copiar código
git push origin feature/minha-feature
📜 Licença
MIT License — uso livre para estudos e projetos.
>>>>>>> d0e59098 (docs: update README)

<p align="center"> Desenvolvido com ❤️ por <strong>Roger Reis</strong> </p> ```
