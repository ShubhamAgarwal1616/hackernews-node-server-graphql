const {GraphQLServer} = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const { PubSub } = require('graphql-yoga')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const pubsub = new PubSub()

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub,
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))






/*
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwMTQ2ODE1Mn0.mwCrKRPyKp2FyiAM_AHTqh6J7XoNkJamHhYG63CaZcw"
}

mutation post {
  post(
    url: "www.graphqlconf.org"
    description: "An awesome GraphQL conference"
  ) {
    id
  }
}

mutation login {
  login(
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      email
      links {
        url
        description
      }
    }
  }
}

mutation signup {
  signup(
    name: "Alice"
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      id
    }
  }
}

mutation vote {
  vote(linkId: "3") {
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}

subscription vote {
  newVote {
    id
    link {
      id
      url
      description
    }
    user {
      name
      email
    }
  }
}

query filter {
  feed(filter: "te", orderBy: { createdAt: desc }) {
    count
    links {
    id
    description
    url
    }
  }
}
 */