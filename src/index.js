require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema");

mongoose.connect(process.env.MONGODB_URI_TEST)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.log("Error Connecting to MongoDB", error.message));

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`Server Ready At ${url}`)
});