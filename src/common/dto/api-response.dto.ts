import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({
    example: 200,
    description: 'Http status code',
    nullable: false,
  })
  statusCode: number;

  @ApiProperty({
    example: 'message',
    description: 'Message',
    nullable: false,
  })
  message: string;

  data: T;
}
