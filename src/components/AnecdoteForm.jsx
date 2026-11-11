import { useAnecdotes } from "../hooks/useAnecdotes"
import { Box, Typography, TextField, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import useNotification from "../hooks/useNotify"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification } = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    if (!content || content.trim() === '') {
      return
    }
    console.log('new anecdote')
    addAnecdote(content)
    setNotification(`anecdote '${content}' created`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <Box
      sx={{
        mb: 3,
        p: 2.5,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: '#ffffff',
      }}
    >
      <Typography variant="h4" component="h3" sx={{ mt: 0, mb: 1.5, fontWeight: 600 }}>
        create new
      </Typography>
      <form onSubmit={onCreate}>
        <TextField name="anecdote" label="anecdote" fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
          create <CheckCircleIcon sx={{ ml: 1 }} />
        </Button>
      </form>
    </Box>
  )
}

export default AnecdoteForm