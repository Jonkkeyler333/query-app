import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from '../hooks/useNotify'

const Anecdotes = () => {
  const { anecdotes, isPending, error, voteAnecdote, deleteAnecdote } = useAnecdotes()
  const { setNotification } = useNotification()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this anecdote?')) {
      deleteAnecdote(id)
      setNotification('anecdote deleted')
    }
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  return anecdotes.map((anecdote) => (
    <Card
      key={anecdote.id}
      sx={{ mb: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#ffffff' }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h5" component="h4" sx={{ fontWeight: 600 }}>
          {anecdote.content}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          has {anecdote.votes} votes
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Button
          onClick={() => handleVote(anecdote)}
          variant="contained"
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          vote <HowToVoteIcon sx={{ ml: 1 }} />
        </Button>
        <Button
          onClick={() => handleDelete(anecdote.id)}
          variant="contained"
          color="error"
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          delete <DeleteIcon sx={{ ml: 1 }} />
        </Button>
      </CardActions>
    </Card>
  ))
}

export default Anecdotes
