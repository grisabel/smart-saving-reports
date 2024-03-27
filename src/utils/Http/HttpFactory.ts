import type { HttpInterfaceService } from './HttpInterfaceService';
import { HttpService } from './HttpService';

class HttpSinglentonFactory {
  private static instance: HttpInterfaceService | null = null;

  static getInstance(): HttpInterfaceService {
    if (!HttpSinglentonFactory.instance) {
      HttpSinglentonFactory.instance = new HttpService();
    }

    return HttpSinglentonFactory.instance;
  }
}

export { HttpSinglentonFactory as HttpFactory };
