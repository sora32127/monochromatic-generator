import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const schema = z.object({
  name: z.string(),
  age: z.number()
})

const routes = app.post('/api/users', zValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    message: `${data.name} is ${data.age} years old `
  })
})

export default routes
export type AppType = typeof routes