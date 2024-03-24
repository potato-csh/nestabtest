import { Repository } from 'typeorm';

import { CustomRepository } from '@/modules/database/decorators';

import { ExperimentEntity } from '../entities/experiment.entity';

@CustomRepository(ExperimentEntity)
export class ExperimentRepository extends Repository<ExperimentEntity> {
    buildBaseQB() {
        return this.createQueryBuilder('experiment');
    }
}
