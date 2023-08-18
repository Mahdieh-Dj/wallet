import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { PrismaService } from "nestjs-prisma";
import { WalletRepository } from "./wallet.repository";
import { WalletController } from "./wallet.controller";
import { TransactionModule } from "./domains/transaction/transaction.module";

@Module({
  imports: [TransactionModule],
  controllers: [WalletController],
  providers: [PrismaService, WalletService, WalletRepository],
  exports: [WalletService, WalletRepository],
})
export class WalletModule {}
