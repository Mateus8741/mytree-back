"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/Auth/registerUser.ts
var registerUser_exports = {};
__export(registerUser_exports, {
  registerUser: () => registerUser
});
module.exports = __toCommonJS(registerUser_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/prisma/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/schemas/registerSchema.ts
var import_zod = require("zod");
var RegisterSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(8),
  name: import_zod.z.string().min(3)
});

// src/routes/Auth/registerUser.ts
async function registerUser(app) {
  app.withTypeProvider().post(
    "/register",
    {
      schema: {
        body: RegisterSchema
      }
    },
    async (request, reply) => {
      try {
        const { email, password, name } = request.body;
        const alreadyExistsSameEmail = await prisma.user.findFirst({
          where: {
            email
          }
        });
        if (alreadyExistsSameEmail) {
          return reply.status(400).send({
            message: "Email j\xE1 cadastrado"
          });
        }
        const hashedPassword = await import_bcryptjs.default.hash(password, 8);
        await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name
          }
        });
        return reply.status(201).send({
          message: "Usu\xE1rio cadastrado com sucesso"
        });
      } catch (error) {
        console.error("Error registering user:", error);
        return reply.status(500).send({
          message: "Erro interno do servidor"
        });
      }
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerUser
});
