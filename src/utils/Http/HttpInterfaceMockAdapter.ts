import type { HttpBody, HttpHeader, HttpInterfaceService } from './HttpInterfaceService';

export interface MockAdapterResponseFncParams {
  params?: Record<string /*id*/, string /*value*/>;
  body?: HttpBody;
  headers?: HttpHeader;
}

export interface MockAdapterResponseFncReturn<T> {
  response: T;
  status: number;
}

export type MockAdapterResponseFnc<T> = (
  params: MockAdapterResponseFncParams,
) => Promise<MockAdapterResponseFncReturn<T>>;

export interface HttpInterfaceMockAdapter extends HttpInterfaceService {
  onGet<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void;
  onPost<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void;
  onPut<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void;
  onDelete<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void;
  onPatch<T>(urlPattern: string, mockFnc: MockAdapterResponseFnc<T>): void;
}
