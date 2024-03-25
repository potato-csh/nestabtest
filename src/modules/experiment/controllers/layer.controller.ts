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

import { PaginateOptions } from '@/modules/database/types';

import { LayerService } from '../services/layer.service';

@Controller('layer')
export class LayerController {
    constructor(protected service: LayerService) {}

    @Get()
    async list(
        @Query()
        options: PaginateOptions,
    ) {
        return this.service.paginate(options);
    }

    @Get(':id')
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.detail(id);
    }

    @Post()
    async create(
        @Body()
        data: Record<string, any>,
    ) {
        return this.service.create(data);
    }

    @Patch()
    async update(
        @Body()
        data: Record<string, any>,
    ) {
        return this.service.update(data);
    }

    @Delete(':id')
    async delete(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.delete(id);
    }
}
