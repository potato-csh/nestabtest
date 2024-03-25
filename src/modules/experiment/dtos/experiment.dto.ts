import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
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

import { PaginateOptions } from '@/modules/database/types';

import { ExperimentStatus, SamplingType, TestType } from '../constants';

export class QueryExperimentDto implements PaginateOptions {
    @ApiPropertyOptional()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ enum: ExperimentStatus })
    @IsEnum(ExperimentStatus, {
        message: `状态只能是${Object.values(ExperimentStatus).join('、')}`,
    })
    @IsOptional()
    status?: ExperimentStatus;

    @ApiPropertyOptional()
    @IsOptional()
    layer?: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '页码不能小于1' })
    @IsNumber()
    @IsOptional()
    page = 1;

    @ApiPropertyOptional()
    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '每页条数不能小于1' })
    @IsNumber()
    @IsOptional()
    limit = 10;
}

export class CreateExperimentDto {
    @ApiProperty({ description: '实验名称', maxLength: 255 })
    @MaxLength(255, { always: true, message: '实验名称长度不能超过$constraint1' })
    name: string;

    @ApiPropertyOptional({ description: '实验描述', maxLength: 1024 })
    @MaxLength(1024, { always: true, message: '实验描述的长度不能超过$constraint1' })
    @IsOptional()
    description?: string;

    @ApiProperty({ description: '实验图层ID' })
    @IsUUID(undefined, { message: '实验图层ID不合法' })
    layerId: string;

    @ApiProperty({ description: '源URL', maxLength: 512 })
    @MaxLength(512, { message: '源URL的长度不能超过$constraint1' })
    originUrl: string;

    @ApiProperty({ description: '测试类型', enum: TestType })
    @IsEnum(TestType, {
        always: true,
        message: `测试类型只能是${Object.values(TestType).join('、')}`,
    })
    testType: TestType;

    @ApiProperty({ description: '测试URL', maxLength: 512 })
    @MaxLength(512, { message: '测试URL的长度不能超过$constraint1' })
    testUrl: string;

    @ApiProperty({ description: '采样类型', enum: SamplingType })
    @IsEnum(TestType, {
        always: true,
        message: `采样率类型只能是${Object.values(SamplingType).join('、')}`,
    })
    samplingType: SamplingType;

    @ApiProperty({ description: '采样率', minimum: 1, maximum: 50 })
    @Transform(({ value }) => toNumber(value))
    @Min(1, { message: '采样率不能小于1' })
    @Max(50, { message: '采样率不能大于50' })
    @IsNumber()
    samplingRate: number;

    @ApiPropertyOptional({ description: '白名单', maxLength: 2048 })
    @MaxLength(2048, { message: '白名单的长度不能超过$constraint1' })
    @IsOptional()
    whiteList?: string;

    @ApiPropertyOptional({ description: '黑名单', maxLength: 2048 })
    @MaxLength(2048, { message: '黑名单的长度不能超过$constraint1' })
    @IsOptional()
    balackList?: string;

    @ApiPropertyOptional({ description: '预启动时间' })
    @IsDate()
    @IsOptional()
    startTimePreset?: Date;

    @ApiPropertyOptional({ description: '预停止时间' })
    @IsDate()
    @IsOptional()
    endTimePreset?: Date;
}

export class UpdateExperimentDto extends PartialType(CreateExperimentDto) {
    @ApiProperty({ description: '实验ID' })
    @IsUUID(undefined, { groups: ['update'], message: '实验ID不合法' })
    @IsDefined({ groups: ['update'], message: '实验ID必须指定' })
    id: string;
}
