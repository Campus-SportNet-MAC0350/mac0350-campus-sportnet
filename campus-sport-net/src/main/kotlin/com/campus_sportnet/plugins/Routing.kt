package com.campus_sportnet.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        staticResources("/static", "files") // everything under /static uses the "files" directory
    }
}
