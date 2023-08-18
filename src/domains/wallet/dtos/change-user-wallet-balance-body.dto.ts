import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ChangeUserWalletBalanceBodyDto {
  @ApiProperty({
    description: "مبلغ شارژ کیف پول",
    type: Number,
  })
  @IsNumber()
  amount: number;
}
