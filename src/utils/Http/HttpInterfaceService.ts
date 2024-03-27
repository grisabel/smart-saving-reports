export type HttpHeader = { [key: string]: string };
export type HttpBody =
  | { [key: string]: unknown }
  | Array<unknown>
  | string
  | Blob;

export interface HttpRequest {
  endpoint: string;
  headers?: HttpHeader;
  body?: HttpBody;
}

export type HttpGetRequest = Omit<HttpRequest, "body">;
export type HttpPostRequest = HttpRequest;
export type HttpPutRequest = HttpRequest;
export type HttpPatchRequest = HttpRequest;
export type HttpDeleteRequest = Omit<HttpRequest, "body">;

export type HttpResponse<T> = Response;

export interface HttpInterfaceService {

  setAccessToken(value: string | null): void;

  get<T>({ endpoint, headers }: HttpGetRequest): Promise<HttpResponse<T>>;

  post<T>({
    endpoint,
    body,
    headers,
  }: HttpPostRequest): Promise<HttpResponse<T>>;

  put<T>({ endpoint, body, headers }: HttpPutRequest): Promise<HttpResponse<T>>;

  patch<T>({
    endpoint,
    headers,
    body,
  }: HttpPatchRequest): Promise<HttpResponse<T>>;

  delete<T>({ endpoint, headers }: HttpDeleteRequest): Promise<HttpResponse<T>>;
}
