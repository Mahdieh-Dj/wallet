import { NotFoundException } from "@nestjs/common";

export class UserWalletNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: "کیف پول کاربر یافت نشد",
    });
  }
}
