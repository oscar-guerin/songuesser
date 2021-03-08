import { HttpQueryParam } from '@witty-services/ngx-http-repository';

export class SearchQuery {

  @HttpQueryParam('q')
  public query: string;

  @HttpQueryParam()
  public type: string;

  public constructor(data: Partial<SearchQuery>) {
    Object.assign(this, data);
  }
}
