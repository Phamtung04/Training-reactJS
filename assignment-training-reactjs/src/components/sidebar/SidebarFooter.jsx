import { Avatar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserToken } from '../../hooks/useUserToken';

function SidebarFooter() {
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMAGE;
  const navigator = useNavigate();
  const { t } = useTranslation();

  const { decoded } = useUserToken();
  const currentUserAvatar = decoded.data.avatar;

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
        {!currentUserAvatar ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar
              alt="Sharp"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
            />
            {t('menuContainer.logout')}
            <LogoutIcon />
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar alt="Sharp" src={BASE_URL + currentUserAvatar} />
            {t('menuContainer.logout')}
            <LogoutIcon />
          </span>
        )}
      </Button>
    </Typography>
  );
}
export default SidebarFooter;
