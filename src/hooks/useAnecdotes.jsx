import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../request"
import useNotification from "./useNotify";

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { setNotification } = useNotification()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1    
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['anecdotes']})
        }
    })

    const createAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['anecdotes']})
        },
        onError: (error) => {
            setNotification('too short anecdote, must have length 5 or more')
            console.log(error.message)
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        error: result.error,
        addAnecdote: (content) => createAnecdoteMutation.mutate(content),
        voteAnecdote: (anecdote) => {
            const newAnecdote = {...anecdote, votes:anecdote.votes+1}
            voteAnecdoteMutation.mutate(newAnecdote)
        }

    }

}