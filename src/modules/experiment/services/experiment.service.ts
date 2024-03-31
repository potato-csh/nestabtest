import { Injectable } from '@nestjs/common';

import { isNil, omit } from 'lodash';
import { EntityNotFoundError, SelectQueryBuilder } from 'typeorm';

import { BaseService } from '@/modules/database/base/service';
import { QueryHook } from '@/modules/database/types';

import {
    CreateExperimentDto,
    QueryExperimentDto,
    UpdateExperimentDto,
} from '../dtos/experiment.dto';
import { ExperimentEntity } from '../entities';
import { LayerRepository } from '../repositories';
import { ExperimentRepository } from '../repositories/experiment.repository';

@Injectable()
export class ExperimentService extends BaseService<ExperimentEntity, ExperimentRepository> {
    constructor(
        protected repository: ExperimentRepository,
        protected layerRepository: LayerRepository,
    ) {
        super(repository);
    }

    /**
     * 查询实验分页数据
     * @param options
     * @param callback
     */
    async paginate(options: QueryExperimentDto) {
        const addQuery = async (qb: SelectQueryBuilder<ExperimentEntity>) => {
            if (!isNil(options.name))
                qb.andWhere('experiment.name LIKE :name', { name: `%${options.name}%` });
            if (!isNil(options.status))
                qb.andWhere('status =: status', { status: `${options.status}` });
            if (!isNil(options.layer))
                qb.andWhere('layerId =: layer', { layer: `${options.layer}` });
            return qb;
        };

        return super.paginate(options, addQuery);
    }

    /**
     * 查询实验详情
     * @param id
     * @param callback
     */
    async detail(id: string, callback?: QueryHook<ExperimentEntity>) {
        const item = await super.detail(id, callback);
        if (!item)
            throw new EntityNotFoundError(ExperimentEntity, `The experiment ${id} not exists!`);
        return item;
    }

    /**
     * 创建实验
     * @param data
     */
    async create(data: CreateExperimentDto) {
        const createExperimentDto = {
            ...data,
            layer: !isNil(data.layer)
                ? await this.layerRepository.findOneOrFail({
                      where: { id: data.layer, originUrl: data.originUrl },
                  })
                : null,
        };
        const item = await this.repository.save(createExperimentDto);
        // 更新实验以及实验图层的hashSet
        await item.updateHashSet(data.samplingType, data.samplingRate, data.customSamplingRange);
        return this.detail(item.id);
    }

    /**
     * 更新实验
     * @param id
     * @param data
     */
    async update(data: UpdateExperimentDto) {
        const experiment = await this.detail(data.id);
        const layer = !isNil(data.layer)
            ? await this.layerRepository.findOneOrFail({
                  where: { id: data.layer, originUrl: data.originUrl },
              })
            : null;
        experiment.layer = layer;
        await this.repository.save(experiment, { reload: true });
        await this.repository.update(data.id, omit(data, ['id', 'layer']));
        return this.detail(data.id);
    }

    /**
     * 删除实验
     * @param id
     */
    async delete(id: string) {
        return super.delete(id);
    }
}
