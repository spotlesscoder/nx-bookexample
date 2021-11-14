import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class CreateAutobiographyProcessDto {
  authorFirstName: string;
  authorLastName: string;
  @Type(() => Date)
  @IsDate()
  authorBirthTimestamp: Date;
  @Type(() => Date)
  @IsDate()
  writeStartTimestamp: Date;
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  publishTimestamp: Date | null;
  bookTitle: string;
  bookPrice: number;
}
