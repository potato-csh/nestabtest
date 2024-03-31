import { ForbiddenException } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { paginate } from '../helpers';
import { PaginateOptions, QueryHook } from '../types';

import { BaseRepository } from './repository';

export class BaseService<E extends ObjectLiteral, R extends BaseRepository<E>> {
    constructor(protected readonly repository: R) {}

    async list(options: any, callback?: QueryHook<E>) {
        const qb = await this.buildListQB(this.repository.buildBaseQB(), options, callback);
        return qb.getMany();
    }

    async paginate(options?: PaginateOptions, callback?: QueryHook<E>) {
        const qb = await this.buildListQB(this.repository.buildBaseQB(), options, callback);
        return paginate(qb, options);
    }

    async detail(id: string, callback?: QueryHook<E>) {
        const qb = await this.buildItemQB(id, this.repository.buildBaseQB(), callback);
        return qb.getOne();
    }

    async delete(id: string) {
        const item = await this.detail(id);
        return this.repository.remove(item);
    }

    create(data: any, ...others: any[]) {
        throw new ForbiddenException(`Can not to create ${this.repository.qbName}!`);
    }

    update(data: any, ...others: any[]) {
        throw new ForbiddenException(`Can not to update ${this.repository.qbName}!`);
    }

    protected async buildItemQB(id: string, qb: SelectQueryBuilder<E>, callback?: QueryHook<E>) {
        qb.where(`${this.repository.qbName}.id = :id`, { id });
        if (callback) {
            callback(qb);
        }
        return qb;
    }

    protected async buildListQB(
        qb: SelectQueryBuilder<E>,
        options?: PaginateOptions,
        callback?: QueryHook<E>,
    ) {
        if (callback) {
            callback(qb);
        }
        return qb;
    }
}
