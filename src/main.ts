import { NestFactory } from '@nestjs/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn'],
        cors: true,
    });
    app.setGlobalPrefix('/api');
    await app.listen(3000, () => {
        console.log('Application is running on: http://localhost:3000/api');
    });
}
bootstrap();
