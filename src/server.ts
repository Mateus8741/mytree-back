import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
} from "fastify-type-provider-zod";
import { auth } from './middleware/verify-jwt';

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCookie from '@fastify/cookie';
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { registerUser } from "./routes/Auth/registerUser";
import { contentLinks } from "./routes/Content/contentLinks";

const app = fastify().withTypeProvider();

app.register(fastifyCookie)
app.register(fastifyJwt, { secret: 'supersecret-mytree' })

app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "My.Tree API",
            description: "Rotas do My.Tree",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(auth)

app.register(registerUser)
app.register(contentLinks)

app.listen({
    port: 3100,
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));