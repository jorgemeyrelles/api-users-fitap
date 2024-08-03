import AcademiaEntity from "../../entities/AcademiaEntity.js";
import UsuarioEntity from "../../entities/UsuarioEntity.js";
import { UUID } from "crypto";

export default interface InterfaceUsuarioRepository {
  newUsuario(user: UsuarioEntity): void | Promise<void>;
  updateUsuario(
    id: UUID,
    user: UsuarioEntity
  ): void | Promise<{ success: boolean; message?: string }>;
  deleteUsuario(
    id: UUID
  ): void | Promise<{ success: boolean; message?: string }>;
  getUsuarioById(
    id: UUID
  ): UsuarioEntity | Promise<{ success: boolean; message?: UsuarioEntity }>;
  getUsuarioByPerfil(
    perfil: string
  ):
    | Array<UsuarioEntity>
    | Promise<{ success: boolean; message?: UsuarioEntity[] }>;
  getUsuarioByEmail(
    email: string
  ): UsuarioEntity | Promise<{ success: boolean; message?: UsuarioEntity }>;
}
