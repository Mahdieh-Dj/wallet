import { Injectable } from "@nestjs/common";
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
}
