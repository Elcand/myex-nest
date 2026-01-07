import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private ItemService: ItemsService) {}
  @Post
  createItem(@Body() body: CreateItemDto) {
    return this.ItemService.create(body);
  }
}
