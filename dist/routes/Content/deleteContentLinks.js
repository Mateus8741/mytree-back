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

// src/routes/Content/deleteContentLinks.ts
var deleteContentLinks_exports = {};
__export(deleteContentLinks_exports, {
  deleteContentLinks: () => deleteContentLinks
});
module.exports = __toCommonJS(deleteContentLinks_exports);
var import_zod = require("zod");

// src/prisma/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/Content/deleteContentLinks.ts
async function deleteContentLinks(app) {
  app.withTypeProvider().delete("/content/:contentId", {
    schema: {
      params: import_zod.z.object({
        contentId: import_zod.z.string().cuid()
      })
    }
  }, async (request, reply) => {
    const { contentId } = request.params;
    const userId = await request.getCurrentUserId();
    if (!userId) {
      return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
    }
    const content = await prisma.content.findFirst({
      where: { id: contentId }
    });
    if (!content) {
      return reply.status(404).send({ error: "Conte\xFAdo n\xE3o encontrado" });
    }
    if (content.userId !== userId) {
      return reply.status(403).send({ error: "Voc\xEA n\xE3o tem permiss\xE3o para deletar este pedido" });
    }
    await prisma.content.deleteMany({
      where: { id: contentId }
    });
    return reply.status(204).send({ message: "Pedido deletado com sucesso!" });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteContentLinks
});
