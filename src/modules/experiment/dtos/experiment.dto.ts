import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDate,
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsUUID,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import { toNumber } from 'lodash';

import { DtoValidation } from '@/modules/core/decorators/dto-validation.decorator';
import { PaginateOptions } from '@/modules/database/types';

import { ExperimentStatus, SamplingType, TestType } from '../constants';

@DtoValidation({ type: 'query' })
export class QueryExperimentDto implements PaginateOptions {
    /**
     * 实验名称
     */
    @IsOptional()
    name?: string;

    /**
     * 实验状态
     */
    @IsEnum(ExperimentStatus, {
        message: `状态只能是${Object.values(ExperimentStatus).join('、')}`,
    })
    @IsOptional()
    status?: ExperimentStatus;

    /**
     * 实验图层
     */
    @IsOptional()
    layer?: string;

    /**
     * 页数, 不能小于1
     */
    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '页码不能小于1' })
    @IsNumber()
    @IsOptional()
    page?: number = 1;

    /**
     * 每页条数, 不能小于1
     */
    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '每页条数不能小于1' })
    @IsNumber()
    @IsOptional()
    limit?: number = 10;
}

@DtoValidation({ groups: ['create'] })
export class CreateExperimentDto {
    /**
     * 实验名称
     */
    @MaxLength(255, { always: true, message: '实验名称长度不能超过$constraint1' })
    name: string;

    /**
     * 实验描述
     */
    @MaxLength(1024, { always: true, message: '实验描述的长度不能超过$constraint1' })
    @IsOptional({ always: true })
    description?: string;

    /**
     * 实验图层ID
     */
    @IsUUID(undefined, { always: true, message: '实验图层ID不合法' })
    layer: string;

    /**
     * 源URL
     */
    @MaxLength(512, { always: true, message: '源URL的长度不能超过$constraint1' })
    originUrl: string;

    /**
     * 测试类型
     */
    @IsEnum(TestType, {
        always: true,
        message: `测试类型只能是${Object.values(TestType).join('、')}`,
    })
    testType: TestType;

    /**
     * 测试URL
     */
    @MaxLength(512, { always: true, message: '测试URL的长度不能超过$constraint1' })
    testUrl: string;

    /**
     * 采样类型
     */
    @IsEnum(SamplingType, {
        always: true,
        message: `采样率类型只能是${Object.values(SamplingType).join('、')}`,
    })
    samplingType: SamplingType;

    /**
     * 采样率(1-50)
     */
    @Transform(({ value }) => toNumber(value))
    @IsNumber(undefined, { always: true, message: '采样率不为数字' })
    @Min(1, { always: true, message: '采样率不能小于1' })
    @Max(50, { always: true, message: '采样率不能大于50' })
    samplingRate: number;

    /**
     * 自定义采样范围
     */
    @MaxLength(255, { message: '自定义采样范围的长度不能超过$constraint1' })
    @IsOptional({ always: true })
    customSamplingRange?: string;

    /**
     * 白名单
     */
    @MaxLength(2048, { message: '白名单的长度不能超过$constraint1' })
    @IsOptional({ always: true })
    whiteList?: string;

    /**
     * 黑名单
     */
    @MaxLength(2048, { message: '黑名单的长度不能超过$constraint1' })
    @IsOptional({ always: true })
    balackList?: string;

    /**
     * 预启动时间
     */
    @IsDate()
    @IsOptional({ always: true })
    startTimePreset?: Date;

    /**
     * 预停止时间
     */
    @IsDate()
    @IsOptional({ always: true })
    endTimePreset?: Date;
}

@DtoValidation({ groups: ['update'] })
export class UpdateExperimentDto extends PartialType(CreateExperimentDto) {
    /**
     * 实验ID
     */
    @IsUUID(undefined, { groups: ['update'], message: '实验ID不合法' })
    @IsDefined({ groups: ['update'], message: '实验ID必须指定' })
    id: string;
}
