import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class GetUserWalletBalanceParamsDto {
  @ApiProperty({
    type: Number,
  })
  @Transform(object => +object.value)
  @IsNumber()
  @Min(1)
  user_id: number;
}
