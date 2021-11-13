import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class BooksOfAuthorsDto {
  authorId: string;
  bookId: string;
  @Type(() => Date)
  @IsDate()
  assignedAt: Date;
  assignedBy: string;
}
