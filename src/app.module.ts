import { Module } from '@nestjs/common';

import { database } from './config';
import { DatabaseModule } from './modules/database/database.module';
import { ExperimentModule } from './modules/experiment/experiment.module';

@Module({
    imports: [ExperimentModule, DatabaseModule.forRoot(database)],
    controllers: [],
    providers: [],
})
export class AppModule {}
