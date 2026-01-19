import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ItemDto } from './dtos/item.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('items')
export class ItemsController {
  constructor(private ItemService: ItemsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ItemDto)
  createItem(@Body() body: CreateItemDto, @CurrentUser() user: User) {
    return this.ItemService.create(body, user);
  }
}
