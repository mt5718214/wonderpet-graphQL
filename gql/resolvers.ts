import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql'
import { verifyUserInJsonFile, getUserFromJsonFile, signToken } from '../util/commonTool'
import { LoginArg, MeArg, CustomContext, JwtPayload, LoginRes, MeRes } from '../types'
import cfg from '../config'

const resolvers: IResolvers = {
  Query: {
    login: async (_parent, args: LoginArg): Promise<LoginRes> => {
      try {
        const { account, password } = args

        // verify user is exist and password is correct or not
        const isValid = await verifyUserInJsonFile(cfg.jsonFilePath, account, password)
        if (!isValid) {
          return {
            msg: "fail",
            data: ""
          }
        }

        // 簽發jwt token
        const token = signToken(account)

        return {
          msg: "success",
          data: token
        }
      } catch (error) {
        console.error(error)
        return {
          msg: "fail",
          data: ""
        }
      }
    },
    me: async (_parent, _args: MeArg, contextValue: CustomContext): Promise<MeRes> => {
      try {
        const payload = contextValue.payload ? contextValue?.payload() as JwtPayload : ""
        if (!payload) {
          throw new GraphQLError("User is not authenticated", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }

        // get user info
        const user = await getUserFromJsonFile(cfg.jsonFilePath, payload.account)

        return {
          msg: "success",
          data: user
        }
      } catch (error) {
        return {
          msg: "fail",
          error
        }
      }
    }
  }
};

export default resolvers;