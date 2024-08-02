import express from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = express.Router();

const alunoController = new AlunoController();

router.post("/", alunoController.newAluno);
router.put("/:idAluno/:idUsuario", alunoController.updateAluno);
router.delete("/:id", alunoController.deleteAluno);
router.get("/:idAluno/:idUsuario", alunoController.getAlunoById);
router.get("/", alunoController.getAlunoByEmail);

export default router;
