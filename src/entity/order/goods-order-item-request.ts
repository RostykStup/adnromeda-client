export class GoodsOrderItemRequest {
  count: number;
  advertisement: number;
  delivery: number;
  description: string;


  constructor(count: number, advertisement: number, delivery: number, description: string) {
    this.count = count;
    this.advertisement = advertisement;
    this.delivery = delivery;
    this.description = description;
  }
}
