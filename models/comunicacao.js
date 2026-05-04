import { DataTypes } from "sequelize";


export default (sequelize) => {
  return sequelize.define(
    "Comunicacao",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      unidade_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "unidade_conservacao",
          key: "id",
        },
      },
    },
    {
      tableName: "comunicacao",
      timestamps: false,
    },
  );
};
