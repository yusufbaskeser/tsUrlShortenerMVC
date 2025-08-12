import request from 'supertest'
import index from '../index'
import { User } from '../types/User'

const { app } = index

export const registerTest = async ({ username, password }: User) => {
  const res = await request(app).post('/auth/register').send({
    username,
    password,
  })

  const token = `Bearer ${res.body.token}`
  return { token, username, password }
}
