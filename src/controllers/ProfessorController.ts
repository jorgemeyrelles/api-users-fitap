import { Request, Response } from "express";

export default class ProfessorController {
  newProfessor(req: Request, res: Response) {
    const newProfessor = req.body;
  }
  updateProfessor(req: Request, res: Response) {
    const updateProfessor = req.body;
    const { idProfessor, idUsuario } = req.params;
  }
  deleteProfessor(req: Request, res: Response) {
    const id = req.params;
  }
  getProfessorById(req: Request, res: Response) {
    const { idProfessor, idUsuario } = req.params;
  }
  getProfessorByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
