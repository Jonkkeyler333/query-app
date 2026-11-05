const baseUrl = 'http://localhost:3001/anecdotes'

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