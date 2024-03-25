import { NestFactory } from '@nestjs/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn'],
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Nest example')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('experiment')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // app.setGlobalPrefix('/api');
    await app.listen(3000, () => {
        // console.log('Application is running on: http://localhost:3000/api');
    });
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
