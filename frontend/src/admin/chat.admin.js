import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Dashboard() {
  return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
          </Container>
    </Box>
  );
}

