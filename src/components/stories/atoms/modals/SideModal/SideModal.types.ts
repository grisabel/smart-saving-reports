export interface SideModalProps {
  open: boolean;
  onClose: () => void;

  title: string;

  children: React.ReactNode;
}
