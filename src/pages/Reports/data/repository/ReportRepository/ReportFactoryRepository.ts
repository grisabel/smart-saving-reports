import type { ReportInterfaceRepository } from "./ReportInterfaceRepository";
import { ReportHttpRepository } from "./ReportHttpRepository";
import { UserMockRepository } from "./ReportMockRepository";
import { HttpFactory } from "@/utils/Http/HttpFactory";
import { HttpMockAdapterFactory } from "@/utils/Http/HttpMockAdapterFactory";

export class ReportFactoryRepository {
  private static instance: ReportInterfaceRepository | null = null;

  static getInstance(): ReportInterfaceRepository {
    if (!ReportFactoryRepository.instance) {
      if (import.meta.env.VITE_MODE === "production") {
        const http = HttpFactory.getInstance();
        ReportFactoryRepository.instance = new ReportHttpRepository(http);
      } else {
        const httpMock = HttpMockAdapterFactory.getInstance();
        ReportFactoryRepository.instance = new UserMockRepository(httpMock);
      }
    }
    return ReportFactoryRepository.instance;
  }
}
