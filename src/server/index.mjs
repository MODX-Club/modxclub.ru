
import startServer from "@prisma-cms/server";
import CoreModule from "./modules";

import Web3 from "web3";

const coreModule = new CoreModule({
});

const resolvers = coreModule.getResolvers();

// console.log("resolvers", resolvers.Mutation);

const GethServer = process.env.GethServer || "http://localhost:8545";

if(!GethServer){
  throw("Env GethServer required");
}
 
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(GethServer));


startServer({
  typeDefs: 'src/schema/generated/api.graphql',
  resolvers,
  MailerProps: {
    mailSender: "no-reply@modxclub.ru",
  },
  contextOptions: {
    web3,
  },
});


