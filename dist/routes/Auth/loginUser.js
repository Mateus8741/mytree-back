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

// src/routes/Auth/loginUser.ts
var loginUser_exports = {};
__export(loginUser_exports, {
  loginUser: () => loginUser
});
module.exports = __toCommonJS(loginUser_exports);
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

// src/routes/Auth/loginUser.ts
async function loginUser(app) {
  app.withTypeProvider().post(
    "/login",
    {
      schema: {
        body: RegisterSchema,
        summary: "Login a user",
        tags: ["User"]
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        reply.status(401);
        return {
          error: "Credenciais inv\xE1lidas"
        };
      }
      const passwordMatch = await import_bcryptjs.default.compare(password, user.password);
      if (!passwordMatch) {
        reply.status(401);
        return {
          error: "Credenciais inv\xE1lidas"
        };
      }
      const token = await reply.jwtSign(
        {
          sub: user.id
        },
        {
          expiresIn: "600d"
        }
      );
      return reply.send({
        token,
        email: user.email
      });
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginUser
});
