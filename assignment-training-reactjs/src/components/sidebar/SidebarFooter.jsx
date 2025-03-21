import { Avatar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SidebarFooter({ mini }) {
  const navigator = useNavigate();
  const {t} = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigator('/login');
  };
  return (
    <Typography variant="caption" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
      <Button
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: 1,
          border: 'none',
          outline: 'none',
        }}
        onClick={handleLogout}
      >
        {mini ? (
          <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
            {t('menuContainer.logout')}
            <LogoutIcon />
          </span>
        )}
      </Button>
    </Typography>
  );
}
export default SidebarFooter;
