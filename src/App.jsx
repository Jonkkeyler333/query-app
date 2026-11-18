import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import { Box, Container, Typography } from '@mui/material'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f6fb', py: 2 }}>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ mb: 3, fontWeight: 700, letterSpacing: '-0.04em' }}
        >
          Anecdote app
        </Typography>

        <Notification />
        <AnecdoteForm />
        <Anecdotes />
      </Container>
    </Box>
  )
}

export default App