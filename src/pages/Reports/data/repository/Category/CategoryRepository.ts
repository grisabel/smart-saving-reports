import { SmartSavingsIconName } from "@/components/stories/atoms/Icon/SmartSavingsIcon";

export interface CategoryModel {
  id: string;
  concept: string;
  icon: SmartSavingsIconName;
}

export class CategoryService {
  constructor() {}

  getIcomeList(): CategoryModel[] {
    return [
      {
        id: "INCOME-1",
        concept: "Nómina",
        icon: "paylist",
      },
      {
        id: "INCOME-2",
        concept: "Rentas",
        icon: "revenues",
      },
      {
        id: "INCOME-3",
        concept: "Becas/Subvenciones",
        icon: "scholarship",
      },
      {
        id: "INCOME-4",
        concept: "Apuestas/Juego",
        icon: "bets",
      },
    ];
  }

  getIncome(id: string): CategoryModel | null {
    return (
      (this.getIcomeList() || []).find((income) => (income.id = id)) ?? null
    );
  }

  getExpenseList(): CategoryModel[] {
    return [
      {
        id: "EXPENSE-1",
        concept: "Hipoteca/Alquiler/Comunidad",
        icon: "mortgage",
      },
      {
        id: "EXPENSE-2",
        concept: "Alimentación",
        icon: "food",
      },
      {
        id: "EXPENSE-3",
        concept: "Mascotas",
        icon: "pets",
      },
      {
        id: "EXPENSE-4",
        concept: "Combustible",
        icon: "fuel",
      },
      {
        id: "EXPENSE-5",
        concept: "Luz",
        icon: "electricity",
      },
      {
        id: "EXPENSE-6",
        concept: "Calefacción",
        icon: "heating",
      },
      {
        id: "EXPENSE-7",
        concept: "Telefonía/Internet",
        icon: "internet",
      },
      {
        id: "EXPENSE-8",
        concept: "Agua",
        icon: "water",
      },
      {
        id: "EXPENSE-9",
        concept: "Estudios",
        icon: "studies",
      },
      {
        id: "EXPENSE-10",
        concept: "Ocio",
        icon: "beers",
      },
      {
        id: "EXPENSE-11",
        concept: "Tasas/Impuestos/Multas",
        icon: "tax",
      },
      {
        id: "EXPENSE-12",
        concept: "Educación",
        icon: "studies",
      },
      {
        id: "EXPENSE-13",
        concept: "Salud",
        icon: "health",
      },
      {
        id: "EXPENSE-14",
        concept: "Seguros",
        icon: "insurance",
      },
      {
        id: "EXPENSE-15",
        concept: "Vehículo",
        icon: "car",
      },
      {
        id: "EXPENSE-16",
        concept: "Restaurante",
        icon: "restaurant",
      },
    ];
  }

  getExpense(id: string): CategoryModel | null {
    return (
      (this.getExpenseList() || []).find((expense) => (expense.id = id)) ?? null
    );
  }
}
