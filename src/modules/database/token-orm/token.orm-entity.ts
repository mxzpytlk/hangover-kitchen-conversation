import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../user-orm/user.orm-entity';

@Entity('tokens', {})
export class TokenOrmEntity {
  @PrimaryColumn({
    update: false,
  })
  public id: string;

  @Column()
  public refresh_token: string;

  @Column()
  public user_id: string;

  public get userId(): string {
    return this.user_id;
  }

  public set userId(userId: string) {
    this.user_id = userId;
  }

  @ManyToOne(() => UserOrmEntity, (user) => user.tokens)
  public user: UserOrmEntity;
}
