import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/item/item.module';
import { OrderModule } from 'src/order/order.module';
import { User } from './entities/user.entity';
import { Users_address } from './entities/userAddress.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserMiddleware } from './user.middleware';
import { UserService } from './user.service';




@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User,Users_address]),
    


  
    forwardRef(() => ItemModule),
  forwardRef(() => OrderModule)
 // OrderModule
],

  controllers: [UserController],

  providers: [
    UserService,
    JwtStrategy
  ],

  exports: [
    UserService,
    JwtStrategy,
    PassportModule,
   ]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddleware).forRoutes("users");
    }
    
} 
    
