import { IconButton, Stack, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ToolbarActionsSearch({ onChange, label }) {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label={label}
        variant="outlined"
        size="small"
        onChange={onChange}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5, borderRadius: 4 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
    </Stack>
  );
}
export default ToolbarActionsSearch;
