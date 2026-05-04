import { UnidadeConservacao } from "../models/index.js";

export async function getUnidadeConservacao(id) {
  let data = await UnidadeConservacao.findByPk(id);

  return data;
}
