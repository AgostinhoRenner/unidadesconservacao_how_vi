import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Municipio",
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
      estado: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
    },
    {
      tableName: "municipio",
      timestamps: false,
    },
  );
};
