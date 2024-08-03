import { UUID } from "crypto";
import AlunoEntity from "./AlunoEntity.js";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class ProfessorEntity {
  constructor(alunos?: AlunoEntity[]) {
    this.alunos = alunos;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @OneToMany(() => AlunoEntity, (aluno) => aluno.professor)
  alunos?: AlunoEntity[];
  @CreateDateColumn({ type: "date" })
  created_at!: Date;
  @UpdateDateColumn({ type: "date" })
  updated_at!: Date;
  @DeleteDateColumn({ type: "date" })
  deleted_at!: Date;
}
