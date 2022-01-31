require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema");

mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.log("Error Connecting to MongoDB", error.message));

	
const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(() => {
	console.log("🚀Server Ready!🚀")
});