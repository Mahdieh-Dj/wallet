import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
// Services
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class WalletRepository {
  constructor(private readonly db: PrismaService) {}

  async findOneByUserId(user_id: number) {
    return this.db.wallet.findFirst({
      where: {
        user_id,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.WalletUpdateInput,
    tx?: Prisma.TransactionClient,
  ) {
    return (tx ? tx : this.db).wallet.update({
      where: {
        id,
      },
      data,
    });
  }
}
