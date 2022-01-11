const { ApolloServer, gql } = require("apollo-server");
const Screenings = require("./data/ALL_SCREENINGS.json");

const typeDefs = gql`
	type Date {
		day: Int!
		month: Int!
		year: Int!
	}

	type Links {
		trailer: String!
		tickets: String!
		info: String!
	}

	type Screening {
		title: String!
		director: String
		time: String!
		links: Links!
		poster: String!
		description: String
		date: Date!
		location: String!
		isDoubleFeature: Boolean
	}

	type Query {
		screeningCount: Int!
		allScreenings: [Screening!]!
		findScreening(title: String!): Screening
	}
`;

const resolvers = {
	Query: {
		screeningCount: () => Screenings.length,
		allScreenings: () => Screenings,
		findScreening: (root, args) =>
			Screenings.find(screening => screening.title === args.title)
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`Server Ready At ${url}`)
});