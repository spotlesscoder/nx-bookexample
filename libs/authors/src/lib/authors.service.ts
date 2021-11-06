import { Author, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

@Injectable()
export class AuthorsService {
  public getAuthors(): Promise<Author[]> {
    return prisma.author.findMany();
  }

  public createAuthor(author: Author): Promise<Author> {
    return prisma.author.create({
      data: {
        firstName: author.firstName,
        lastName: author.lastName,
        birthTimestamp: author.birthTimestamp,
      },
    });
  }

  public updateAuthor(author: Author): Promise<Author> {
    return prisma.author.update({ where: { id: author.id }, data: author });
  }
}
