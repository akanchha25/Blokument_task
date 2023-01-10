import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Items } from './item/item.entity';

import { ItemModule } from './item/item.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Users_address } from './user/entities/userAddress.entity';
import { orders } from './order/order.entity';


@Module({
  imports: [


    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : ".env",

      })],

      useFactory: (configService: ConfigService) => ({

        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'user',
        entities: [User,Users_address,Items, orders],
        logging: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    

      
   
      // TypeOrmModule.forRoot({
      //   type: 'postgres',
      //   host: 'localhost',
      //   port: 5432,
      //   username: 'postgres',
      //   password: 'password',
      //   database: 'user',
      //   entities: [User, Items],
      //   synchronize: true,
      //   logging: true
      // }),

    
    
    UserModule, ItemModule, OrderModule],
  controllers: [],
  providers: [],
  exports: []
})
export class RootModule {
  constructor(){
     console.log('RootModule');
  }
}
