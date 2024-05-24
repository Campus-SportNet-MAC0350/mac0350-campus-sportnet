package com.campus_v2.routes

import com.campus_v2.db.PublicationService
import com.campus_v2.models.Publication
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.publicationRoute(publicationService: PublicationService){
    route("/publications"){
        get {
            val publications=publicationService.getPublications()
            call.respond(HttpStatusCode.OK, publications)
        }
        post {
            val publication=call.receive<Publication>()
            publicationService.addPublication(publication)?.let {
                call.respond(HttpStatusCode.Created, it)
            } ?: call.respond(HttpStatusCode.BadRequest, "Error!")
        }
        get("/userinfo/{userId}") {
            val userId = call.parameters["userId"]?.toIntOrNull()

            if (userId == null) {
                call.respond(HttpStatusCode.BadRequest, "Invalid user ID")
                return@get
            }

            val userInfo = publicationService.getAllPublicationsFromUser(userId)
            call.respond(HttpStatusCode.OK, userInfo)
        }
        delete("/{id}") {
            call.parameters["id"]?.toInt()?.let {
                publicationService.deletePublication(it)
            } ?: call.respond(HttpStatusCode.BadRequest, "Provide ID")
        }
    }
}