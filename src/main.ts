import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/exception.filter';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(cookieParser());
    await app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
