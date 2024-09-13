"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/Content/getContentLinks.ts
var getContentLinks_exports = {};
__export(getContentLinks_exports, {
  getContentLinks: () => getContentLinks
});
module.exports = __toCommonJS(getContentLinks_exports);

// src/prisma/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/Content/getContentLinks.ts
async function getContentLinks(app) {
  app.withTypeProvider().get("/content", {
    schema: {
      summary: "Get content links",
      tags: ["Content"]
    }
  }, async (request, reply) => {
    try {
      const userId = await request.getCurrentUserId();
      const content = await prisma.content.findMany({
        where: {
          userId
        }
      });
      return reply.send(content);
    } catch (error) {
      console.error("Error getting content:", error);
      return reply.status(500).send({
        message: "Erro interno do servidor"
      });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getContentLinks
});
