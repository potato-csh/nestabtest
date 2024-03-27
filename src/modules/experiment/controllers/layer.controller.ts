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
    UseInterceptors,
    SerializeOptions,
    ValidationPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AppInterceptor } from '@/modules/core/providers/app.interceptor';

import { CreateLayerDto, QueryLayerDto, UpdateLayerDto } from '../dtos/layer.dto';
import { LayerService } from '../services/layer.service';

@UseInterceptors(AppInterceptor)
@ApiTags('对Layer的CURD操作')
@Controller('layer')
export class LayerController {
    constructor(protected service: LayerService) {}

    /**
     * 获取实验图层列表
     * @param options
     */
    @Get()
    @SerializeOptions({ groups: ['layer-list'] })
    async list(
        @Query(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: {
                    target: false,
                },
            }),
        )
        options: QueryLayerDto,
    ) {
        return this.service.paginate(options);
    }

    /**
     * 获取实验图层详情
     * @param id
     */
    @Get(':id')
    @SerializeOptions({ groups: ['layer-detail'] })
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
    @SerializeOptions({ groups: ['layer-detail'] })
    async create(
        @Body(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: {
                    target: false,
                },
                groups: ['create'],
            }),
        )
        data: CreateLayerDto,
    ) {
        return this.service.create(data);
    }

    /**
     * 更新实验图层
     * @param data
     */
    @Patch()
    @SerializeOptions({ groups: ['layer-detail'] })
    async update(
        @Body(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: {
                    target: false,
                },
                groups: ['update'],
            }),
        )
        data: UpdateLayerDto,
    ) {
        return this.service.update(data);
    }

    /**
     * 删除实验图层
     * @param id
     */
    @Delete(':id')
    @SerializeOptions({ groups: ['layer-detail'] })
    async delete(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.delete(id);
    }
}
