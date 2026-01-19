import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private ItemRepository: Repository<Item>,
  ) {}

  create(item: CreateItemDto, user: User) {
    const newItem = this.ItemRepository.create(item);
    newItem.user = user;

    return this.ItemRepository.save(newItem);
  }

  async approvedItem(id: number, approved: boolean) {
    const item = await this.ItemRepository.findOne({ id });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    item.approved = approved;
    return this.ItemRepository.save(item);
  }
}
