import { Request, Response } from "express";
import EnumPerfil from "../enums/EnumPerfil.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { UUID } from "crypto";

export default class UsuarioController {
  constructor(private repository: UsuarioRepository) {}

  async newUsuario(req: Request, res: Response) {
    const { email, nome, perfil, senha, celular } = <UsuarioEntity>req.body;

    if (!(perfil in EnumPerfil)) {
      return res.status(404).json({ message: "Perfil invalido" });
    }
    const usuarioEntity = new UsuarioEntity(
      nome,
      email,
      celular,
      perfil,
      senha
    );

    await this.repository.newUsuario(usuarioEntity);

    return res.status(200).json({ data: usuarioEntity });
  }
  async updateUsuario(req: Request, res: Response) {
    const updateUser = <UsuarioEntity>req.body;
    const { id } = req.params;

    const { success, message } = await this.repository.updateUsuario(
      id as UUID,
      updateUser
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
  async deleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deleteUsuario(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(204).json(message);
  }
  async getUsuarioByPerfil(req: Request, res: Response) {
    const { perfil } = req.params;
    const { success, message } = await this.repository.getUsuarioByPerfil(
      Number(perfil) as EnumPerfil
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(204).json(message);
  }
  async getUsuarioById(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.getUsuarioById(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(204).json(message);
  }
  async getUsuarioByEmail(req: Request, res: Response) {
    const email = req.body;
    const { success, message } = await this.repository.getUsuarioByEmail(email);

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(204).json(message);
  }
}
