import "dotenv/config";
import express from "express";

import { router } from "./routes/index.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(router);

app.listen(3000);
console.log("Server is running on localhost:3000");
