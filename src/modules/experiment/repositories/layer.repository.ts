import { Repository } from 'typeorm';

import { CustomRepository } from '@/modules/database/decorators';

import { LayerEntity } from '../entities/layer.entity';

@CustomRepository(LayerEntity)
export class ExperimentRepository extends Repository<LayerEntity> {
    buildBaseQB() {
        return this.createQueryBuilder('layer');
    }
}
