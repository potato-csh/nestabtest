import { Injectable } from '@nestjs/common';

import { omit } from 'lodash';
import { EntityNotFoundError } from 'typeorm';

import { BaseService } from '@/modules/database/base/service';
import { PaginateOptions, QueryHook } from '@/modules/database/types';

import { CreateLayerDto, UpdateLayerDto } from '../dtos/layer.dto';
import { LayerEntity } from '../entities';
import { LayerRepository } from '../repositories';

@Injectable()
export class LayerService extends BaseService<LayerEntity, LayerRepository> {
    constructor(protected repository: LayerRepository) {
        super(repository);
    }

    /**
     * 查询实验分页数据
     * @param options
     * @param callback
     */
    async paginate(options: PaginateOptions, callback?: QueryHook<LayerEntity>) {
        return super.paginate(options, callback);
    }

    /**
     * 查询实验详情
     * @param id
     * @param callback
     */
    async detail(id: string, callback?: QueryHook<LayerEntity>) {
        const item = await super.detail(id, callback);
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
        return super.delete(id);
    }
}
