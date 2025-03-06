import { Box, Typography } from "@mui/material";

function PageContent({ pathname, children }) {
    return (
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography>Dashboard content for {pathname}</Typography>
        <Typography>{children}</Typography>
      </Box>
    );
  }
  export default PageContent;