import {
    Controller,
    Body,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { PaginateOptions } from '@/modules/database/types';

import { CreateLayerDto, UpdateLayerDto } from '../dtos/layer.dto';
import { LayerService } from '../services/layer.service';

@ApiTags('对Layer的CURD操作')
@Controller('layer')
export class LayerController {
    constructor(protected service: LayerService) {}

    /**
     * 获取实验图层列表
     * @param options
     */
    @Get()
    async list(
        @Query()
        options: PaginateOptions,
    ) {
        return this.service.paginate(options);
    }

    /**
     * 获取实验图层详情
     * @param id
     */
    @Get(':id')
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.detail(id);
    }

    /**
     * 创建实验图层
     * @param data
     */
    @Post()
    async create(
        @Body()
        data: CreateLayerDto,
    ) {
        return this.service.create(data);
    }

    /**
     * 更新实验图层
     * @param data
     */
    @Patch()
    async update(
        @Body()
        data: UpdateLayerDto,
    ) {
        return this.service.update(data);
    }

    /**
     * 删除实验图层
     * @param id
     */
    @Delete(':id')
    async delete(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.delete(id);
    }
}
