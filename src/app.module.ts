import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Item],
      synchronize: true,
    }),
    UsersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
