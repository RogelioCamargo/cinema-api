const { gql } = require("apollo-server-express");
const Screening = require("./models/screening");

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
		id: ID!
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
		findScreening(id: ID!): Screening
		findScreeningsByDate(day: Int!): [Screening!]!
	}
`;

const resolvers = {
	Query: {
		screeningCount: () => Screening.collection.countDocuments(),
		allScreenings: async () => await Screening.find({}),
		findScreening: async (_, args) => await Screening.findById(args.id),
		findScreeningsByDate: async (_, args) => await Screening.find({ "date.day": args.day })
	}
};

module.exports = { typeDefs, resolvers };
