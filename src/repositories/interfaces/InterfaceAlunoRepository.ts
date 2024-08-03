import { UUID } from "crypto";
import AcademiaEntity from "../../entities/AcademiaEntity.js";

export default interface InterfaceAlunoRepository {
  updateAcademiaUsuario(
    id: UUID,
    academia: AcademiaEntity
  ): void | Promise<{ success: boolean; message?: string }>;
}
