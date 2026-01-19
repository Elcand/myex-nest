import {
  Body,
  Controller,
  Patch,
  Param,
  Post,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ItemDto } from './dtos/item.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveItemDto } from './dtos/approve-item.dto';
import { AdminGuard } from '../guards/admin.guard';
import { QueryItemDto } from './dtos/query-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private ItemService: ItemsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ItemDto)
  createItem(@Body() body: CreateItemDto, @CurrentUser() user: User) {
    return this.ItemService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvedItem(@Param('id') id: string, @Body() body: ApproveItemDto) {
    return this.ItemService.approvedItem(parseInt(id), body.isApproved);
  }

  @Get()
  getAllItems(@Query() query: QueryItemDto) {
    return this.ItemService.getAllItems(query);
  }
}
