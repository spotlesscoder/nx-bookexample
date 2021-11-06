import { Author, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

@Injectable()
export class AuthorsService {

    public getAuthors(): Promise<Author[]> {
        return prisma.author.findMany();
    }

    public saveAuthor(author: Author): Promise<Author> {
        return prisma.author.upsert({
            where: {
                id: author.id,
            },
            update: {
                ...author
            },
            create: {
                ...author
            }
        });
    }
}
