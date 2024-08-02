import express from "express";
import router from "./routes/index.js";
import "reflect-metadata";
import { AppDataSource } from "./configurations/dataSource.js";

const app = express();

app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (_, res) => {
  res.send("Bem vindo a api Fitapp!");
});

export default app;
