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
    usuario?: UsuarioEntity,
    professor?: ProfessorEntity,
    usuario_id?: UUID,
    professor_id?: UUID,
    academia_id?: UUID,
    academia?: AcademiaEntity
  ) {
    this.usuario = usuario;
    this.usuario_id = usuario_id ? usuario_id : usuario ? usuario.id : null;
    this.professor = professor;
    this.professor_id = professor_id
      ? professor_id
      : professor
        ? professor.id
        : null;
    this.academia = academia;
    this.academia_id = academia_id
      ? academia_id
      : academia
        ? academia.id
        : null;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @OneToOne(() => UsuarioEntity, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "usuario_id" })
  usuario?: UsuarioEntity;
  @Column({ type: "uuid" })
  usuario_id!: UUID | null;
  @ManyToOne(() => ProfessorEntity, (professor) => professor.alunos)
  @JoinColumn({ name: "professor_id" })
  professor?: ProfessorEntity;

  @Column({ type: "uuid" })
  professor_id!: UUID | null;
  @OneToOne(() => AcademiaEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "academia_id" })
  academia?: AcademiaEntity;

  @Column({ type: "uuid", nullable: true })
  academia_id?: UUID | null;
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
