import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "UnidadeConservacao",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      imagem_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 0,
      },
      instituicao_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "instituicao",
          key: "id",
        },
      },
    },
    {
      tableName: "unidade_conservacao",
      timestamps: false,
    },
  );
};
