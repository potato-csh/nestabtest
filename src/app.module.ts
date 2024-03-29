import { Module } from '@nestjs/common';

import { database } from './config';
import { AppFilter } from './modules/core/providers/app.filter';
import { AppInterceptor } from './modules/core/providers/app.interceptor';
import { AppPipe } from './modules/core/providers/app.pipe';
import { DatabaseModule } from './modules/database/database.module';
import { ExperimentModule } from './modules/experiment/experiment.module';

@Module({
    imports: [ExperimentModule, DatabaseModule.forRoot(database)],
    controllers: [],
    providers: [
        {
            provide: 'APP_PIPE',
            useValue: new AppPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: {
                    target: false,
                },
            }),
        },
        {
            provide: 'APP_INTERCEPTOR',
            useClass: AppInterceptor,
        },
        {
            provide: 'APP_FILTER',
            useClass: AppFilter,
        },
    ],
})
export class AppModule {}
