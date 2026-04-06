<h1 align="center">
  <br>
  <img src="https://img.shields.io/badge/-BankChallenge-1d4ed8?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlV2lkdGg9MS41IHN0cm9rZT0id2hpdGUiPjxwYXRoIHN0cm9rZUxpbmVjYXA9InJvdW5kIiBzdHJva2VMaW5lam9pbj0icm91bmQiIGQ9Ik0xMiAyMXYtOC4yNU0xNS43NSAyMXYtOC4yNU04LjI1IDIxdi04LjI1TTMgOWw5LTYgOSA2bS0xLjUgMTJWMTAuMzMyQTQ4LjM2IDQ4LjM2IDAgMDExMiA5Ljc1Yy0yLjU1MSAwLTUuMDU2LjItNy41LjU4MlYyMU0zIDIxaDE4TTEyIDYuNzVoLjAwOHYuMDA4SDEyVjYuNzV6IiAvPjwvc3ZnPg==&logoColor=white" alt="BankChallenge">
  <br>
  BankChallenge
  <br>
</h1>

<h4 align="center">Plataforma bancária fullstack com autenticação JWT, gestão de contas e transações financeiras.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-como-rodar">Como Rodar</a> •
  <a href="#-uso-da-plataforma">Uso da Plataforma</a> •
  <a href="#-api">API</a> •
  <a href="#-arquitetura">Arquitetura</a>
</p>

---

## ✨ Features

- 🔐 **Autenticação JWT** — registro, login e sessão persistente com token de 7 dias
- 🏦 **Gestão de contas bancárias** — criar, visualizar e remover contas com número único
- 💸 **Transações financeiras** — depósito, saque e transferência entre contas com validação de saldo
- 📊 **Dashboard em tempo real** — resumo de movimentações e histórico recente
- 🔒 **Rotas protegidas** — todas as operações exigem autenticação
- 📚 **Swagger/OpenAPI** — documentação interativa da API
- 🐳 **Docker-ready** — stack completa com docker-compose em um comando

---

## 🖥️ Screenshots

### Login & Registro

> Autenticação com validação de formulário em tempo real, feedback de erro inline e navegação entre telas.

| Login | Registro |
|-------|----------|
| ![Login](docs/screenshots/login.png) | ![Registro](docs/screenshots/register.png) |

---

### Dashboard

> Visão geral com cards de resumo financeiro e tabela das transações mais recentes.

![Dashboard](docs/screenshots/dashboard.png)

---

### Gestão de Contas

> Listagem de contas com saldo, contador de transações e modal para criar nova conta com validação de número no formato `XXXXXX-X`.

![Contas](docs/screenshots/accounts.png)

---

### Transações

> Histórico completo de movimentações com filtros, badges coloridos por tipo e modais de depósito, saque e transferência.

![Transações](docs/screenshots/transactions.png)

---

> 💡 **Dica para o portfólio:** substitua os arquivos em `docs/screenshots/` com prints reais da aplicação rodando.

---

## 🛠️ Stack

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| [NestJS](https://nestjs.com/) | 10 | Framework HTTP |
| [Prisma ORM](https://www.prisma.io/) | 5 | Acesso ao banco de dados |
| [PostgreSQL](https://www.postgresql.org/) | 16 | Banco de dados relacional |
| [Passport JWT](https://github.com/mikenicholson/passport-jwt) | 4 | Autenticação com JWT |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2 | Hash de senhas |
| [class-validator](https://github.com/typestack/class-validator) | 0.14 | Validação de DTOs |
| [Swagger](https://swagger.io/) | 7 | Documentação da API |

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Vite](https://vitejs.dev/) | 7 | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Estilização |
| [TanStack Query](https://tanstack.com/query) | 5 | Cache e server state |
| [React Hook Form](https://react-hook-form.com/) | 7 | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | 3 | Validação de schemas |
| [React Router](https://reactrouter.com/) | 6 | Roteamento client-side |
| [Axios](https://axios-http.com/) | 1 | HTTP client |

### DevOps
| Tecnologia | Uso |
|---|---|
| Docker + Docker Compose | Containerização completa |
| Nginx | Servidor de produção para o frontend (SPA fallback) |
| GitHub Actions | CI/CD com testes e build |

---

## 🚀 Como Rodar

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose
- [Node.js 20+](https://nodejs.org/) (apenas para desenvolvimento local)
- [Git](https://git-scm.com/)

---

### Opção 1 — Docker (recomendado)

Sobe toda a stack (banco, API e frontend) com um único comando:

```bash
git clone https://github.com/seu-usuario/bank-challenge.git
cd bank-challenge
docker-compose up -d
```

Aguarde os healthchecks e acesse:

| Serviço | URL |
|---|---|
| 🌐 Frontend | http://localhost |
| 🔌 API | http://localhost:3000/api |
| 📚 Swagger | http://localhost:3000/api/docs |

---

### Opção 2 — Desenvolvimento Local

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/bank-challenge.git
cd bank-challenge
```

**2. Suba apenas o banco de dados**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**3. Configure e suba o backend**
```bash
cd backend
cp .env.example .env   # edite se necessário
npm install
npm run start:dev
```

**4. Configure e suba o frontend** (em outro terminal)
```bash
cd frontend
cp .env.example .env   # edite se necessário
npm install
npm run dev
```

| Serviço | URL |
|---|---|
| 🌐 Frontend | http://localhost:5173 |
| 🔌 API | http://localhost:3000/api |
| 📚 Swagger | http://localhost:3000/api/docs |

---

### Variáveis de Ambiente

**`backend/.env`**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_challenge"
JWT_SECRET="seu_secret_aqui"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📖 Uso da Plataforma

### 1. Criar conta de acesso

Acesse `/register` e preencha nome, e-mail e senha (mínimo 6 caracteres). Após o registro, você é redirecionado automaticamente para o dashboard.

### 2. Criar uma conta bancária

No menu **Contas**, clique em **Nova Conta** e informe:
- **Titular** — nome do correntista
- **Número** — no formato `XXXXXX-X` (ex: `123456-7`)

### 3. Realizar transações

No menu **Transações**, escolha a operação:

| Operação | Descrição |
|---|---|
| **Depósito** | Adiciona saldo a uma conta |
| **Saque** | Remove saldo (valida se há saldo suficiente) |
| **Transferência** | Move saldo entre duas contas atomicamente |

### 4. Acompanhar o Dashboard

O **Dashboard** exibe em tempo real:
- Total de contas cadastradas
- Soma de depósitos, saques e transferências
- Tabela das últimas 8 transações

---

## 📡 API

A API segue REST com todas as respostas no formato:

```json
{
  "data": { },
  "timestamp": "2026-04-06T22:00:00.000Z"
}
```

Erros seguem o padrão:
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Saldo insuficiente",
  "path": "/api/transactions/withdraw",
  "timestamp": "2026-04-06T22:00:00.000Z"
}
```

### Endpoints

#### Auth
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registrar usuário | ❌ |
| `POST` | `/api/auth/login` | Autenticar | ❌ |
| `GET` | `/api/auth/me` | Dados do usuário logado | ✅ |

#### Contas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/accounts` | Criar conta | ✅ |
| `GET` | `/api/accounts` | Listar contas | ✅ |
| `GET` | `/api/accounts/:id` | Detalhe da conta | ✅ |
| `DELETE` | `/api/accounts/:id` | Remover conta | ✅ |

#### Transações
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/transactions/deposit` | Depositar | ✅ |
| `POST` | `/api/transactions/withdraw` | Sacar | ✅ |
| `POST` | `/api/transactions/transfer` | Transferir | ✅ |
| `GET` | `/api/transactions` | Listar transações | ✅ |
| `GET` | `/api/transactions/summary` | Resumo financeiro | ✅ |
| `GET` | `/api/transactions/:id` | Detalhe da transação | ✅ |

> Documentação interativa completa disponível em `/api/docs` (Swagger UI).

---

## 🏗️ Arquitetura

```
BankChallenge/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── auth/               # JWT, guards, strategies
│   │   ├── users/              # Módulo de usuários
│   │   ├── accounts/           # CRUD de contas
│   │   ├── transactions/       # Depósito, saque, transferência
│   │   ├── health/             # Health check endpoint
│   │   ├── prisma/             # PrismaService (global)
│   │   └── common/             # Filter global + Transform interceptor
│   └── prisma/
│       ├── schema.prisma       # User, Account, Transaction
│       └── migrations/
│
├── frontend/                   # React SPA
│   └── src/
│       ├── contexts/           # AuthContext (JWT + localStorage)
│       ├── pages/              # Login, Register, Dashboard, Accounts, Transactions
│       ├── components/         # Layout, UI (Button, Input, Card, Modal...)
│       ├── hooks/              # useAccounts, useTransactions (React Query)
│       ├── services/api.ts     # Axios + interceptors JWT
│       └── types/              # Interfaces TypeScript
│
├── docker-compose.yml          # Stack completa (db + api + web)
├── docker-compose.dev.yml      # Apenas PostgreSQL para dev local
└── .github/workflows/ci.yml   # CI/CD: test, build, docker
```

### Fluxo de autenticação

```
Login/Register → API retorna JWT
      ↓
localStorage (token + user)
      ↓
Axios interceptor injeta Authorization: Bearer <token>
      ↓
Backend JwtAuthGuard valida em todas as rotas protegidas
      ↓
401 → interceptor redireciona para /login
```

### Fluxo de transação

```
Frontend (React Hook Form + Zod)
    ↓ validação client-side
API Controller
    ↓ ValidationPipe (class-validator)
TransactionsService
    ↓ prisma.$transaction([...])  ← atômico
Atualiza balance das contas + cria registro de Transaction
    ↓
TransformInterceptor empacota resposta { data, timestamp }
```

---

## 🧪 Testes

```bash
cd backend
npm test              # unit tests
npm run test:cov      # com cobertura
npm run test:e2e      # end-to-end
```

---

## 📄 Licença

MIT © [Gabriel Correia](https://github.com/seu-usuario)
