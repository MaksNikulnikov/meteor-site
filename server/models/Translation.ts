import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: 'translations' })
export class Translation extends BaseEntity {
  @PrimaryColumn()
  token: string ='';

  @Column()
  translation: string ='';

  static findByName(token: string) {
    return this.createQueryBuilder("translations")
      .where("translations.token = :token", { token })
      .getMany();
  }
}
