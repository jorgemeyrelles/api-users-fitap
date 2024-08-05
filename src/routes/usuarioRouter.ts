import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { AppDataSource } from "../configurations/dataSource.js";

const router = express.Router();

const usuarioRepository = new UsuarioRepository(
  AppDataSource.getRepository("UsuarioEntity")
);

const usuarioController = new UsuarioController(usuarioRepository);

router.post("/", usuarioController.newUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);
router.get("/:perfil", usuarioController.getUsuarioByPerfil);
router.get("/:id", usuarioController.getUsuarioById);
router.get("/", usuarioController.getUsuarioByEmail);

export default router;
