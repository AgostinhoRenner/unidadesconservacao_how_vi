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

comunicadosRouter.post("/", async (req, res) => {
  try {
    await new Comunicacao(mysqlConnection).createComunicacao(req.body);
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro durante o processamento, tente novamente");
  }
});

comunicadosRouter.put("/", async (req, res) => {
  try {
    await new Comunicacao(mysqlConnection).createComunicacao(req.body);
    res.status(201).send("Informações Atualizadas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro durante o processamento, tente novamente");
  }
});
