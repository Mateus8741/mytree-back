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

// src/routes/Content/createContentLinks.ts
var createContentLinks_exports = {};
__export(createContentLinks_exports, {
  createContentLinks: () => createContentLinks
});
module.exports = __toCommonJS(createContentLinks_exports);

// src/prisma/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/schemas/urlSchema.ts
var import_zod = require("zod");
var UrlSchema = import_zod.z.object({
  urlContent: import_zod.z.string().url(),
  contentName: import_zod.z.string(),
  isActived: import_zod.z.boolean().default(true),
  order: import_zod.z.number().default(0)
});
var UpdateUrlSchema = UrlSchema.partial();

// src/routes/Content/createContentLinks.ts
async function createContentLinks(app) {
  app.withTypeProvider().post("/content", {
    schema: {
      body: UrlSchema,
      summary: "Create content links",
      tags: ["Content"]
    }
  }, async (request, reply) => {
    try {
      const { urlContent, contentName, isActived, order } = request.body;
      const userId = await request.getCurrentUserId();
      const url = await prisma.content.create({
        data: {
          urlContent,
          contentName,
          isActived,
          order,
          userId
        }
      });
      return reply.status(201).send(url);
    } catch (error) {
      console.error("Error creating url:", error);
      return reply.status(500).send({
        message: "Erro interno do servidor"
      });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContentLinks
});
