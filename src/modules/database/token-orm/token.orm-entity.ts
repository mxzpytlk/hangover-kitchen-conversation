import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../user-orm/user.orm-entity';

@Entity('tokens', {})
export class TokenOrmEntity {
  @PrimaryColumn({
    update: false,
  })
  public id: string;

  @Column({
    name: 'refresh_token',
  })
  public refreshToken: string;

  @Column({
    name: 'user_id',
  })
  public userId: string;

  @ManyToOne(() => UserOrmEntity, (user) => user.tokens)
  @JoinColumn({
    name: 'user_id',
  })
  public user: UserOrmEntity;
}
