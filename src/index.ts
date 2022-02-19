import { mongoose } from "@typegoose/typegoose";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import "colors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createMediaLoader } from "./loaders/mediaLoader";
import { createStudioLoader } from "./loaders/studioLoader";
import { MediaModel, StudioModel } from "./models";
import { MediaEdge } from "./structures/MediaEdge";
import { StudioEdge } from "./structures/StudioEdge";
import { connectDB } from "./utils/connectDB";

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
      studioLoader: createStudioLoader(),
      mediaLoader: createMediaLoader(),
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // await insertMediaWithRelation();

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(
      ` > Server is up and running at port ${process.env
        .PORT!} http://localhost:${process.env.PORT}/graphql`.bgGreen.black
    );
  });
};

main().catch(console.error);

const insertMediaWithRelation = async () => {
  const media = new MediaModel({
    title: {
      userPreferred: "Shingeki no Kyojin",
      romaji: "Shingeki no Kyojin",
      english: "Attack on Titan",
      native: "進撃の巨人",
    },
    releasedDate: {
      year: 2013,
      month: 4,
      day: 7,
    },
    studios: { nodes: [], edges: [] },
  });
  const studios = [
    {
      isAnimationStudio: true,
      name: "Wit Studio",
    },
    {
      isAnimationStudio: false,
      name: "Poly Canyon",
    },
    {
      isAnimationStudio: false,
      name: "Kodansha",
    },
  ].map((studio, i) => {
    const s = new StudioModel(studio);
    const sEdge: StudioEdge = {
      isMain: i === 0,
      node: s._id,
    };

    const mEgde: MediaEdge = {
      isMain: i === 0,
      node: media,
    };
    s.medias.nodes.push(media);
    s.medias.edges.push(mEgde);
    media.studios.nodes.push(s);
    media.studios.edges.push(sEdge);
    return s;
  });

  await StudioModel.insertMany(studios);
  await media.save();
};
