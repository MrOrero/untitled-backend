import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSignDocumentStepDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  overview: string;
}
