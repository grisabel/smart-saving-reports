import type { Meta, StoryObj } from "@storybook/react";

import SideModal from "./SideModal";
import { useState } from "react";

const meta = {
  title: "Atoms/Modals/SideModal",
  component: SideModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SideModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideModalExample: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    const onClose = () => {
      setOpen(false);
      args.onClose();
    };
    return (
      <div
        style={{ height: "calc(100dvh - 32px)", width: "calc(100dvw - 32px)" }}
      >
        <SideModal {...args} open={open} onClose={onClose} />
      </div>
    );
  },
  args: {
    children: <h1>hola</h1>,
    title: "title",
    open: true,
    onClose: () => null,
  },
};
