package com.campus_sportnet

import com.campus_sportnet.plugins.*
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureTemplating()
    configureSerialization()
    configureRouting()
}
