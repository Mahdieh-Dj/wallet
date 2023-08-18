import { Injectable } from "@nestjs/common";
// Repositories
import { WalletRepository } from "./wallet.repository";
// Exceptions
import { UserWalletNotFoundException } from "./exceptions/user-wallet-not-found.exception";

@Injectable()
export class WalletService {
  constructor(private readonly repository: WalletRepository) {}

  async getBalance(user_id: number) {
    const wallet = await this.repository.findOneByUserId(user_id);

    if (!wallet) {
      throw new UserWalletNotFoundException();
    }

    return {
      balance: wallet.balance,
    };
  }
}
