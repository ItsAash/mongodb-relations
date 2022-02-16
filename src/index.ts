import "reflect-metadata";
import "colors";
import "dotenv/config";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { connectDB } from "./utils/connectDB";
import { createMediaLoader } from "./loaders/mediaLoader";
import { mongoose } from "@typegoose/typegoose";
import { createUserLoader } from "./loaders/userLoader";

const main = async () => {
  await connectDB();
  mongoose.set("debug", true);
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],
      validate: false,
    }),
    debug: true,
    context: ({ req, res }) => ({
      req,
      res,
      mediaLoader: createMediaLoader(),
      userLoader: createUserLoader(),
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(
      ` > Server is up and running at port ${process.env
        .PORT!} http://localhost:${process.env.PORT}/graphql`.bgGreen.black
    );
  });

  /*
  const user = createUser(["Ashish", "Neupane"]);
  const media = createMedia(
    [
      "Shingeki no Kyojin",
      "Attack on Titan",
      "Chixuixau",
      "Shingeki no Kyojin",
    ],
    user
  );
  user.medias.push(media);

  await user.save();
  await media.save();
  */
};

// const createUser = (name: string[]) => {
//   const user = new UserModel({
//     name: {
//       firstName: name[0],
//       lastName: name[1],
//     } as UserName,
//   });
//   return user;
// };

// const createMedia = (name: string[], user: User) => {
//   const media = new MediaModel({
//     title: {
//       romanji: name[0],
//       english: name[1],
//       native: name[2],
//       userPreferred: name[3],
//     },
//     releasedDate: {
//       year: new Date().getFullYear(),
//       month: new Date().getUTCMonth(),
//       day: new Date().getUTCDay(),
//     },
//     uploadedBy: user,
//   });
//   return media;
// };

main().catch(console.error);
