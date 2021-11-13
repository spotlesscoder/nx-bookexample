import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

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
  publishTimestamp: Date | null;
  bookTitle: string;
  bookPrice: number;
}
