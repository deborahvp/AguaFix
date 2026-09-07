import { IsString, IsNotEmpty, IsIn, IsMobilePhone } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  @IsNotEmpty()
  severity: string;

  @IsString()
  @IsNotEmpty()
  reporterPhone: string;
}
