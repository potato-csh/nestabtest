import { Injectable } from '@nestjs/common';

import { omit } from 'lodash';
import { EntityNotFoundError } from 'typeorm';

import { paginate } from '@/modules/database/helpers';
import { PaginateOptions, QueryHook } from '@/modules/database/types';

import { CreateLayerDto, UpdateLayerDto } from '../dtos/layer.dto';
import { LayerEntity } from '../entities';
import { LayerRepository } from '../repositories';

@Injectable()
export class LayerService {
    constructor(protected repository: LayerRepository) {}

    /**
     * 查询实验分页数据
     * @param options
     * @param callback
     */
    async paginate(options: PaginateOptions, callback?: QueryHook<LayerEntity>) {
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
    async detail(id: string, callback?: QueryHook<LayerEntity>) {
        const qb = this.repository.buildBaseQB();
        qb.where('layer.id = :id', { id });
        if (callback) {
            callback(qb);
        }
        const item = await qb.getOne();
        if (!item) throw new EntityNotFoundError(LayerEntity, `The layer ${id} not exists!`);
        return item;
    }

    /**
     * 创建实验
     * @param data
     */
    async create(data: CreateLayerDto) {
        const item = await this.repository.save(data);
        return this.detail(item.id);
    }

    /**
     * 更新实验
     * @param id
     * @param data
     */
    async update(data: UpdateLayerDto) {
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
