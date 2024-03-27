import type { ReportInterfaceRepository } from "./ReportInterfaceRepository";
import { ReportHttpRepository } from "./ReportHttpRepository";
import { UserMockRepository } from "./ReportMockRepository";
import { HttpFactory } from "@/utils/Http/HttpFactory";
import { HttpMockAdapterFactory } from "@/utils/Http/HttpMockAdapterFactory";

export class HabitsFactoryRepository {
  private static instance: ReportInterfaceRepository | null = null;

  static getInstance(): ReportInterfaceRepository {
    if (!HabitsFactoryRepository.instance) {
      if (import.meta.env.VITE_MODE === "production") {
        const http = HttpFactory.getInstance();
        HabitsFactoryRepository.instance = new ReportHttpRepository(http);
      } else {
        const httpMock = HttpMockAdapterFactory.getInstance();
        HabitsFactoryRepository.instance = new UserMockRepository(httpMock);
      }
    }
    return HabitsFactoryRepository.instance;
  }
}
