import { UUID } from "crypto";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import InterfaceUsuarioRepository from "./interfaces/InterfaceUsuarioRepository.js";
import { Repository } from "typeorm";
import AcademiaEntity from "../entities/AcademiaEntity.js";

export default class UsuarioRepository implements InterfaceUsuarioRepository {
  private repository: Repository<UsuarioEntity>;

  constructor(repository: Repository<UsuarioEntity>) {
    this.repository = repository;
  }

  private async existsUsuario(id: UUID): Promise<UsuarioEntity | null> {
    const user = await this.repository.findOne({
      where: { id },
    });
    return user;
  }

  async newUsuario(user: UsuarioEntity): Promise<void> {
    await this.repository.save(user);
  }
  async updateUsuario(
    idUsuario: UUID,
    user: UsuarioEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const usuario = await this.existsUsuario(idUsuario);
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado" };
      }

      Object.assign(usuario, user);

      await this.repository.update(idUsuario, usuario);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar usuário." };
    }
  }
  async deleteUsuario(
    id: UUID
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const usuario = await this.existsUsuario(id);
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }
      const deleted = {
        ...usuario,
        deleted_at: new Date(),
      };

      await this.repository.update(id, deleted);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar deletar usuário." };
    }
  }
  async getUsuarioById(
    id: UUID
  ): Promise<{ success: boolean; message: UsuarioEntity | string }> {
    try {
      const usuario = await this.existsUsuario(id);
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }
      return { success: true, message: usuario };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro ao tentar buscar usuario por id.",
      };
    }
  }
  getUsuarioByPerfil(
    perfil: string
  ): Promise<{ success: boolean; message: UsuarioEntity[] | string }> {
    throw new Error("Method not implemented.");
  }
  getUsuarioByEmail(
    email: string
  ): Promise<{ success: boolean; message: UsuarioEntity | string }> {
    throw new Error("Method not implemented.");
  }
}
