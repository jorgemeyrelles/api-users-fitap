import { UUID } from "crypto";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import InterfaceUsuarioRepository from "./interfaces/InterfaceUsuarioRepository.js";
import { Repository } from "typeorm";
import EnumPerfil from "../enums/EnumPerfil.js";

export default class UsuarioRepository implements InterfaceUsuarioRepository {
  private repository: Repository<UsuarioEntity>;

  constructor(repository: Repository<UsuarioEntity>) {
    this.repository = repository;
  }

  private async usuarioByKey<Tipo extends keyof UsuarioEntity>(
    key: Tipo,
    valor: UsuarioEntity[Tipo]
  ): Promise<UsuarioEntity | null> {
    const whereClause = {
      [key]: valor,
      deleted_at: null,
    } as unknown as Record<string, any>;
    const user = await this.repository.findOne({
      where: whereClause,
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
      const usuario = await this.usuarioByKey(
        "id" as keyof UsuarioEntity,
        idUsuario
      );
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
      const usuario = await this.usuarioByKey("id" as keyof UsuarioEntity, id);
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }

      await this.repository.softDelete(id);

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
      const usuario = await this.usuarioByKey("id" as keyof UsuarioEntity, id);
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
  async getUsuarioByPerfil(
    perfil: EnumPerfil
  ): Promise<{ success: boolean; message: UsuarioEntity[] | string }> {
    try {
      const whereClause = {
        perfil,
        deleted_at: null,
      } as unknown as Record<string, any>;
      const usuarios = await this.repository.find({
        where: whereClause,
      });
      if (usuarios.length === 0) {
        return { success: false, message: "Nenhum usuário encontrado." };
      }
      return { success: true, message: usuarios };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro ao tentar buscar usuario pelo perfil.",
      };
    }
  }
  async getUsuarioByEmail(
    email: string
  ): Promise<{ success: boolean; message: UsuarioEntity | string }> {
    try {
      const usuario = await this.usuarioByKey(
        "email" as keyof UsuarioEntity,
        email
      );
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }
      return { success: true, message: usuario };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao buscar usuario por email." };
    }
  }
}
