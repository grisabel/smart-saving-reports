import * as pathToRegexp from "path-to-regexp";

import type {
  HttpInterfaceMockAdapter,
  MockAdapterResponseFnc,
  MockAdapterResponseFncParams,
} from "./HttpInterfaceMockAdapter";
import type {
  HttpGetRequest,
  HttpResponse,
  HttpRequest,
  HttpDeleteRequest,
} from "./HttpInterfaceService";
import { sleep } from "../sleep";

export class HttpMockAdapter implements HttpInterfaceMockAdapter {
  private mockResponsesGet = new Map<string, MockAdapterResponseFnc<any>>();
  private mockResponsesPost = new Map<string, MockAdapterResponseFnc<any>>();
  private mockResponsesPut = new Map<string, MockAdapterResponseFnc<any>>();
  private mockResponsesPatch = new Map<string, MockAdapterResponseFnc<any>>();
  private mockResponsesDelete = new Map<string, MockAdapterResponseFnc<any>>();

  setAccessToken = (value: string | null) => {};

  private matchUrl(
    endpoint: string,
    urlsPattern: string[]
  ): { urlPattern: string; params: Record<string, string> } | null {
    let resul = null;

    urlsPattern.forEach((urlPattern) => {
      const [path, queryString] = urlPattern.split("?");
      let url = path;
      if (queryString) {
        url = `${url}\\?${queryString}`;
      }
      const checkUrl = pathToRegexp.match(url, {
        decode: decodeURIComponent,
      });

      const match = checkUrl(endpoint);

      if (match) {
        resul = {
          urlPattern,
          params: match?.params ?? {},
        };
      }
    });

    return resul;
  }

  private async httpMock<T>(
    endpoint: string,
    urlsPattern: string[],
    mockResponse: Map<string, MockAdapterResponseFnc<any>>,
    { headers, body }: Omit<MockAdapterResponseFncParams, "params">
  ): Promise<HttpResponse<T>> {
    const match = this.matchUrl(endpoint, urlsPattern);

    if (!match) throw new Error("No mock response for URL");

    const mockFnc = mockResponse.get(
      match.urlPattern
    ) as MockAdapterResponseFnc<T>;

    await sleep(500);

    return mockFnc({
      params: match.params,
      headers,
      body,
    })
      .then((data) => {
        const { status, response } = data;
        return Promise.resolve({
          ok: status >= 200 && status <= 299,
          json: () => Promise.resolve(response),
          status: status,
          headers: headers,
        }) as unknown as HttpResponse<T>;
      })
      .catch((error) => {
        const { status, response } = error;
        return Promise.reject({
          json: () => Promise.resolve(response),
          ok: status >= 200 && status <= 299,
          status: status,
          headers: headers,
        }) as unknown as HttpResponse<T>;
      });
  }

  onGet<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void {
    this.mockResponsesGet.set(urlPattern, mockFnc);
  }

  get<T>({ endpoint, headers }: HttpGetRequest): Promise<HttpResponse<T>> {
    const urlsPattern = Array.from(this.mockResponsesGet.keys());
    return this.httpMock(endpoint, urlsPattern, this.mockResponsesGet, {
      headers,
    });
  }

  onPost<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void {
    this.mockResponsesPost.set(urlPattern, mockFnc);
  }

  post<T>({ endpoint, body, headers }: HttpRequest): Promise<HttpResponse<T>> {
    const urlsPattern = Array.from(this.mockResponsesPost.keys());
    return this.httpMock(endpoint, urlsPattern, this.mockResponsesPost, {
      headers,
      body,
    });
  }

  onPut<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void {
    this.mockResponsesPut.set(urlPattern, mockFnc);
  }

  put<T>({ endpoint, body, headers }: HttpRequest): Promise<HttpResponse<T>> {
    const urlsPattern = Array.from(this.mockResponsesPut.keys());
    return this.httpMock(endpoint, urlsPattern, this.mockResponsesPut, {
      headers,
      body,
    });
  }

  onPatch<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void {
    this.mockResponsesPatch.set(urlPattern, mockFnc);
  }

  patch<T>({ endpoint, headers, body }: HttpRequest): Promise<HttpResponse<T>> {
    const urlsPattern = Array.from(this.mockResponsesPatch.keys());
    return this.httpMock(endpoint, urlsPattern, this.mockResponsesPatch, {
      headers,
      body,
    });
  }

  onDelete<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void {
    this.mockResponsesDelete.set(urlPattern, mockFnc);
  }

  delete<T>({
    endpoint,
    headers,
  }: HttpDeleteRequest): Promise<HttpResponse<T>> {
    const urlsPattern = Array.from(this.mockResponsesDelete.keys());
    return this.httpMock(endpoint, urlsPattern, this.mockResponsesDelete, {
      headers,
    });
  }
}
