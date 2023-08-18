import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class TransactionRepository {
  constructor(private readonly db: PrismaService) {}

  async findMany(where: Prisma.TransactionWhereInput) {
    return this.db.transaction.findMany({
      where,
      select: {
        amount: true,
        type: true,
      },
    });
  }

  async create(
    data: Prisma.TransactionCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    return (tx ? tx : this.db).transaction.create({
      data,
    });
  }
}
