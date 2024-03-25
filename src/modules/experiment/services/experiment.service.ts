import { Injectable } from '@nestjs/common';

import { omit } from 'lodash';
import { EntityNotFoundError } from 'typeorm';

import { paginate } from '@/modules/database/helpers';
import { QueryHook } from '@/modules/database/types';

import {
    CreateExperimentDto,
    QueryExperimentDto,
    UpdateExperimentDto,
} from '../dtos/experiment.dto';
import { ExperimentEntity } from '../entities';
import { ExperimentRepository } from '../repositories/experiment.repository';

@Injectable()
export class ExperimentService {
    constructor(protected repository: ExperimentRepository) {}

    /**
     * 查询实验分页数据
     * @param options
     * @param callback
     */
    async paginate(options: QueryExperimentDto, callback?: QueryHook<ExperimentEntity>) {
        const qb = this.repository.buildBaseQB();
        if (callback) {
            callback(qb);
        }
        return paginate(qb, options);
    }

    /**
     * 查询实验详情
     * @param id
     * @param callback
     */
    async detail(id: string, callback?: QueryHook<ExperimentEntity>) {
        const qb = this.repository.buildBaseQB();
        qb.where('experiment.id = :id', { id });
        qb.leftJoinAndSelect('experiment.layer', 'layer');
        if (callback) {
            callback(qb);
        }
        const item = await qb.getOne();
        if (!item)
            throw new EntityNotFoundError(ExperimentEntity, `The experiment ${id} not exists!`);
        return item;
    }

    /**
     * 创建实验
     * @param data
     */
    async create(data: CreateExperimentDto) {
        const item = await this.repository.save(data);
        return this.detail(item.id);
    }

    /**
     * 更新实验
     * @param id
     * @param data
     */
    async update(data: UpdateExperimentDto) {
        await this.repository.update(data.id, omit(data, [data.id]));
        return this.detail(data.id);
    }

    /**
     * 删除实验
     * @param id
     */
    async delete(id: string) {
        const item = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(item);
    }
}
