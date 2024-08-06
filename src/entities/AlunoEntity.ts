import { UUID } from "crypto";
import AcademiaEntity from "./AcademiaEntity.js";
import ProfessorEntity from "./ProfessorEntity.js";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UsuarioEntity from "./UsuarioEntity.js";

@Entity("aluno")
export default class AlunoEntity {
  constructor(
    usuario: UsuarioEntity,
    professor: ProfessorEntity,
    academia?: AcademiaEntity
  ) {
    this.usuario = usuario;
    this.professor = professor;
    this.academia = academia;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @OneToOne(() => UsuarioEntity, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  usuario: UsuarioEntity;
  @ManyToOne(() => ProfessorEntity, (professor) => professor.alunos)
  professor?: ProfessorEntity;
  @OneToOne(() => AcademiaEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  academia?: AcademiaEntity;
  @CreateDateColumn({ type: "datetime", nullable: false })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", nullable: false })
  updated_at!: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  deleted_at?: Date;

  @BeforeInsert()
  setCreateDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}
