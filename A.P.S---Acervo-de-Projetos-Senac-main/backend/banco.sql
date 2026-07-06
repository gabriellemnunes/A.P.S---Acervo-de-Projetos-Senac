CREATE DATABASE IF NOT EXISTS aps_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aps_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  matricula VARCHAR(40),
  senha_hash VARCHAR(255) NOT NULL,
  perfil ENUM('aluno','professor','coordenador') NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(160) NOT NULL,
  descricao TEXT NOT NULL,
  integrantes TEXT,
  area_conhecimento VARCHAR(120),
  orientador_id INT NULL,
  publico BOOLEAN DEFAULT TRUE,
  tags VARCHAR(255),
  tecnologias VARCHAR(255),
  objetivo TEXT,
  publico_alvo TEXT,
  status ENUM('pre_incubacao','incubacao_ativa','em_validacao','desincubado') DEFAULT 'pre_incubacao',
  criador_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (criador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (orientador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mentores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  especialidades VARCHAR(255),
  bio TEXT,
  disponivel BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  mentor_id INT NOT NULL,
  projeto_id INT NULL,
  data_hora DATETIME NOT NULL,
  tipo ENUM('online','presencial') DEFAULT 'online',
  pauta TEXT,
  status ENUM('pendente','confirmado','cancelado') DEFAULT 'confirmado',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (mentor_id) REFERENCES mentores(id) ON DELETE CASCADE,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT NOT NULL,
  professor_id INT NOT NULL,
  inovacao INT,
  viabilidade INT,
  impacto INT,
  execucao INT,
  feedback TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS formularios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  descricao TEXT,
  prazo DATE,
  turmas VARCHAR(255),
  publicado BOOLEAN DEFAULT FALSE,
  coordenador_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coordenador_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campos_formulario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  formulario_id INT NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  label VARCHAR(160) NOT NULL,
  obrigatorio BOOLEAN DEFAULT FALSE,
  opcoes TEXT,
  FOREIGN KEY (formulario_id) REFERENCES formularios(id) ON DELETE CASCADE
);

-- RF05: histórico de mudança de status do Kanban (mini-reunião + checklist)
CREATE TABLE IF NOT EXISTS mudancas_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT NOT NULL,
  mentor_id INT NOT NULL,
  status_anterior VARCHAR(30) NOT NULL,
  status_novo VARCHAR(30) NOT NULL,
  comentario_mentor TEXT NOT NULL,
  checklist_preenchido BOOLEAN DEFAULT FALSE,
  reuniao_registrada BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
  FOREIGN KEY (mentor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- RF07: curtidas e comentários
CREATE TABLE IF NOT EXISTS curtidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT NOT NULL,
  usuario_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unico_por_usuario (projeto_id, usuario_id),
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT NOT NULL,
  usuario_id INT NOT NULL,
  texto TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- RF10: eventos (hackathons, ideathons, palestras, workshops)
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  tipo ENUM('hackathon','ideathon','palestra','workshop') NOT NULL,
  descricao TEXT,
  data_hora DATETIME NOT NULL,
  mentor_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mentor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inscricoes_evento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  evento_id INT NOT NULL,
  aluno_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unica_inscricao (evento_id, aluno_id),
  FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
