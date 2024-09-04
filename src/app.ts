import express from "express";
import router from "./routes/index.js";
import "reflect-metadata";
import { AppDataSource } from "./configurations/dataSource.js";
import dotenv from "dotenv";
import { swaggerDocs } from "./configurations/swagger.js";
import cors from "cors";

dotenv.config();
const schema = process.env.SCHEMA_DB;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log(`Banco de dados (${schema}) conectado na porta ${port}`);
  })
  .catch((err) => {
    console.error(err);
  });

swaggerDocs(app);

app.get("/", (_, res) => {
  res.send("Bem vindo a api Fitapp!");
});

export default app;
