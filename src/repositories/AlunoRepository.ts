import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import InterfaceAlunoRepository from "./interfaces/InterfaceAlunoRepository.js";
import { Repository } from "typeorm";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";

export default class AlunoRepository implements InterfaceAlunoRepository {
  private alunoRepository: Repository<AlunoEntity>;
  private usuarioRepository: Repository<UsuarioEntity>;
  private professorRepository: Repository<ProfessorEntity>;

  constructor(
    alunoRepository: Repository<AlunoEntity>,
    usuarioRepository: Repository<UsuarioEntity>,
    professorRepository: Repository<ProfessorEntity>
  ) {
    this.alunoRepository = alunoRepository;
    this.usuarioRepository = usuarioRepository;
    this.professorRepository = professorRepository;
  }

  private async alunoByKey<Tipo extends keyof AlunoEntity>(
    key: Tipo,
    valor: AlunoEntity[Tipo]
  ): Promise<AlunoEntity | null> {
    const whereClause = {
      [key]: valor,
      deleted_at: null,
    } as unknown as Record<string, any>;
    const aluno = await this.alunoRepository.findOne({
      where: whereClause,
    });
    return aluno;
  }

  async newAluno(
    usuario_aluno_id: UUID,
    professor_id: UUID
  ): Promise<{ success: boolean; message?: AlunoEntity | String }> {
    try {
      let usuario: any = null;
      let professor: any = null;
      if (usuario_aluno_id) {
        const user = await this.usuarioRepository.findOne({
          where: { id: usuario_aluno_id },
        });
        if (!user) throw new Error();
        usuario = user as UsuarioEntity;
      }
      if (professor_id) {
        const prof = await this.professorRepository.findOne({
          where: { id: professor_id },
        });
        if (!prof) throw new Error();
        professor = prof as ProfessorEntity;
      }

      const newAluno = new AlunoEntity(usuario, professor);
      await this.alunoRepository.save(newAluno);
      return { success: true, message: newAluno };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar registrar aluno." };
    }
  }
  async updateAluno(
    id: UUID,
    student: AlunoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const aluno = await this.alunoByKey("id" as keyof AlunoEntity, id);
      if (!aluno) {
        return { success: false, message: "Aluno não encontrado" };
      }

      Object.assign(aluno, student);

      await this.alunoRepository.update(id, aluno);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar aluno." };
    }
  }
  async deleteAluno(id: UUID): Promise<{ success: boolean; message?: string }> {
    try {
      const usuario = await this.alunoByKey("id" as keyof AlunoEntity, id);
      if (!usuario) {
        return { success: false, message: "Aluno não encontrado." };
      }

      await this.alunoRepository.softDelete(id);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar deletar aluno." };
    }
  }
  async getAlunoByEmail(
    email: string
  ): Promise<{ success: boolean; message?: AlunoEntity | string }> {
    try {
      const whereClause = {
        email,
        deleted_at: null,
      } as unknown as Record<string, any>;
      const usuario = await this.usuarioRepository.findOne({
        where: whereClause,
      });
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }
      const aluno = await this.alunoByKey(
        "usuario_id" as keyof AlunoEntity,
        usuario.id
      );

      return { success: true, message: <AlunoEntity>aluno };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar buscar aluno." };
    }
  }
  async getAlunoById(
    idAluno: string
  ): Promise<{ success: boolean; message?: AlunoEntity | string }> {
    try {
      const whereClause = {
        id: idAluno,
        deleted_at: null,
      } as unknown as Record<string, any>;
      
      const aluno = await this.alunoByKey(
        "id" as keyof AlunoEntity,
        idAluno as UUID
      );

      if (!aluno) {
        return { success: false, message: "Aluno não encontrado." };
      }

      return { success: true, message: <AlunoEntity>aluno };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar buscar aluno." };
    }
  }
  async updateAcademiaAluno(
    idAluno: UUID,
    academia: AcademiaEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const aluno = await this.alunoByKey("id" as keyof AlunoEntity, idAluno);

      if (!aluno) {
        return { success: false, message: "Aluno não encontrado" };
      }

      const newAcademia = new AcademiaEntity(
        academia.nome,
        academia.estado,
        academia.cidade,
        academia.bairro
      );
      aluno.academia = newAcademia;
      await this.alunoRepository.save(aluno);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar academia." };
    }
  }
}
