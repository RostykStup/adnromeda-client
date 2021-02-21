export class GoodsOrderItemRequest {
  count: number;
  advertisement: number;
  paramsValuesId: number;
  delivery: number;
  description: string;


  constructor(count: number, advertisement: number, delivery: number, description: string, paramsValuesId: number) {
    this.count = count;
    this.advertisement = advertisement;
    this.paramsValuesId = paramsValuesId;
    this.delivery = delivery;
    this.description = description;
  }
}
