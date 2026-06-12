import "dotenv/config";
import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// DDL — ordem respeitando as foreign keys
const tabelas = [
  [`instituicao`, `CREATE TABLE IF NOT EXISTS instituicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
  )`],
  [`unidade_conservacao`, `CREATE TABLE IF NOT EXISTS unidade_conservacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    data_criacao DATE NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(255),
    instituicao_id INT NOT NULL,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
  )`],
  [`municipio`, `CREATE TABLE IF NOT EXISTS municipio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    estado CHAR(2) NOT NULL
  )`],
  [`unidade_municipio`, `CREATE TABLE IF NOT EXISTS unidade_municipio (
    unidade_id INT NOT NULL,
    municipio_id INT NOT NULL,
    PRIMARY KEY (unidade_id, municipio_id),
    FOREIGN KEY (unidade_id) REFERENCES unidade_conservacao(id),
    FOREIGN KEY (municipio_id) REFERENCES municipio(id)
  )`],
  [`comunicacao`, `CREATE TABLE IF NOT EXISTS comunicacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    data_hora DATETIME NOT NULL,
    email VARCHAR(150) NOT NULL,
    status INT NOT NULL DEFAULT 0,
    unidade_id INT NOT NULL,
    FOREIGN KEY (unidade_id) REFERENCES unidade_conservacao(id)
  )`],
];

// DML — dados do material oficial do professor
const seeds = [
  [`instituicao`, `INSERT INTO instituicao (nome, email) VALUES
    ('ICMBio', 'icmbio@org.br'),
    ('IMA SC', 'ima@sc.gov.br')`],
  [`municipio`, `INSERT INTO municipio (nome, estado) VALUES
    ('Florianopolis', 'SC'),
    ('Balneario Camboriu', 'SC'),
    ('Itajai', 'SC'),
    ('Bombinhas', 'SC')`],
  [`unidade_conservacao`, `INSERT INTO unidade_conservacao (nome, data_criacao, descricao, imagem_url, instituicao_id) VALUES
    ('Parque do Rio Vermelho', '2007-03-24', 'Area de preservacao ambiental', 'img1.jpg', 2),
    ('Parque Raimundo Malta', '1993-07-15', 'Parque com trilhas e vegetacao nativa', 'img2.jpg', 2),
    ('Reserva do Arvoredo', '1990-04-12', 'Reserva marinha protegida', 'img3.jpg', 1),
    ('Parque da Ressacada', '2008-09-10', 'Area voltada para educacao ambiental', 'img4.jpg', 2)`],
  [`unidade_municipio`, `INSERT INTO unidade_municipio (unidade_id, municipio_id) VALUES
    (1, 1), (2, 2), (3, 1), (3, 4), (4, 3)`],
  [`comunicacao`, `INSERT INTO comunicacao (titulo, descricao, data_hora, email, status, unidade_id) VALUES
    ('Lixo na trilha', 'Tem lixo acumulado em alguns pontos', '2026-04-20 10:30:00', 'user1@email.com', 0, 1),
    ('Placa quebrada', 'Uma placa informativa esta danificada', '2026-04-21 14:00:00', 'user2@email.com', 1, 2),
    ('Pesca irregular', 'Possivel atividade ilegal na area', '2026-04-22 09:15:00', 'user3@email.com', 0, 3)`],
];

console.log("Criando tabelas...");
for (const [nome, sql] of tabelas) {
  await conn.query(sql);
  console.log("  tabela criada:", nome);
}

console.log("Inserindo dados...");
for (const [nome, sql] of seeds) {
  const [result] = await conn.query(sql);
  console.log("  inseridos", result.affectedRows, "registro(s) em:", nome);
}

await conn.end();
console.log("Banco pronto.");
