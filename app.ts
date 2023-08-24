import { ApolloServer } from '@apollo/server'
import { startStandaloneServer, StandaloneServerContextFunctionArgument } from '@apollo/server/standalone'

import { verifyToken } from './util/commonTool'
import { CustomContext } from './types'
import { schema } from './gql'

(async function serverStart() {
  const server = new ApolloServer<CustomContext>({
    schema,
    introspection: true,
  })
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: StandaloneServerContextFunctionArgument) => {
      return {
        payload: () => verifyToken(req.headers?.authorization?.split(" ")[1] || "")
      }
    }
  })

  console.log(`🚀  Server ready at: ${url}`)
})()
