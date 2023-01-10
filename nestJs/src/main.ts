import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule); //NestFactory is the abstraction of express.js and node.js
  await app.listen(3000);
}
bootstrap();
