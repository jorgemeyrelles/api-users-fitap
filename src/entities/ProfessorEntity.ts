import { UUID } from "crypto";
import AlunoEntity from "./AlunoEntity.js";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UsuarioEntity from "./UsuarioEntity.js";

@Entity("professor")
export default class ProfessorEntity {
  constructor(
    usuario_id: UUID | null,
    usuario?: UsuarioEntity,
    alunos?: AlunoEntity[]
  ) {
    this.usuario_id = usuario_id;
    this.usuario = usuario;
    this.alunos = alunos;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @OneToOne(() => UsuarioEntity, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: UsuarioEntity | undefined;

  @Column({ type: "uuid" })
  usuario_id!: UUID | null;
  @OneToMany(() => AlunoEntity, (aluno) => aluno.professor)
  alunos?: AlunoEntity[];
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
