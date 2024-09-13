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

// src/prisma/seed.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/prisma/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/prisma/seed.ts
async function seed() {
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();
  const users = [
    {
      email: "t@t.com",
      password: "12345678",
      name: "Tt",
      content: [
        {
          urlContent: "https://www.google.com",
          contentName: "Google",
          order: 0
        },
        {
          urlContent: "https://www.facebook.com",
          contentName: "Facebook",
          order: 1
        },
        {
          urlContent: "https://www.twitter.com",
          contentName: "Twitter",
          order: 2
        }
      ]
    },
    {
      email: "teste@t.com",
      password: "12345678",
      name: "Teste",
      content: [
        {
          urlContent: "https://www.google.com",
          contentName: "Google",
          order: 0
        },
        {
          urlContent: "https://www.facebook.com",
          contentName: "Facebook",
          order: 1
        },
        {
          urlContent: "https://www.twitter.com",
          contentName: "Twitter",
          order: 2
        }
      ]
    },
    {
      email: "test@t.com",
      password: "12345678",
      name: "Test",
      content: [
        {
          urlContent: "https://www.google.com",
          contentName: "Google",
          order: 0
        },
        {
          urlContent: "https://www.facebook.com",
          contentName: "Facebook",
          order: 1
        },
        {
          urlContent: "https://www.twitter.com",
          contentName: "Twitter",
          order: 2
        }
      ]
    }
  ];
  for (const user of users) {
    const hashedPassword = await import_bcryptjs.default.hash(user.password, 10);
    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        content: {
          createMany: {
            data: user.content
          }
        }
      }
    });
  }
  console.log("Users seeded successfully!");
}
seed().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
