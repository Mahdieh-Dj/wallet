import { ApiProperty } from "@nestjs/swagger";

export class GetUserWalletBalanceResponseDto {
  @ApiProperty({
    description: "موجودی کیف پول",
  })
  balance: number;
}
