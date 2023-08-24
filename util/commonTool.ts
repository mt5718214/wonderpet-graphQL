import * as fs from 'fs/promises'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import cfg from '../config'
import { UserList, User } from '../types'

/**
 * verify login user info
 * 
 * @param jsonFilePath
 * @param userAccount
 * @param password
 * 
 * @returns 
 */
export const verifyUserInJsonFile = async (jsonFilePath: string, userAccount: string, password: string): Promise<boolean> => {
  try {
    // 讀取 JSON 檔案
    const data: string = await fs.readFile(jsonFilePath, 'utf8')
    const jsonData: UserList = JSON.parse(data)
    
    // 如果user不存在, 則回傳false
    const user = jsonData.users.find((user: User) => user.account === userAccount)
    if (!user) {
      return false
    }

    // 驗證密碼
    const isValid = verifyPwd(password, user.password)

    return isValid
  } catch (err) {
    console.error('verifyUserInJsonFile error:', err)
    return false
  }
}

/**
 * get user from json file
 * 
 * @param jsonFilePath
 * @param userAccount
 * @returns 
 */
export const getUserFromJsonFile = async (jsonFilePath: string, userAccount: string): Promise<User | undefined> => {
  try {
    // 讀取 JSON 檔案
    const data: string = await fs.readFile(jsonFilePath, 'utf8')
    const jsonData: UserList = JSON.parse(data)

    return jsonData.users.find((user: User) => user.account === userAccount)
  } catch (error) {
    console.error('getUserFromJsonFile error:', error)
    throw error
  }
}

export const encryptPwd = (password: string) => {
  // auto-gen a salt and hash
  bcrypt.hash(password, cfg.saltRounds, function (err, hash) {
    console.log(hash)
  })
}

export const verifyPwd = (password: string, hashPassword: string): boolean => {  
  return bcrypt.compareSync(password, hashPassword)
}

/**
 * Synchronous Sign with default (HMAC SHA256)
 * 
 * @param account
 * @returns 
 */
export const signToken = (account: string): string => {
  try {
    const token = jwt.sign({ account }, cfg.jwtSecret, { expiresIn: '1h' })
    return token
  } catch (error) {
    console.error(error)
    return ""
  }
}

/**
 * verify a token symmetric
 * 
 * @param token
 * @returns 
 */
export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    const payload = jwt.verify(token, cfg.jwtSecret)
    return payload
  } catch (error) {
    console.error(error)
    return ""
  }
}
