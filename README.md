faça o passo a passo para o meu read me, # 📘 APS Frontend – Acervo de Projetos Senac

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8)

O **APS Frontend** é a interface de usuário do **Acervo de Projetos Senac**, uma plataforma desenvolvida para armazenar, organizar e disponibilizar Projetos Integradores de forma estruturada. O sistema foi criado para evitar que projetos acadêmicos sejam esquecidos após sua apresentação, permitindo que alunos, professores e coordenação acompanhem sua evolução e reutilizem conhecimentos produzidos dentro da instituição.

Construído com tecnologias modernas e foco na experiência do usuário, o APS oferece uma navegação intuitiva, responsiva e acessível para todos os envolvidos no processo acadêmico.

---

## ✨ Visão Geral & Destaques

O APS é mais do que um repositório acadêmico; é um ambiente colaborativo que conecta:

### 👨‍🎓 Alunos
- Cadastro e gerenciamento de Projetos Integradores.
- Compartilhamento de ideias e evolução dos projetos.
- Acesso a metodologias e eventos acadêmicos.

### 👨‍🏫 Professores/Mentores
- Acompanhamento de equipes.
- Validação de etapas dos projetos.
- Divulgação de eventos e oportunidades.

### 👨‍💼 Coordenação
- Monitoramento dos projetos em andamento.
- Gestão de usuários.
- Geração de relatórios gerenciais e indicadores acadêmicos.

---

## 🚀 Principais Funcionalidades

### Para Alunos

#### 📂 Cadastro e Gestão de Projetos
- Criação, edição e exclusão de projetos.
- Definição de título, descrição, integrantes, orientador e área de conhecimento.
- Configuração de projetos públicos ou privados.

#### 📋 Quadro Kanban de Incubação
- Pré-incubação.
- Incubação Ativa.
- Em Validação.
- Desincubado.

#### 🔄 Evolução Controlada
A mudança de status exige:
- Registro de mini-reunião.
- Comentário do mentor.
- Checklist preenchido.

#### ❤️ Interação Acadêmica
- Curtidas em projetos.
- Comentários.
- Compartilhamento de conhecimento.

#### 🎯 Desbloqueio Progressivo de Metodologias
- **4 dias:** Personas e definição de papéis.
- **10 dias:** Pitch Twitter e validação.
- **20 dias:** Cronograma e matriz de riscos.
- **30 dias:** Kit de apresentação e simulação de banca.

#### 📅 Eventos Acadêmicos
Participação em:
- Hackathons.
- Ideathons.
- Workshops.
- Palestras.

---

### Painel Administrativo

#### 📊 Dashboard
- Quantidade de projetos por curso.
- Distribuição por status.
- Projetos ativos e inativos.
- Tempo médio de incubação.
- Projetos abandonados.

#### 🛠️ Gestão de Entidades (CRUD)

##### Usuários
- Cadastro e gerenciamento de alunos e professores.

##### Projetos
- Controle completo dos projetos cadastrados.

##### Eventos
- Gerenciamento de eventos acadêmicos.

#### 📑 Relatórios Automatizados
Exportação em:
- PDF.
- Excel (.xlsx).

Com indicadores sobre:
- Projetos por curso.
- Status dos projetos.
- Tempo médio de incubação.
- Projetos inativos.

#### 🔒 Controle de Acesso
- Área administrativa restrita a usuários autorizados.

---

## 💻 Tecnologias Utilizadas

### Frontend Core

- **React 19** — Biblioteca JavaScript para construção de interfaces modernas e reativas.
- **Vite** — Ferramenta de build rápida e otimizada para desenvolvimento e produção.

### Estilização

- **Tailwind CSS v4** — Framework CSS utility-first para construção de interfaces modernas e responsivas.

### Roteamento

- **React Router DOM v7** — Gerenciamento das rotas da aplicação.

### Formulários & Validação

- **Formik** — Gerenciamento de formulários.
- **Yup** — Validação de dados.

### Requisições API

- **Axios** — Cliente HTTP para comunicação com o backend.

### Estado Global

- **React Context API** — Gerenciamento de autenticação e estado da aplicação.

### Visualização de Dados

- **Chart.js**
- **React Chart.js 2**

### Ícones

- **React Icons**

---

## ⚙️ Pré-requisitos e Instalação

Antes de começar, certifique-se de possuir:

- Node.js 18+
- npm ou Yarn

### Clone o Repositório

```bash
git clone https://github.com/seu-usuario/aps-frontend.git
cd aps-frontend
```

### Instale as Dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor local de desenvolvimento.

---

### Produção

```bash
npm run build
```

Gera a versão otimizada para produção.

---

### Lint

```bash
npm run lint
```

Executa a análise estática do código.

---

### Preview

```bash
npm run preview
```

Visualiza localmente a versão de produção.

---

## 🔒 Autenticação e Autorização

O APS utiliza autenticação baseada em **JWT (JSON Web Token)**.

### Recursos

- Login seguro.
- Armazenamento do token de acesso.
- Proteção de rotas privadas.
- Controle de permissões por perfil.

### Perfis de Usuário

| Perfil | Permissão |
|----------|------------|
| ROLE_ALUNO | Acesso aos projetos e eventos |
| ROLE_MENTOR | Orientação e validação de projetos |
| ROLE_ADMIN | Administração completa da plataforma |

### Rotas Protegidas

O painel administrativo e funcionalidades de gestão só podem ser acessados por usuários autorizados mediante validação de token e permissões.

---

## 🎓 Objetivo do Projeto

O **Acervo de Projetos Senac (APS)** tem como objetivo preservar, organizar e estimular a continuidade dos Projetos Integradores desenvolvidos pelos estudantes, promovendo colaboração, inovação e compartilhamento de conhecimento dentro da comunidade acadêmica.
