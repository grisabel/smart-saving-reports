import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpInterfaceService,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
  HttpResponse,
} from "./HttpInterfaceService";
import type { BaseHttpHeader } from "./model/request/BaseHttpHeader";

const BASE_HTTP_HEADER: BaseHttpHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const LOCAL_STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export class HttpService implements HttpInterfaceService {
  constructor() {}

  private access_token: string | null = null;

  private createAuthHeaders(): BaseHttpHeader {
    const baseAuthHttpHeader: BaseHttpHeader = {
      Authorization: `Bearer ${this.access_token}`,
    };

    return baseAuthHttpHeader;
  }

  private logout() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
    document.location.href = import.meta.env.VITE_LOGOUT_URL;
  }

  setAccessToken = (value: string | null) => {
    this.access_token = value;
  };

  get<T>({ endpoint, headers }: HttpGetRequest): Promise<HttpResponse<T>> {
    return fetch(endpoint, {
      method: "GET",
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
        ...this.createAuthHeaders(),
      },
    })
    .then((response) => {
      switch (response.status) {
        case 401:
          this.logout()
          break;
      }
      return response;
    })
  }

  post<T>({
    endpoint,
    body,
    headers,
  }: HttpPostRequest): Promise<HttpResponse<T>> {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
        ...this.createAuthHeaders(),
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      switch (response.status) {
        case 401:
          this.logout()
          break;
      }
      return response;
    })
  }

  put<T>({
    endpoint,
    body,
    headers,
  }: HttpPutRequest): Promise<HttpResponse<T>> {
    return fetch(endpoint, {
      method: "PUT",
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
        ...this.createAuthHeaders(),
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      switch (response.status) {
        case 401:
          this.logout()
          break;
      }
      return response;
    })
  }

  patch<T>({
    endpoint,
    headers,
    body,
  }: HttpPatchRequest): Promise<HttpResponse<T>> {
    return fetch(endpoint, {
      method: "PATCH",
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
        ...this.createAuthHeaders(),
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      switch (response.status) {
        case 401:
          this.logout()
          break;
      }
      return response;
    })
  }

  delete<T>({
    endpoint,
    headers,
  }: HttpDeleteRequest): Promise<HttpResponse<T>> {
    return fetch(endpoint, {
      method: "DELETE",
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
        ...this.createAuthHeaders(),
      },
    })
    .then((response) => {
      switch (response.status) {
        case 401:
          this.logout()
          break;
      }
      return response;
    })
  }
}
