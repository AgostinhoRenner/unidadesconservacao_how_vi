import "dotenv/config";
import express from "express";

import { router } from "./routes/index.js";
import { db } from "./models/index.js";

const app = express();

app.use(express.static("public"));
app.use(router);

app.listen(3000);
