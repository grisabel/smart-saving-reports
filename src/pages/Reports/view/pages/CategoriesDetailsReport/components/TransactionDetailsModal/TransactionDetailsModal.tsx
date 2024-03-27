import SideModal from "@/components/stories/atoms/modals/SideModal/SideModal";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import { useEffect, useState } from "react";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";
import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";

const categoryRespository = CategoryFactoryRespository.getInstance();

export interface TransactionDataFilter {
  category: string | null;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}

const TransactionDetailsModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { filter, setFilter, categoryType } = useCategoriesDetailsCtx();

  useEffect(() => {
    const { category, dateStart, dateEnd } = filter ?? {};
    if (!category || !dateEnd || !dateStart) {
      return;
    }

    console.log({ category, dateStart, dateEnd });
    setOpen(true);
  }, [filter]);

  const handleClose = () => {
    setOpen(false);
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: null,
    }));
  };

  const getCategoryName = (category: string) => {
    const categoryModel =
      categoryType === "EXPENSE"
        ? categoryRespository.getExpense(category)
        : categoryRespository.getIncome(category);

    return categoryModel?.concept; // TODO ADD TRANSLATION LIERAL AL MODELO / sERVICIO
  };

  return (
    open &&
    filter?.category && (
      <SideModal title="titulo" onClose={handleClose} open={open}>
        <p>{getCategoryName(filter.category)}</p>
        <p>{JSON.stringify(filter)}</p>
      </SideModal>
    )
  );
};

export default TransactionDetailsModal;
