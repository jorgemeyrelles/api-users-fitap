import { DataSource } from "typeorm";
import dotenv from "dotenv";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import AcademiaEntity from "../entities/AcademiaEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";

dotenv.config();

const pass = process.env.PASS_DB;
const schema = process.env.SCHEMA_DB;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: pass,
  database: schema,
  synchronize: true,
  logging: false,
  entities: [UsuarioEntity, AlunoEntity, AcademiaEntity, ProfessorEntity],
  subscribers: [],
  migrations: [],
});
