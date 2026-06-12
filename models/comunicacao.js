export default class Comunicacao {
  constructor(mysqlConnection) {
    this.mysqlConnection = mysqlConnection;
  }

  createComunicacaoTable() {
    this.mysqlConnection.query(
      `CREATE TABLE comunicacao (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(150) NOT NULL,
        descricao TEXT NOT NULL,
        data_hora DATETIME NOT NULL,
        email VARCHAR(150) NOT NULL,
        status INT NOT NULL DEFAULT 0,
        unidade_id INT NOT NULL,
        FOREIGN KEY (unidade_id) REFERENCES unidade_conservacao(id));`,
      function (error, results, fields) {
        if (error) throw error;
        console.log("Criou a tabela: Municipio");
      },
    );
  }

  seedComunicacaoTable() {
    this.mysqlConnection.query(
      `INSERT INTO comunicacao (titulo, descricao, data_hora, email, status, unidade_id) VALUES
        ('Lixo na trilha', 'Tem lixo acumulado em alguns pontos', '2026-04-20 10:30:00', 'user1@email.com', 0, 1),
        ('Placa quebrada', 'Uma placa informativa esta danificada', '2026-04-21 14:00:00', 'user2@email.com', 1, 2),
        ('Pesca irregular', 'Possivel atividade ilegal na area', '2026-04-22 09:15:00', 'user3@email.com', 0, 3);`,
      function (error, results, fields) {
        if (error) throw error;
        console.log("Adicionados os Comunicacações com sucesso!");
      },
    );
  }

  async getAllComunicacao() {
    const [rows] = await this.mysqlConnection.promise().query(
      `SELECT 
        c.id,
        c.titulo,
        c.descricao, 
        c.data_hora, 
        c.email, 
        c.status, 
        uc.id as unidade_id,
        uc.nome as unidade_nome
      FROM comunicacao c
      INNER JOIN unidade_conservacao uc
        ON c.unidade_id = uc.id
      ORDER BY c.data_hora DESC`
    );
    return rows;
  }

  async getComunicacao(id = undefined) {
    if (!id || typeof id !== "number") throw new Error("Necessário informar um Id numérico para buscar o Município");

    const [rows, fields] = await this.mysqlConnection.promise().query(
      `SELECT 
        c.titulo,
        c.descricao, 
        c.data_hora, 
        c.email, 
        c.status, 
        uc.nome as unidade_nome,
        i.nome as instituicao_nome
      FROM comunicacao c
      INNER JOIN unidade_conservacao uc
        ON c.unidade_id = uc.id
      INNER JOIN instituicao i
        ON uc.instituicao_id = i.id
      WHERE c.id = ?`,
      [id],
    );
    return rows;
  }

  async createComunicacao({ titulo, descricao, data_hora, email, unidade_id }) {
    try {
      await this.mysqlConnection.promise().query(
        `INSERT INTO comunicacao 
        (titulo, descricao, data_hora, email, status, unidade_id) 
        VALUES
        (? , ?, ?, ?, ?, ?);`,
        [titulo, descricao, data_hora, email, 0, unidade_id],
      );
    } catch (error) {
      throw error;
    }
  }

  async updateComunicacao({ comunicacao_id, status }) {
    try {
      await this.mysqlConnection.promise().query(
        `UPDATE comunicacao 
        SET status = ?
        WHERE id = ?`,
        [status, comunicacao_id],
      );
    } catch (error) {
      throw error;
    }
  }
}
