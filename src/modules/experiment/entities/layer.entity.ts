import { Exclude, Expose } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

import { ExperimentEntity } from '@/modules/experiment/entities/experiment.entity';

@Exclude()
@Entity('abtest_layers')
export class LayerEntity extends BaseEntity {
    @Expose()
    @PrimaryColumn({ comment: '实验图层ID', type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    @Expose()
    @Column({ comment: '实验图层名称', length: 255 })
    name: string;

    @Expose()
    @Column({ comment: '实验图层描述', length: 255 })
    description: string;

    @Expose()
    @Column({ comment: '实验源URL', length: 255 })
    originUrl: string;

    @Expose()
    @Column({ comment: '实验图层拥有者' })
    owner: number;

    @Expose()
    @Column({
        comment: '实验命中hash次数',
    })
    hashSet: string;

    @Expose()
    @CreateDateColumn({
        comment: '实验图层创建时间',
    })
    createTime: Date;

    @Expose()
    @UpdateDateColumn({
        comment: '实验图层更新时间',
    })
    updateTime: Date;

    @OneToMany(() => ExperimentEntity, (experiment) => experiment.layer, {
        cascade: true,
    })
    experiments: Relation<ExperimentEntity[]>;
}
