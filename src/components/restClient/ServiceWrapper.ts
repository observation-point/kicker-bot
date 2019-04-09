import axios, { AxiosInstance } from 'axios';

class ServiceWrapper {
  private http: AxiosInstance;

  constructor(baseUrl: string, token?: string) {
    const headers = token ? { 'access-token': token}: {};
    this.http = axios.create({
      baseURL: baseUrl,
      headers
    });
  }

  protected async get<Response>(url: string, query: object): Promise<Response> {
    const q: any = {};
    for (const param in query) {
      const value: any = (query as any)[param];
      q[param] = Array.isArray(value) ? value.join(',') : value;
    }
    try {
      return (await this.http.get(url, { params: q })).data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  protected async post<Response>(url: string, body?: object): Promise<Response> {
    try {
      return (await this.http.post(url, body)).data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  protected async put<Response>(url: string, body?: object): Promise<Response> {
    try {
      return (await this.http.put(url, body)).data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  protected async patch<Response>(url: string, body?: object): Promise<Response> {
    try {
      return (await this.http.patch(url, body)).data;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  // TODO: Properly handle 422/404
  private handleError(e: Error | any): Error {
    if (e.response) {
      const message =
        `HTTP request to ${e.response.config.url} failed,` +
        ` response status: ${e.response.status} ${e.response.statusText},` +
        `body: ${JSON.stringify(e.response.data)}`;
      if (422 === e.response.status) {
        return new Error(message);
      }
      if (404 === e.response.status) {
        return new Error(message);
      }
    }
    return e;
  }
}

export { ServiceWrapper };
