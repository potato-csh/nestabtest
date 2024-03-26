import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class CreateLayerDto {
    /**
     * 图层名称
     */
    @MaxLength(255, { always: true, message: '实验图层名称的长度不能$constraints1' })
    name: string;

    /**
     * 图层类型
     */
    @MaxLength(255, { always: true, message: '实验图层类型的长度不能$constraints1' })
    type: string;

    /**
     * 图层描述
     */
    @MaxLength(255, { message: '实验图层描述的长度不能$constraints1' })
    @IsOptional({ always: true })
    description?: string;

    /**
     * 图层链接
     */
    @MaxLength(255, { always: true, message: '实验源URL的长度不能$constraints1' })
    originUrl: string;
}

export class UpdateLayerDto extends PartialType(CreateLayerDto) {
    /**
     * 图层ID
     */
    @IsUUID(undefined, { groups: ['update'], message: '实验图层ID的格式不正确' })
    @IsDefined({ groups: ['update'], message: '实验图层ID不能为空' })
    id: string;
}
