import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import { ExperimentController } from './controllers/experiment.controller';
import { LayerController } from './controllers/layer.controller';
import * as entities from './entities';
import * as repositories from './repositories';
import { ExperimentService } from './services/experiment.service';
import { LayerService } from './services/layer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(Object.values(entities)),
        DatabaseModule.forRepository(Object.values(repositories)),
    ],
    controllers: [ExperimentController, LayerController],
    providers: [ExperimentService, LayerService],
    exports: [
        ExperimentService,
        LayerService,
        DatabaseModule.forRepository(Object.values(repositories)),
    ],
})
export class ExperimentModule {}
