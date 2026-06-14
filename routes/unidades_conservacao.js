import { Router } from "express";
export const ucRouter = Router();

import { mysqlConnection } from "../config/database.js";

import Municipio from "../models/municipio.js";
import UnidadeConservacao from "../models/unidade_conservacao.js";

ucRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "Id inválido" });
  }
  try {
    const rows = await new UnidadeConservacao(mysqlConnection).getUnidadeConservacao(id);
    if (rows.length === 0) return res.status(404).json({ erro: "UC não encontrada" });

    const { unidade_nome, data_criacao, descricao, imagem_url, instituicao_nome, email } = rows[0];
    const municipios = rows.map(r => ({ nome: r.municipio_nome, estado: r.municipio_estado }));

    return res.json({ unidade_nome, data_criacao, descricao, imagem_url, instituicao_nome, email, municipios });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
});

ucRouter.get("/", async (req, res) => {
  const data = await new UnidadeConservacao(mysqlConnection).getAllUnidadesConservacao();
  return res.json(data);
});
