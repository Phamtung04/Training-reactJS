import React from "react";
import { Divider, Stack } from "@mui/material";
import { AccountPreview } from "@toolpad/core/Account";

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}
export default AccountSidebarPreview;