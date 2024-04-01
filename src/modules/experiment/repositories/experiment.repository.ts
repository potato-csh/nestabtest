import { BaseRepository } from '@/modules/database/base/repository';
import { CustomRepository } from '@/modules/database/decorators';

import { SamplingType } from '../constants';
import { CreateExperimentDto, UpdateExperimentDto } from '../dtos/experiment.dto';
import { LayerEntity } from '../entities';
import { ExperimentEntity } from '../entities/experiment.entity';

@CustomRepository(ExperimentEntity)
export class ExperimentRepository extends BaseRepository<ExperimentEntity> {
    protected _qbName = 'experiment';

    buildBaseQB() {
        return super.buildBaseQB().leftJoinAndSelect(`${this.qbName}.layer`, 'layer');
    }

    // 生成hashset
    async generateHashSet(
        experiment: ExperimentEntity,
        layer: LayerEntity,
        data: CreateExperimentDto | UpdateExperimentDto,
    ) {
        const { samplingType, samplingRate } = data;
        let experimentHashSet: string;
        let layerHashSet: string;
        const experimentHashSetList = JSON.parse(experiment.hashSet);
        const layerHashSetList = JSON.parse(layer.hashSet);
        // 根据不同的采样类型更新hashSet
        if (samplingType === SamplingType.AUTOMATIC) {
            // 如果是update，不更新hashSet
            // 需要将experiment原始hashset和layer的hashset结合再进行切片
            // 然后再合并
            // 原先是[0,1,2,3,4,5,6,7,8,9]
            // experiment: [0,1,2]
            // layer:[3,4,5,6,7,8,9]
            experimentHashSet = JSON.stringify(layerHashSetList.slice(0, samplingRate));
            layerHashSet = JSON.stringify(layerHashSetList.slice(samplingRate));
        } else if (samplingType === SamplingType.CUSTOM) {
            experimentHashSet = data.customSamplingRange;
            layerHashSet = JSON.stringify(
                JSON.parse(layer.hashSet).filter(
                    (value: any) => !experimentHashSetList.includes(value),
                ),
            );
        }

        return { experimentHashSet, layerHashSet };
    }
}
