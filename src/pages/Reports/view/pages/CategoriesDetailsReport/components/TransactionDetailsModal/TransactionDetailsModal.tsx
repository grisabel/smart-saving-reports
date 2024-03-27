import SideModal from "@/components/stories/atoms/modals/SideModal/SideModal";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import { useEffect, useState } from "react";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";

export interface TransactionDataFilter {
  category: string | null;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}

const TransactionDetailsModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { filter, setFilter } = useCategoriesDetailsCtx();

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

  return (
    open && (
      <SideModal title="titulo" onClose={handleClose} open={open}>
        <h1>hola</h1>
        <p>{JSON.stringify(filter)}</p>
      </SideModal>
    )
  );
};

export default TransactionDetailsModal;
