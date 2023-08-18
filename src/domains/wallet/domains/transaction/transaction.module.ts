import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";

@Module({
  controllers: [],
  providers: [PrismaService, TransactionService, TransactionRepository],
  exports: [],
})
export class TransactionModule {}
