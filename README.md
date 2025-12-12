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
- Enviar pré-orçamento estilo "Tinder" (aceitar/pular)  
- Enviar propostas completas  
- Receber avaliações e subir no ranking  

### 🧠 Sistema
- Ranking de prestadores por desempenho  
- Categorias estilo OLX  
- Fluxo completo: **requested → matched → scheduled → in_progress → delivered → completed**  
- Chat simples entre cliente e prestador (MVP)  
- Histórico de serviços  
- Autenticação moderna com tokens  

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **AdonisJS 6**  
- **Prisma ORM**  
- **PostgreSQL**  
- Autenticação com Tokens  
- Validação com Zod  
- MVC + Services  

### **Frontend Web**
- **Next.js 15**  
- TailwindCSS  
- TanStack Query  
- shadcn/UI  

### **Mobile (Futuro MVP)**
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

## 🧱 Arquitetura do Projeto

agente-busca/
├── apps/
│ ├── api/ → Backend AdonisJS
│ └── web/ → Frontend Next.js
├── packages/
│ ├── ui/ → Componentes compartilhados
│ ├── types/ → Tipos compartilhados
│ └── config/ → ESLint, Tailwind, TS configs
├── infra/
│ └── docker/ → Banco, redis (futuro)
├── assets/
│ └── logo-agente-busca.png
├── turbo.json
├── package.json
└── README.md

yaml
Copiar código

---

## 📅 Roadmap Oficial (Sprints)

### **Sprint 0 — OK**
✔️ Ambiente Linux + VSCode  
✔️ Git + SSH + GitHub  
✔️ Turborepo configurado  
✔️ API e Web rodando  
✔️ Copilot funcionando  

---

### **Sprint 1 — Backend Base (Atual)**
🔸 PostgreSQL + Prisma  
🔸 Schema inicial: User e Category  
🔸 Migrations  
🔸 Auth (registro + login)  
🔸 Seeds de categorias  

---

### **Sprint 2 — Pedidos**
🔸 Criar pedidos  
🔸 Upload de imagens  
🔸 Listagens do cliente  
🔸 Filtros básicos  

---

### **Sprint 3 — Prestadores & Pré-Orçamentos**
🔸 Onboarding do prestador  
🔸 Cadastro de categorias  
🔸 Pré-orçamento estilo "Tinder"  

---

### **Sprint 4 — Propostas & Jobs**
🔸 Proposta completa  
🔸 Workflow de job  
🔸 Histórico  

---

### **Sprint 5 — Chat & Acompanhamento**
🔸 Chat básico  
🔸 Notificações locais (MVP)  

---

### **Sprint 6 — Avaliações & Ranking**
🔸 Avaliação  
🔸 Ranking global  
🔸 Ordenação por score  

---

### **Sprint 7 — Deploy**
🔸 API na Railway/Fly.io  
🔸 Web na Vercel  
🔸 Banco na Neon  
🔸 Env configs  
🔸 Testes finais  

---

## ▶️ Como Rodar Localmente

### 1️⃣ Instalar dependências
```bash
pnpm install
2️⃣ Rodar API
bash
Copiar código
cd apps/api
pnpm dev
3️⃣ Rodar Web
bash
Copiar código
cd apps/web
pnpm dev
4️⃣ Configurar Banco
Crie o arquivo .env na pasta apps/api:

ini
Copiar código
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agente_busca"
Rodar migração:

bash
Copiar código
pnpm prisma:migrate
🤝 Contribuindo
Fork o repositório

Crie uma branch: feature/minha-ideia

Commit suas mudanças

Abra um Pull Request

📜 Licença
MIT — Livre para uso e modificação.

<p align="center"> Desenvolvido com ❤️ por <strong>Roger Reis</strong> </p> ```