# 📘 A.P.S. — Acervo de Projetos Senac

<p align="center">
  <img src="https://github.com/user-attachments/assets/0e8a5e23-7c39-4304-811c-8d0ee9dc98fd" alt="APS Logo" width="400">
</p>

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?logo=mysql)

## 📌 Sobre o Projeto

O A.P.S. (Acervo de Projetos Senac) é uma plataforma desenvolvida para armazenar, organizar e acompanhar projetos acadêmicos desenvolvidos por alunos do Senac.

O sistema busca evitar a perda de conhecimento produzido nos Projetos Integradores, permitindo que alunos, professores e coordenadores possam registrar, acompanhar e consultar projetos de forma estruturada.

---

## 🎯 Objetivo

Criar uma plataforma capaz de:

* Armazenar projetos acadêmicos.
* Facilitar o acompanhamento por professores e mentores.
* Permitir avaliações e feedbacks.
* Centralizar formulários e registros acadêmicos.
* Preservar o histórico dos projetos desenvolvidos.

---

## 👥 Perfis de Usuário

O sistema possui três perfis principais:

### 👨‍🎓 Aluno

* Cadastro na plataforma.
* Login no sistema.
* Visualização de projetos.
* Participação em agendamentos.

### 👨‍🏫 Professor

* Login no sistema.
* Avaliação de projetos.
* Registro de feedbacks.

### 👨‍💼 Coordenador

* Criação e gerenciamento de formulários.
* Acompanhamento de projetos.
* Gestão acadêmica.

---

## 🚀 Funcionalidades Implementadas

### Autenticação

* Cadastro de usuários.
* Login utilizando e-mail e senha.
* Geração de token JWT.
* Controle de perfis (aluno, professor e coordenador).

### Projetos

* Cadastro de projetos.
* Consulta de projetos.
* Atualização de projetos.
* Exclusão de projetos.

### Mentores

* Cadastro de mentores.
* Consulta de mentores.

### Agendamentos

* Registro de agendamentos entre alunos e mentores.

### Avaliações

* Registro de avaliações realizadas por professores.

### Formulários

* Cadastro de formulários.
* Gerenciamento de campos dos formulários.

---

## 🛠 Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Vite

### Backend

* Python
* FastAPI
* SQLAlchemy
* JWT Authentication
* Passlib
* Uvicorn

### Banco de Dados

* MySQL

### Controle de Versão

* Git
* GitHub

---

## 🗄 Estrutura do Banco de Dados

O banco de dados utilizado é o MySQL e possui as seguintes tabelas:

* usuarios
* projetos
* mentores
* agendamentos
* avaliacoes
* formularios
* campos_formulario

### Principais Relacionamentos

* Um usuário pode criar vários projetos.
* Um projeto pode receber várias avaliações.
* Um mentor pode possuir vários agendamentos.
* Um formulário pode possuir vários campos.
* Um coordenador pode criar vários formulários.

---

## 🔑 API REST

O backend disponibiliza endpoints para:

### Autenticação

* POST /auth/register
* POST /auth/login

### Projetos

* GET /projetos
* POST /projetos
* GET /projetos/{id}
* PUT /projetos/{id}
* DELETE /projetos/{id}

### Mentores

* GET /mentores
* POST /mentores

### Agendamentos

* GET /agendamentos
* POST /agendamentos

### Avaliações

* GET /avaliacoes
* POST /avaliacoes

### Formulários

* GET /formularios
* POST /formularios

---

## ⚙️ Instalação

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## 🗃 Banco de Dados

Crie o banco executando:

```bash
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

Após iniciar o backend:

```txt
http://127.0.0.1:8000/docs
```

---

## 🎓 Projeto Acadêmico

Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas do Senac Pernambuco como atividade integradora, aplicando conceitos de desenvolvimento web, banco de dados, APIs REST, autenticação e versionamento com Git e GitHub.

---

## 🎓 Objetivo do Projeto

O **Acervo de Projetos Senac (APS)** tem como objetivo preservar, organizar e estimular a continuidade dos Projetos Integradores desenvolvidos pelos estudantes, promovendo colaboração, inovação e compartilhamento de conhecimento dentro da comunidade acadêmica.
