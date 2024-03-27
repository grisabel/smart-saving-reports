import type { HttpInterfaceMockAdapter } from './HttpInterfaceMockAdapter';
import { HttpMockAdapter } from './HttpMockAdapter';

class HttpMockAdapterFactorySingleton {
  private static instance: HttpInterfaceMockAdapter | null = null;

  static getInstance(): HttpInterfaceMockAdapter {
    if (!HttpMockAdapterFactorySingleton.instance) {
      HttpMockAdapterFactorySingleton.instance = new HttpMockAdapter();
    }

    return HttpMockAdapterFactorySingleton.instance;
  }
}

export { HttpMockAdapterFactorySingleton as HttpMockAdapterFactory };
