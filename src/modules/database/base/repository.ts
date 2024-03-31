import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<E extends ObjectLiteral> extends Repository<E> {
    /**
     * 抽象模型查询名称
     */
    protected abstract _qbName: string;

    /**
     * 返回查询名称
     */
    get qbName() {
        return this._qbName;
    }

    buildBaseQB(): SelectQueryBuilder<E> {
        return this.createQueryBuilder(this.qbName);
    }
}
