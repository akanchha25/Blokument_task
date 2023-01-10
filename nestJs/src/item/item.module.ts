import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ItemController } from './item.controller';
import { Items } from './item.entity';
import { ItemService } from './item.service';


@Module({
  imports: [TypeOrmModule.forFeature([Items,User]),
  
  forwardRef(() => UserModule),
           

],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {
    constructor() {
        console.log('ItemModule');
    }
}