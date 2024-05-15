package com.campus_v2

import com.campus_v2.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
//    embeddedServer(Netty, port = 5432, host = "0.0.0.0", module = Application::module).start(wait = true)
}

fun Application.module() {
    install(CORS) {
        anyHost()
    }
    configureSecurity()
    configureMonitoring()
    configureDI()
    configureSerialization()
    configureDatabases()
    configureRouting()
}
