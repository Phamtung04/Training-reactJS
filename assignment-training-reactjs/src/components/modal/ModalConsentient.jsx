import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

const ModalConsentient = ({ open, onClose, onDelete, id, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {/* Delete data */}
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ height: 60, mt: 2 }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
          {/* Bạn có xóa <span className='text-red-500'>{name}</span> hay không ? */}
          {/* {message}
        </Typography> */}
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, mr: 4 }}
          onClick={() => {
            onDelete(id);
            onClose();
          }}
        >
          Xóa
        </Button>
        <Button sx={{ mt: 2, mr: 4 }} variant="contained" color="primary" onClick={onClose}>
          Huỷ
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalConsentient;
