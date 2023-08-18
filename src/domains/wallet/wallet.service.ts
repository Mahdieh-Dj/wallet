import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TransactionService } from "./domains/transaction/transaction.service";
import { WalletRepository } from "./wallet.repository";
import { UserWalletNotFoundException } from "./exceptions/user-wallet-not-found.exception";
import { TransactionTypeModel } from "./domains/transaction/enums/trsnaction-type.enum";

@Injectable()
export class WalletService {
  constructor(
    private readonly repository: WalletRepository,
    private readonly transactionService: TransactionService,
    private readonly db: PrismaService,
  ) {}

  async getBalance(user_id: number) {
    const wallet = await this.getWalletByUserIdOrThrow(user_id);

    return {
      balance: wallet.balance,
    };
  }

  async changeBalance(user_id: number, amount: number) {
    const wallet = await this.getWalletByUserIdOrThrow(user_id);
    return this.db.$transaction(async tx => {
      await this.repository.update(
        wallet.id,
        {
          balance: wallet.balance + amount,
        },
        tx,
      );

      const createdTrx = await this.transactionService.create({
        amount: amount >= 0 ? amount : -amount,
        type:
          amount >= 0
            ? TransactionTypeModel.Deposit
            : TransactionTypeModel.Withdraw,
        wallet_id: wallet.id,
        tx,
      });

      return {
        refrence_id: createdTrx.id,
      };
    });
  }

  async getWalletByUserIdOrThrow(user_id: number) {
    const wallet = await this.repository.findOneByUserId(user_id);

    if (!wallet) {
      throw new UserWalletNotFoundException();
    }

    return wallet;
  }
}
