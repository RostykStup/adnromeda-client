import {ParameterValueRequest} from './parameter-value-request';

export class ParameterRequest {
  title = '';

  priceDependence = false;

  values = new Array<ParameterValueRequest>();

}
