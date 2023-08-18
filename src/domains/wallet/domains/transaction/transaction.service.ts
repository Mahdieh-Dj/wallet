import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { TransactionRepository } from "./transaction.repository";
import { TransactionTypeModel } from "./enums/trsnaction-type.enum";

@Injectable()
export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async create(payload: {
    amount: number;
    wallet_id: number;
    tx?: Prisma.TransactionClient;
    type: TransactionTypeModel;
  }) {
    return this.repository.create(
      {
        type: payload.type,
        amount: payload.amount,
        wallet: {
          connect: {
            id: payload.wallet_id,
          },
        },
      },
      payload.tx,
    );
  }
}
