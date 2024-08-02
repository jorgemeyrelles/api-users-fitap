import { Request, Response } from "express";
import TipoAluno from "../types/TypeAluno.js";

export default class AlunoController {
  newAluno(req: Request, res: Response) {
    const newAluno = <TipoAluno>req.body;
  }
  updateAluno(req: Request, res: Response) {
    const updateUser = req.body;
    const { idAluno, idUsuario } = req.params;
  }
  deleteAluno(req: Request, res: Response) {
    const id = req.params;
  }
  getAlunoById(req: Request, res: Response) {
    const { idAluno, idUsuario } = req.params;
  }
  getAlunoByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
