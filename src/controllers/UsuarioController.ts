import { Request, Response } from "express";
import TipoUsuario from "../types/TypeUsuario.js";
import EnumPerfil from "../enums/EnumPerfil.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";

export default class UsuarioController {
  newUsuario(req: Request, res: Response) {
    const { email, nome, perfil, senha } = <UsuarioEntity>req.body;
    const newUser = {
      email,
      nome,
      senha,
      perfil: EnumPerfil[perfil],
    };
    return res.status(200).json({ data: newUser });
  }
  updateUsuario(req: Request, res: Response) {
    const updateUser = req.body;
    const { id } = req.params;
  }
  deleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
  }
  getUsuarioByPerfil(req: Request, res: Response) {
    const { perfil } = req.params;
  }
  getUsuarioById(req: Request, res: Response) {
    const { id } = req.params;
  }
  getUsuarioByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
