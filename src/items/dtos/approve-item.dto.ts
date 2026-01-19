import { IsBoolean } from "class-validator";

export class ApproveItemDto {
  @IsBoolean()
  isApproved: boolean;
}
