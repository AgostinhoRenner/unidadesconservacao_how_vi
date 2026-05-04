import defineComunicao from "./comunicacao.js";
import defineInstituicao from "./instituicao.js";
import defineUnidadeConservacao from "./unidade_conservacao.js";
import defineMunicipio from "./municipio.js";
import defineUnidadeMunicipio from "./unidade_municipio.js";

import db from "./config/database.js";

// Faz a injeção da conexão SQL para dentro das Definições das models
const Comunicacao = defineComunicao(db);
const Instituicao = defineInstituicao(db);
const UnidadeConservacao = defineUnidadeConservacao(db);
const Municipio = defineMunicipio(db);
const UnidadeMunicipio = defineUnidadeMunicipio(db);

// Declara os relacionamentos e chaves estrangeiras das models
UnidadeConservacao.hasMany(Comunicacao, { foreignKey: "unidade_id" });
Comunicacao.belongsTo(UnidadeConservacao, { foreignKey: "unidade_id" });

UnidadeConservacao.belongsTo(Instituicao, { foreignKey: "instituicao_id" });
Instituicao.hasMany(UnidadeConservacao, { foreignKey: "instituicao_id" });

UnidadeConservacao.belongsToMany(Municipio, { through: UnidadeMunicipio, foreignKey: "unidade_id" });
Municipio.belongsToMany(UnidadeConservacao, { through: UnidadeMunicipio, foreignKey: "municipio_id" });

// db.sync({alter: true});
export { db, Comunicacao, Instituicao, UnidadeConservacao, Municipio };
