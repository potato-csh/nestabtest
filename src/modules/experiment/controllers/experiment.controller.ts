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
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
    CreateExperimentDto,
    QueryExperimentDto,
    UpdateExperimentDto,
} from '../dtos/experiment.dto';
import { ExperimentService } from '../services/experiment.service';

@ApiBearerAuth()
@ApiTags('experiment')
@Controller('experiment')
export class ExperimentController {
    constructor(protected service: ExperimentService) {}

    @Get()
    @ApiOperation({ summary: 'Get experiment list' })
    async list(
        @Query()
        options: QueryExperimentDto,
    ) {
        return this.service.paginate(options);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get experiment detail' })
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.detail(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create experiment' })
    async create(
        @Body()
        data: CreateExperimentDto,
    ) {
        return this.service.create(data);
    }

    @Patch()
    @ApiOperation({ summary: 'Update experiment' })
    async update(
        @Body()
        data: UpdateExperimentDto,
    ) {
        return this.service.update(data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete experiment' })
    async delete(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.delete(id);
    }
}
