export default class UnidadeConservacao {
  constructor(mysqlConnection) {
    this.mysqlConnection = mysqlConnection;
  }

  createUnidadeConservacaoTable() {
    this.mysqlConnection.query(
      `CREATE TABLE unidade_conservacao (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        data_criacao DATE NOT NULL,
        descricao TEXT,
        imagem_url VARCHAR(255),
        instituicao_id INT NOT NULL,
        FOREIGN KEY (instituicao_id) REFERENCES instituicao(id));`,
      function (error, results, fields) {
        if (error) throw error;
        console.log("Criou a tabela: unidade_conservacao");
      },
    );
  }

  seedUnidadeConservacaoTable() {
    this.mysqlConnection.query(
      `INSERT INTO unidade_conservacao (nome, email) VALUES
        ('ICMBio', 'icmbio@org.br'),
        ('IMA SC', 'ima@sc.gov.br');`,
      function (error, results, fields) {
        if (error) throw error;
        console.log("Adicionados os unidade_conservacao com sucesso!");
      },
    );
  }

  async getAllUnidadesConservacao() {
    const [rows, fields] = await this.mysqlConnection.promise().query(
      `SELECT 
        uc.id,
        uc.nome as unidade_nome,
        uc.data_criacao,
        uc.descricao,
        uc.imagem_url,
        i.nome as instituicao_nome,
        i.email
      FROM unidade_conservacao uc
      INNER JOIN instituicao i
        ON uc.instituicao_id = i.id`,
    );
    return rows;
  }

  async getUnidadeConservacao(id = undefined) {
    if (!id || typeof id !== "number")
      throw new Error("Necessário informar um Id numérico para buscar Unidade de Conservacao");

    const [rows, fields] = await this.mysqlConnection.promise().query(
      `SELECT 
        uc.nome as unidade_nome,
        uc.data_criacao,
        uc.descricao,
        uc.imagem_url,
        i.nome as instituicao_nome,
        i.email
      FROM unidade_conservacao uc
      INNER JOIN instituicao i
        ON uc.instituicao_id = i.id
      WHERE uc.id = ?`,
      [id],
    );
    return rows;
  }
}
