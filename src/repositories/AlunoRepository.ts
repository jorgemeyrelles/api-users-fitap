import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import InterfaceAlunoRepository from "./interfaces/InterfaceAlunoRepository.js";
import { Repository } from "typeorm";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import EnumPerfil from "../enums/EnumPerfil.js";

export default class AlunoRepository implements InterfaceAlunoRepository {
  private alunoRepository: Repository<AlunoEntity>;
  private usuarioRepository: Repository<UsuarioEntity>;
  private professorRepository: Repository<ProfessorEntity>;
  private academiaRepository: Repository<AcademiaEntity>;

  constructor(
    alunoRepository: Repository<AlunoEntity>,
    usuarioRepository: Repository<UsuarioEntity>,
    professorRepository: Repository<ProfessorEntity>,
    academiaRepository: Repository<AcademiaEntity>
  ) {
    this.alunoRepository = alunoRepository;
    this.usuarioRepository = usuarioRepository;
    this.professorRepository = professorRepository;
    this.academiaRepository = academiaRepository;
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
      relations: ["usuario", "professor", "academia"],
    });
    return aluno;
  }

  async newAluno(
    aluno: AlunoEntity
  ): Promise<{ success: boolean; message?: AlunoEntity | String }> {
    try {
      const { usuario, usuario_id, professor_id, academia } = aluno;

      if (usuario_id) {
        const user = await this.usuarioRepository.findOne({
          where: { id: usuario_id },
        });
        if (!user) throw new Error();
        aluno.usuario = user;
      } else if (usuario) {
        const { nome, email, celular, senha } = usuario as UsuarioEntity;
        const newUser = new UsuarioEntity(
          nome,
          email,
          celular,
          EnumPerfil.aluno,
          senha
        );

        await this.usuarioRepository.save(newUser);
        aluno.usuario = newUser;
      } else {
        throw new Error();
      }

      if (professor_id) {
        const prof = await this.professorRepository.findOne({
          where: { id: professor_id },
        });
        if (!prof) throw new Error();
        aluno.professor = prof;
      } else {
        throw new Error();
      }

      if (academia) {
        const { nome, estado, cidade, bairro } = academia;

        const newAcademia = new AcademiaEntity(nome, estado, cidade, bairro);

        await this.academiaRepository.save(newAcademia);
        aluno.academia = newAcademia;
      }

      await this.alunoRepository.save(aluno);
      return { success: true, message: aluno };
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

  async getAllAlunos(): Promise<{
    success: boolean;
    message?: AlunoEntity[] | string;
  }> {
    const allAlunos = await this.alunoRepository.find();

    return { success: true, message: allAlunos as AlunoEntity[] };
  }

  async updateAcademiaAluno(
    idAluno: UUID,
    academia: AcademiaEntity
  ): Promise<{ success: boolean; message?: AlunoEntity | string }> {
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
      return { success: true, message: aluno };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar academia." };
    }
  }
}
