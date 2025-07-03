import {Typography, Container, Box } from '@mui/material';

export default function RegistrationSuccess() {
  return (
    <Container maxWidth="xs">
    <Box sx={{ mt: 8}}>
      <Typography variant="h4" align="center" gutterBottom>
      You have successfully registered and can now log in!
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        <a href="http://localhost:3000/login">Login</a>
      </Typography>
    </Box>
    </Container>

  )
}