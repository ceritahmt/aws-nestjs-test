import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TitleService } from './title.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Title } from './entities/title.entity';
import { ApiResponse } from '../../common/dto/api-response.dto';

@ApiBearerAuth()
@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @ApiExtraModels(ApiResponse, Title)
  @ApiOkResponse({
    description: 'Create title',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Title) },
          },
        },
      ],
    },
  })
  @Post()
  async create(@Body() createTitleDto: CreateTitleDto) {
    return await this.titleService.create(createTitleDto);
  }

  @ApiExtraModels(ApiResponse, Title)
  @ApiOkResponse({
    description: 'Create title',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { type: 'array', items: { $ref: getSchemaPath(Title) } },
          },
        },
      ],
    },
  })
  @Get()
  async findAll() {
    return await this.titleService.findAll();
  }

  @ApiExtraModels(ApiResponse, Title)
  @ApiOkResponse({
    description: 'Create title',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Title) },
          },
        },
      ],
    },
  })
  @Get(':idOrCode')
  async findOne(@Param('idOrCode') idOrCode: string) {
    return await this.titleService.findOne(idOrCode);
  }

  @ApiExtraModels(ApiResponse, Title)
  @ApiOkResponse({
    description: 'Create title',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(Title) },
          },
        },
      ],
    },
  })
  @Patch(':idOrCode')
  async update(
    @Param('idOrCode') idOrCode: string,
    @Body() updateTitleDto: UpdateTitleDto,
  ) {
    return await this.titleService.update(idOrCode, updateTitleDto);
  }

  @Delete(':idOrCode')
  async remove(@Param('idOrCode') idOrCode: string) {
    return await this.titleService.remove(idOrCode);
  }
}
