package com.campus_v2.plugins

import com.campus_v2.db.UserService
import com.campus_v2.db.PublicationService
import com.campus_v2.routes.publicationRoute
import com.campus_v2.routes.userRoute
import io.ktor.server.application.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.get

fun Application.configureRouting(userService: UserService=get(), publicationService: PublicationService=get()) {
    routing {
        userRoute(userService)
        publicationRoute(publicationService)
    }
}
