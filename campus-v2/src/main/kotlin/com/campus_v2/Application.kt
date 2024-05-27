package com.campus_v2

import com.campus_v2.plugins.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(CORS) {
        anyHost()
        // Configuração adicional do CORS, se necessário
        allowCredentials = true
        allowNonSimpleContentTypes = true
        methods.addAll(listOf(HttpMethod.Get, HttpMethod.Post, HttpMethod.Put, HttpMethod.Delete))
    }
    configureSecurity()
    configureMonitoring()
    configureDI()
    configureSerialization()
    configureDatabases()
    configureRouting()
}
