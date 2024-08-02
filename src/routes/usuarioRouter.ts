import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

const usuarioController = new UsuarioController();

router.post("/", usuarioController.newUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);
router.get("/:perfil", usuarioController.getUsuarioByPerfil);
router.get("/:id", usuarioController.getUsuarioById);
router.get("/", usuarioController.getUsuarioByEmail);

export default router;
