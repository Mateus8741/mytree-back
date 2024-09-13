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

// src/routes/Content/updateContentLinks.ts
var updateContentLinks_exports = {};
__export(updateContentLinks_exports, {
  updateContentLinks: () => updateContentLinks
});
module.exports = __toCommonJS(updateContentLinks_exports);
var import_zod2 = require("zod");

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

// src/routes/Content/updateContentLinks.ts
async function updateContentLinks(app) {
  app.withTypeProvider().put(
    "/content/:id",
    {
      schema: {
        summary: "Update content links",
        tags: ["Content"],
        body: UpdateUrlSchema,
        params: import_zod2.z.object({
          id: import_zod2.z.string().cuid()
        })
      }
    },
    async (request, reply) => {
      try {
        const userId = await request.getCurrentUserId();
        if (!userId) {
          return reply.status(401).send({
            message: "Usu\xE1rio n\xE3o autorizado"
          });
        }
        const { id } = request.params;
        const { contentName, isActived, order, urlContent } = request.body;
        const content = await prisma.content.update({
          where: { id },
          data: {
            contentName,
            isActived,
            order,
            urlContent
          }
        });
        const message = "Conteudo atualizado com sucesso!";
        return reply.send({ message, content });
      } catch (error) {
        console.error("Erro ao atualizar conte\xFAdo:", error);
        return reply.status(500).send({
          message: "Erro interno do servidor"
        });
      }
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateContentLinks
});
