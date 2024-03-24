import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExperimentController } from './controllers/experiment.controller';
import { LayerController } from './controllers/layer.controller';
import * as entities from './entities';

@Module({
    imports: [TypeOrmModule.forFeature(Object.values(entities))],
    controllers: [ExperimentController, LayerController],
})
export class ExperimentModule {}
