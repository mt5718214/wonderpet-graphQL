import jwt from 'jsonwebtoken'

export interface CustomContext {
  payload?: () => string | jwt.JwtPayload
}

export interface JwtPayload {
  account: string
}

export interface LoginArg {
  account: string
  password: string
}

export interface LoginRes {
  msg: string
  data: string
}

export interface MeArg {
}

export interface MeRes {
  msg: string
  data?: string | User | undefined
  error?: string
}

export interface UserList {
  users: User[]
}

export interface User {
  account: string
  password: string
  name: string
  birthday: string
}