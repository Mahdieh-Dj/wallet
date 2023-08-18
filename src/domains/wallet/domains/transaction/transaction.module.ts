import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";
import { ProcessorModule } from "./modules/processor/processor.module";

@Module({
  imports: [ProcessorModule],
  providers: [PrismaService, TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
