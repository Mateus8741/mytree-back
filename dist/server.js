"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/middleware/verify-jwt.ts
var import_fastify_plugin = __toESM(require("fastify-plugin"));
var auth = (0, import_fastify_plugin.default)(async (app2) => {
  app2.addHook("preHandler", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify();
        return sub;
      } catch {
        throw new Error("Unauthorized");
      }
    };
  });
});

// src/server.ts
var import_swagger = __toESM(require("@fastify/swagger"));
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"));
var import_cookie = __toESM(require("@fastify/cookie"));
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));

// src/routes/Auth/loginUser.ts
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
async function loginUser(app2) {
  app2.withTypeProvider().post(
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

// src/routes/Auth/registerUser.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
async function registerUser(app2) {
  app2.withTypeProvider().post(
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
        const hashedPassword = await import_bcryptjs2.default.hash(password, 8);
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

// src/schemas/urlSchema.ts
var import_zod2 = require("zod");
var UrlSchema = import_zod2.z.object({
  urlContent: import_zod2.z.string().url(),
  contentName: import_zod2.z.string(),
  isActived: import_zod2.z.boolean().default(true),
  order: import_zod2.z.number().default(0)
});
var UpdateUrlSchema = UrlSchema.partial();

// src/routes/Content/createContentLinks.ts
async function createContentLinks(app2) {
  app2.withTypeProvider().post("/content", {
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

// src/routes/Content/getContentLinks.ts
async function getContentLinks(app2) {
  app2.withTypeProvider().get("/content", {
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

// src/routes/Content/updateContentLinks.ts
var import_zod3 = require("zod");
async function updateContentLinks(app2) {
  app2.withTypeProvider().put(
    "/content/:id",
    {
      schema: {
        summary: "Update content links",
        tags: ["Content"],
        body: UpdateUrlSchema,
        params: import_zod3.z.object({
          id: import_zod3.z.string().cuid()
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

// src/server.ts
var app = (0, import_fastify.default)().withTypeProvider();
app.register(import_cookie.default);
app.register(import_jwt.default, { secret: "supersecret-mytree" });
app.register(import_cors.default, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});
app.register(import_swagger.default, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "My.Tree API",
      description: "Rotas do My.Tree",
      version: "1.0.0"
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(auth);
app.register(registerUser);
app.register(loginUser);
app.register(createContentLinks);
app.register(getContentLinks);
app.register(updateContentLinks);
app.listen({
  port: 3100,
  host: "0.0.0.0"
}, () => console.log("Server is running on port 3100"));
