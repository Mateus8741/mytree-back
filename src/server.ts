import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
} from "fastify-type-provider-zod";
import { auth } from './middleware/verify-jwt';

import multer from "fastify-multer";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCookie from '@fastify/cookie';
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

const {register, listen, setValidatorCompiler, setSerializerCompiler} = fastify().withTypeProvider();

register(fastifyCookie)
register(fastifyJwt, { secret: 'supersecret-omniF' })

register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

register(fastifySwagger, {
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

register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

register(multer.contentParser);

setValidatorCompiler(validatorCompiler);
setSerializerCompiler(serializerCompiler);
register(auth)


listen({
    port: 3100,
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));