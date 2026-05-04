import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "UnidadeMunicipio",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      unidade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "unidade_conservacao",
          key: "id",
        },
      },
      municipio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "municipio",
          key: "id",
        },
      },
    },
    {
      tableName: "unidade_municipio",
      timestamps: false,
    },
  );
};
