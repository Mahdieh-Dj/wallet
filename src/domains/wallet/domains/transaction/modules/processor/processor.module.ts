import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ProcessorService } from "./processor.service";
import { TransactionRepository } from "../../transaction.repository";
import { PrismaService } from "nestjs-prisma";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PrismaService, TransactionRepository, ProcessorService],
})
export class ProcessorModule {}
