import { Controller, Get, Param } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { GetUserWalletBalanceParamsDto } from "./dtos/get-user-wallet-balance-params.dto";
import { GetUserWalletBalanceResponseDto } from "./dtos/get-user-wallet-balance-response.dto";

@Controller()
@ApiTags("Wallets")
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @ApiOperation({
    summary: "سرویس دریافت اعتبار کیف پول کاربر",
  })
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(GetUserWalletBalanceResponseDto),
    },
  })
  @Get("users/:user_id/wallet/balance")
  async getBalance(@Param() params: GetUserWalletBalanceParamsDto) {
    return this.service.getBalance(params.user_id);
  }
}
