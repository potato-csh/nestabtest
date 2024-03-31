import { BaseRepository } from '@/modules/database/base/repository';
import { CustomRepository } from '@/modules/database/decorators';

import { ExperimentEntity } from '../entities/experiment.entity';
import { SamplingType } from '../constants';

@CustomRepository(ExperimentEntity)
export class ExperimentRepository extends BaseRepository<ExperimentEntity> {
    protected _qbName = 'experiment';

    buildBaseQB() {
        return super.buildBaseQB().leftJoinAndSelect(`${this.qbName}.layer`, 'layer');
    }

    // @BeforeInsert()
    // @BeforeUpdate()
    // @BeforeRemove()
    async updateHashSet(
        samplingType: SamplingType,
        samplingRate: number,
        customSamplingRange?: string,
    ) {
        if (this.layer) {
            if (samplingType === SamplingType.AUTOMATIC) {
                this.hashSet = this.layer.hashSet
                    .split(',')
                    .map((i) => i.slice(samplingRate))
                    .join(',');
            } else if (samplingType === SamplingType.CUSTOM) {
                // [10,19]
                this.hashSet = customSamplingRange;
            }
            // 更新实验图层和实验的hashSet
            this.layer.hashSet = this.hashSet;
            this.save();
            await this.layer.save();
        }
    }
}
