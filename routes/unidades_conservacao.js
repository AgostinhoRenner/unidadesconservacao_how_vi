import { Router } from "express";
export const ucRouter = Router();

import { getUnidadeConservacao } from "../services/unidades_conservacao.js";

ucRouter.get("/1", async (req, res) => {
  const data = await getUnidadeConservacao(1);
  return res.json(data);
});
