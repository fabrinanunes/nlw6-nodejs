import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Expose } from "class-transformer"

@Entity("tags")
class Tag {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: "name_custom" })
  nameCustom(): string {
    return `#${this.name}`;
  }
  
  constructor() {
     //verificar se o id não está preenchido e, caso nao estiver preenchido, preenche com uuid (versão 4)
   if (!this.id) {
     this.id = uuid();
   }
 }
}

export { Tag }