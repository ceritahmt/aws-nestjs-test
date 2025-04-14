import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { Title } from './entities/title.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Title])],
  controllers: [TitleController],
  providers: [TitleService],
  exports: [TitleService],
})
export class TitleModule {}
