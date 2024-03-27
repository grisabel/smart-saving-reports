import SideModal from "@/components/stories/atoms/modals/SideModal/SideModal";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import { useEffect, useState } from "react";

export interface TransactionDataFilter {
  category: string;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}

interface TransactionDetailsModalProps {
  filter: TransactionDataFilter | null;
  cleanFilter: () => void;
}
const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  filter: data,
  cleanFilter: cleanData,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const { category, dateStart, dateEnd } = data ?? {};
    if (!category || !dateEnd || !dateStart) {
      return;
    }

    console.log({ category, dateStart, dateEnd });
    setOpen(true);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    cleanData();
  };

  return (
    open && (
      <SideModal title="titulo" onClose={handleClose} open={open}>
        <h1>hola</h1>
        <p>{JSON.stringify(data)}</p>
      </SideModal>
    )
  );
};

export default TransactionDetailsModal;
