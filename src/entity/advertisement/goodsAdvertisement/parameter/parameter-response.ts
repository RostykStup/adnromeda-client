import {ParameterValueRequest} from './parameter-value-request';
import {ParameterValueResponse} from './parameter-value-response';

export class ParameterResponse {
  id = 0;
  title = '';
  priceDependence = false;

  chosenValue = '';

  values = new Array<ParameterValueResponse>();

}
