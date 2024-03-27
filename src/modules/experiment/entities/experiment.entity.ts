import { Exclude, Expose } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

import { LayerEntity } from '@/modules/experiment/entities/layer.entity';

import { ExperimentStatus, SamplingType, TestType } from '../constants';

@Exclude()
@Entity('abtest_experiments')
export class ExperimentEntity extends BaseEntity {
    @Expose()
    @PrimaryColumn({ comment: '实验ID', type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    @Expose()
    @Column({ comment: '实验名称' })
    name: string;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验描述', length: 1024, nullable: true })
    description: string;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '源URL', length: 512 })
    originUrl: string;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验测试类型', type: 'varchar', default: TestType.ABTEST })
    testType: TestType;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验测试URL', length: 512 })
    testUrl: string;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验采样类型', type: 'varchar', default: SamplingType.AUTOMATIC })
    samplingType: SamplingType;

    @Expose()
    @Column({ comment: '实验采样率', default: 10 })
    samplingRate: number;

    @Expose()
    @Column({
        comment: '实验状态',
        type: 'varchar',
        default: ExperimentStatus.PENDING,
    })
    status: ExperimentStatus;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验白名单', length: 2048, nullable: true })
    whiteList: string;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验黑名单', length: 2048, nullable: true })
    blackList: string;

    // @Expose()
    // @Column({ comment: '实验拥有者' })
    // owner: number;

    // @Expose()
    // @Column({ comment: '实验创建者' })
    // starter: number;

    // @Expose()
    // @Column({ comment: '实验结束者' })
    // ender: number;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验命中次数', nullable: true, default: 0 })
    hitCount: number;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验命中key次数', nullable: true, default: 0 })
    hitKeyCount: number;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验命中hash次数', length: 512, nullable: true })
    hashSet: string;

    @Expose()
    @Column({ comment: '实验预测开始时间', nullable: true })
    startTimePreset: Date;

    @Expose()
    @Column({ comment: '实验预测结束时间', nullable: true })
    endTimePreset: Date;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验实际开始时间', nullable: true })
    startTimeReal: Date;

    @Expose({ groups: ['experiment-detail'] })
    @Column({ comment: '实验实际结束时间', nullable: true })
    endTimeReal: Date;

    @Expose()
    @CreateDateColumn({
        comment: '实验创建时间',
    })
    createTime: Date;

    @Expose()
    @UpdateDateColumn({
        comment: '实验更新时间',
    })
    updateTime: Date;

    @Expose()
    @ManyToOne(() => LayerEntity, (layer) => layer.experiments, {
        onDelete: 'SET NULL',
    })
    layer: Relation<LayerEntity>;
}
