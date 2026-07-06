# 📘 A.P.S. — Acervo de Projetos Senac

<p align="center">
  <img src="https://github.com/user-attachments/assets/0e8a5e23-7c39-4304-811c-8d0ee9dc98fd" alt="APS Logo" width="400">
</p>

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?logo=mysql)

---

# 📌 Sobre o Projeto

O A.P.S. (Acervo de Projetos Senac) é uma plataforma desenvolvida para armazenar, organizar e acompanhar projetos acadêmicos desenvolvidos por alunos do Senac.

O sistema foi criado com o objetivo de preservar o conhecimento produzido nos Projetos Integradores, permitindo o registro e acompanhamento das iniciativas desenvolvidas pelos estudantes, além de facilitar a comunicação entre alunos, professores e coordenação.

---

# 🎯 Objetivos

* Centralizar informações sobre projetos acadêmicos.
* Facilitar o acompanhamento dos projetos desenvolvidos pelos alunos.
* Disponibilizar uma base organizada para futuras consultas.
* Aplicar conceitos de desenvolvimento Full Stack utilizando tecnologias modernas.
* Integrar frontend, backend e banco de dados em uma única aplicação.

---

# 👥 Perfis de Usuário

O sistema possui três perfis principais:

### 👨‍🎓 Aluno

* Cadastro na plataforma.
* Login no sistema.
* Acesso às funcionalidades disponíveis para estudantes.

### 👨‍🏫 Professor

* Login no sistema.
* Acompanhamento de projetos e avaliações.

### 👨‍💼 Coordenador

* Gerenciamento de informações acadêmicas.
* Acompanhamento geral da plataforma.

---

# 🚀 Funcionalidades Implementadas

### 🔐 Autenticação

* Cadastro de usuários.
* Login utilizando e-mail e senha.
* Criptografia de senhas.
* Geração de token JWT.
* Controle de perfis de usuário.

### 🗄 Banco de Dados

* Integração com MySQL.
* Persistência de dados de usuários.
* Estrutura para gerenciamento de projetos, mentores, avaliações, agendamentos e formulários.

### 🌐 API REST

* Backend desenvolvido com FastAPI.
* Endpoints documentados automaticamente através do Swagger.
* Estrutura CRUD preparada para as principais entidades do sistema.

### 💻 Interface Web

* Interface desenvolvida em React.
* Navegação por rotas utilizando React Router.
* Integração entre frontend e backend.

---

# 🛠 Tecnologias Utilizadas

## Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Vite

## Backend

* Python
* FastAPI
* SQLAlchemy
* JWT Authentication
* Passlib
* Uvicorn

## Banco de Dados

* MySQL

## Controle de Versão

* Git
* GitHub

---

# 🗃 Estrutura do Banco de Dados

O banco de dados utilizado é o **MySQL**, com o schema denominado **aps_db**.

Principais tabelas:

* usuarios
* projetos
* mentores
* agendamentos
* avaliacoes
* formularios
* campos_formulario

### Principais Relacionamentos

* Um usuário pode criar vários projetos.
* Um usuário pode atuar como mentor.
* Um projeto pode receber avaliações.
* Um mentor pode possuir agendamentos.
* Um coordenador pode criar formulários.
* Um formulário pode possuir vários campos.

---

# 🔑 Principais Endpoints

### Autenticação

```http
POST /auth/register
POST /auth/login
```

### Projetos

```http
GET /projetos
POST /projetos
GET /projetos/{id}
PUT /projetos/{id}
DELETE /projetos/{id}
```

### Mentores

```http
GET /mentores
POST /mentores
```

### Agendamentos

```http
GET /agendamentos
POST /agendamentos
```

### Avaliações

```http
GET /avaliacoes
POST /avaliacoes
```

### Formulários

```http
GET /formularios
POST /formularios
```

---

# ⚙️ Como Executar o Projeto

## 📥 Clonando o Repositório

```bash
git clone https://github.com/gabriellemnunes/A.P.S---Acervo-de-Projetos-Senac.git
cd A.P.S---Acervo-de-Projetos-Senac
```

---

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* Node.js
* npm
* Python 3.11+
* MySQL
* Git

---

## 💻 Executando o Frontend

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em:

```txt
http://localhost:5173
```

---

## ⚙️ Executando o Backend

Acesse a pasta do backend:

```bash
cd backend
```

Crie o ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente virtual:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Inicie o servidor:

```bash
uvicorn app.main:app --reload
```

O backend estará disponível em:

```txt
http://127.0.0.1:8000
```

---

## 🗄 Configuração do Banco de Dados

Crie o banco de dados:

```sql
CREATE DATABASE aps_db;
```

Execute o script SQL localizado em:

```txt
backend/banco.sql
```

Configure o arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=aps_db
```

---

## 📖 Documentação da API

Após iniciar o backend, acesse:

```txt
http://127.0.0.1:8000/docs
```

A documentação interativa será gerada automaticamente pelo FastAPI.


## 📖 Documentação da API

Após iniciar o backend, acesse:

```txt
http://127.0.0.1:8000/docs
```

---

# 📖 Documentação da API

Após iniciar o backend, a documentação pode ser acessada em:

```txt
http://127.0.0.1:8000/docs
```

---

# 🎓 Projeto Acadêmico

Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas do Senac Pernambuco, com o objetivo de aplicar conceitos de desenvolvimento web, APIs REST, autenticação, banco de dados relacionais e versionamento de código utilizando Git e GitHub.
