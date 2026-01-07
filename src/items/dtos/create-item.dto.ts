import { isNumber, isString, Min } from "class-validator";

export class CreateItemDto {
  @isString()
  name: string;
  @isString()
  description: string;
  @isNumber()
  @Min(0)
  price: number;
  @isString()
  location: string;
  @isString() 
  category: string;
}
