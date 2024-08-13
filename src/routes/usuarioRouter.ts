import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { AppDataSource } from "../configurations/dataSource.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";

const router = express.Router();

const usuarioRepository = new UsuarioRepository(
  AppDataSource.getRepository(UsuarioEntity)
);

const usuarioController = new UsuarioController(usuarioRepository);

router.post("/", (req, res) => usuarioController.newUsuario(req, res));
router.put("/:id", (req, res) => usuarioController.updateUsuario(req, res));
router.delete("/:id", (req, res) => usuarioController.deleteUsuario(req, res));
router.get("/perfil/:perfil", (req, res) => usuarioController.getUsuarioByPerfil(req, res));
router.get("/:id", (req, res) => usuarioController.getUsuarioById(req, res));
router.get("/", (req, res) => usuarioController.getUsuarioByEmail(req, res));

export default router;
