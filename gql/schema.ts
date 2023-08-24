const typeDefs = `#graphql
  type User {
    account: String
    name: String
    birthday: String
  }

  type LoginRes {
    msg: String!
    data: String!
  }

  type MeRes {
    msg: String!
    data: User
    errormsg: String
  }

  type Query {
    login(account: String!, password: String!): LoginRes!
    me: MeRes!
  }
`;

export default typeDefs;
