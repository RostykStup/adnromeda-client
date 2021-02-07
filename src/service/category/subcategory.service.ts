import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {SubcategoryResponse} from '../../entity/category/subcategory-response';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  constructor(private httpClient: HttpClient) {
  }

  subcategoryURL = GlobalConstants.API_URL + 'subcategory';

  getAllByCategoryId(id: number): Observable<Array<SubcategoryResponse>> {
    const url = this.subcategoryURL + '/category?id=' + id;
    return this.httpClient.get<Array<SubcategoryResponse>>(url);
  }
}
