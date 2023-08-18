import { ApiProperty } from "@nestjs/swagger";

export class ChangeUserWalletBalanceResponseDto {
  @ApiProperty({
    description: "شناسه تراکنش",
  })
  refrence_id: number;
}
