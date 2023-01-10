import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from 'src/item/item.entity';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';
import { OrderController } from './order.controller';
import { orders } from './order.entity';
import { OrderServices } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([orders,Items]),
    
    forwardRef(() => UserModule),
   // UserModule, 
    
    ItemModule],
  controllers: [OrderController],
  providers: [OrderServices],
  exports: [OrderServices]
})
export class OrderModule {
  constructor(){
     console.log('OrderModule');
  }
}
