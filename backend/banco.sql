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
  tags VARCHAR(255),
  tecnologias VARCHAR(255),
  objetivo TEXT,
  publico_alvo TEXT,
  status ENUM('incubacao','validacao','desincubado') DEFAULT 'incubacao',
  criador_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (criador_id) REFERENCES usuarios(id) ON DELETE CASCADE
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
