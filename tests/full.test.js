import { test, expect } from '@playwright/test'

test.describe('Query App', () => {
  test('front can be opened and shows the title', async ({ page }) => {
    await page.goto('')
    await expect(page.getByRole('heading', { name: 'Anecdote app' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'create' })).toBeVisible()
  })

  test('GET /anecdotes responds with 200', async ({ request }) => {
    const response = await request.get('/anecdotes')

    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.any(Array))
  })

  test('creates an anecdote and retrieves it by id', async ({ request }) => {
    const anecdote = {
      content: `E2E anecdote ${Date.now()}`,
      votes: 0,
    }

    const createResponse = await request.post('/anecdotes', {
      data: anecdote,
    })

    expect(createResponse.status()).toBe(201)
    const createdAnecdote = await createResponse.json()
    expect(createdAnecdote).toMatchObject(anecdote)
    expect(createdAnecdote.id).toBeDefined()

    try {
      const getResponse = await request.get(`/anecdotes/${createdAnecdote.id}`)

      expect(getResponse.status()).toBe(200)
      const fetchedAnecdote = await getResponse.json()
      expect(fetchedAnecdote).toMatchObject(createdAnecdote)
    } finally {
      const deleteResponse = await request.delete(`/anecdotes/${createdAnecdote.id}`)
      expect(deleteResponse.status()).toBe(200)
    }
  })
})
