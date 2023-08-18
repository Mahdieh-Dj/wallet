import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { TransactionRepository } from "../../transaction.repository";
import { TransactionTypeModel } from "../../enums/trsnaction-type.enum";

@Injectable()
export class ProcessorService {
  private readonly logger = new Logger(ProcessorService.name);

  constructor(private readonly transactionRepository: TransactionRepository) {}

  @Cron("0 34 7 * * *")
  async processor() {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(0);

    const trxList = await this.transactionRepository.findMany({
      createdAt: {
        gte: start,
        lte: end,
      },
    });
    let totalDepositAmount = 0;
    let totalWithdrawAmount = 0;
    let totalAmount = 0;

    for (const tx of trxList) {
      totalAmount += tx.amount;
      if (tx.type === TransactionTypeModel.Deposit) {
        totalDepositAmount += tx.amount;
      } else {
        totalWithdrawAmount += tx.amount;
      }
    }
    this.logger.log({
      transactionStats: {
        totalAmount,
        totalDepositAmount,
        totalWithdrawAmount,
      },
    });
  }
}
