import { FC } from "react";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { SidebarLinks } from "./sidebar-links";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

interface SidebarProps {
  open: boolean;
  handleModalOpen: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ open, handleModalOpen }) => {
  return (
    <>
      <SidePanelResponsive
        open={open}
        onClose={handleModalOpen}
        size="s"
        placement="right"
      >
        <SidebarHeader />
        <SidebarLinks />
        <SidebarFooter />
      </SidePanelResponsive>
    </>
  );
};
