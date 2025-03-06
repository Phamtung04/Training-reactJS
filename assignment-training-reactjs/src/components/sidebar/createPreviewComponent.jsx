import React from "react";
import AccountSidebarPreview from "./AccountSidebarPreview";

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};
export default createPreviewComponent;