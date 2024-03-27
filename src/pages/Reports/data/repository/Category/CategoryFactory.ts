import { CategoryService } from "./CategoryRepository";

export class CategoryFactoryRespository {
  private static instance: CategoryService | null = null;

  static getInstance(): CategoryService {
    CategoryFactoryRespository.instance = new CategoryService();

    return CategoryFactoryRespository.instance;
  }
}
