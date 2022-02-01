require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { typeDefs, resolvers } = require("./schema");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error Connecting to MongoDB", error.message));

const express = require("express");
const http = require("http");
const cors = require("cors");

(async function () {
	const app = express();
	app.use(cors());
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();
	server.applyMiddleware({
		app,
		path: "/"
	})

	const PORT = process.env.PORT || "4000";
	httpServer.listen(PORT, () => {
		console.log(`🚀Server Ready!🚀`);
	});
})();
