import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Instituicao",
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
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "instituicao",
      timestamps: false,
    },
  );
};
