import request from 'supertest'
import index from '../index'
import { user } from '../types/User'

const { app } = index

export const registerTest = async ({ username, password }: user) => {
  const res = await request(app).post('/auth/register').send({
    username,
    password,
  })

  const token = `Bearer ${res.body.token}`
  return { token, username, password }
}
