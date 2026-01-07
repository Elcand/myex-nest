import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private ItemRepository: Repository<Item>,
  ) {}

  create(item: CreateItemDto) {
    const newItem = this.ItemRepository.create(item);
    return this.ItemRepository.save(newItem);
  }
}
