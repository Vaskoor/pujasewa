import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  async getAll() {
    return this.inventoryService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateInventoryItemDto) {
    return this.inventoryService.create(dto);
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.inventoryService.updateStock(id, quantity);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
