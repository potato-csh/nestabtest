import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    SerializeOptions,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AppInterceptor } from '@/modules/core/providers/app.interceptor';

import {
    CreateExperimentDto,
    QueryExperimentDto,
    UpdateExperimentDto,
} from '../dtos/experiment.dto';
import { ExperimentService } from '../services/experiment.service';

@UseInterceptors(AppInterceptor)
@ApiTags('对Experiment的CURD操作')
@Controller('experiment')
export class ExperimentController {
    constructor(protected service: ExperimentService) {}

    /**
     * 获取实验列表
     * @param options
     */
    @Get()
    @SerializeOptions({ groups: ['experiment-list'] })
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
        options: QueryExperimentDto,
    ) {
        return this.service.paginate(options);
    }

    /**
     * 获取实验详情
     * @param id
     */
    @Get(':id')
    @SerializeOptions({ groups: ['experiment-detail'] })
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.detail(id);
    }

    /**
     * 创建实验
     * @param data
     */
    @Post()
    @SerializeOptions({ groups: ['experiment-detail'] })
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
        data: CreateExperimentDto,
    ) {
        return this.service.create(data);
    }

    /**
     * 修改实验
     * @param data
     */
    @Patch()
    @SerializeOptions({ groups: ['experiment-detail'] })
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
        data: UpdateExperimentDto,
    ) {
        return this.service.update(data);
    }

    /**
     * 删除实验
     * @param id
     */
    @Delete(':id')
    @SerializeOptions({ groups: ['experiment-detail'] })
    async delete(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.delete(id);
    }
}
