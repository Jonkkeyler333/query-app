const baseUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/anecdotes`
    : 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok){
        throw new Error("Network response is not ok")
    }
    return await response.json()
}

export const createAnecdote = async (content) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "content": content, votes: 0 })
    })

    if(!response.ok){
        throw new Error('can not add the anecdote')
    }

    return await response.json()
}

export const deleteAnecdote = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })

    if(!response.ok){
        throw new Error('can not delete the anecdote')
    }

    return await response.json()
}

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if(!response.ok){
        throw new Error('can not add the anecdote')
    }
    
    return await response.json()
}