package com.campus_v2.routes

import com.campus_v2.db.PublicationService
import com.campus_v2.models.ParticipateRequest
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
        get("/followedinfo/{userId}"){
            val userId = call.parameters["userId"]?.toIntOrNull()

            if(userId == null){
                call.respond(HttpStatusCode.BadRequest, "Invalid user ID")
                return@get
            }

            val publications = publicationService.getFollowedPublications(userId)
            call.respond(HttpStatusCode.OK, publications)
        }
        delete("/{id}") {
            call.parameters["id"]?.toInt()?.let {
                publicationService.deletePublication(it)
            } ?: call.respond(HttpStatusCode.BadRequest, "Provide ID")
        }
        get("/checkIfParticipating") {
            val userId = call.parameters["userId"]?.toIntOrNull()
            val eventId = call.parameters["eventId"]?.toIntOrNull()

            if(userId == null || eventId == null) {
                call.respond(HttpStatusCode.BadRequest, "Invalid user or event ID")
                return@get
            }

            val participation = publicationService.getParticipation(userId, eventId)

            if(participation){
                call.respond(HttpStatusCode.OK, mapOf("message" to "Cancel Participation"))
            }
            else{
                call.respond(HttpStatusCode.NotFound, mapOf("message" to "Participate"))
            }
        }
        post("/participateInEvent") {
            val request = call.receive<ParticipateRequest>()
            val result = publicationService.participateEvent(request.userId, request.eventId)
            if (result){
                call.respond(HttpStatusCode.Created, mapOf("message" to "Participating"))
            }
            else {
                call.respond(HttpStatusCode.NotFound, mapOf("message" to "Unable to Participate"))
            }
        }
        delete("/stopParticipating") {
            val request = call.receive<ParticipateRequest>()
            val result = publicationService.stopParticipating(request.userId, request.eventId)
            if (result) {
                call.respond(HttpStatusCode.OK, mapOf("message" to "Stopped Participating"))
            }
            else {
                call.respond(HttpStatusCode.NotFound, mapOf("message" to "Unable to stop participating"))
            }
        }
    }
}