import { Router } from "express";
export const comunicadosRouter = Router();

import { mysqlConnection } from "../config/database.js";
import Comunicacao from "../models/comunicacao.js";

comunicadosRouter.get("/", async (req, res) => {
  try {
    const data =await new Comunicacao(mysqlConnection).getAllComunicacao();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro durante o processamento, tente novamente");
  }
});

comunicadosRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "Id inválido" });
  }
  try {
    const data = await new Comunicacao(mysqlConnection).getComunicacao(id);
    if (data.length === 0) return res.status(404).json({ erro: "Comunicação não encontrada" });
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
});

comunicadosRouter.post("/", async (req, res) => {
  try {
    await new Comunicacao(mysqlConnection).createComunicacao(req.body);
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro durante o processamento, tente novamente");
  }
});
