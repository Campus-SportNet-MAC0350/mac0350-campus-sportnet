package com.campus_v2.routes

import com.campus_v2.db.UserService
import com.campus_v2.models.FollowRequest
import com.campus_v2.models.User
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.exceptions.ExposedSQLException

fun Routing.userRoute(userService: UserService){
    route("/users"){
        get{
            val users=userService.getUsers()
            call.respond(HttpStatusCode.OK, users)
        }
        post{
            val user=call.receive<User>()
            try{
                val result=userService.addUser(user)
                result?.let{
                    call.respond(HttpStatusCode.Created,it)
                } ?: call.respond(HttpStatusCode.NotImplemented, "Error adding user")
            } catch(e: ExposedSQLException){
                call.respond(HttpStatusCode.BadRequest, e.message ?: "SQL Exception")
            }
        }
        put{
            try{
                val user=call.receive<User>()
                val result=userService.updateUser(user)
                if(result){
                    call.respond(HttpStatusCode.OK, "Update Successful")
                }
                else{
                    call.respond(HttpStatusCode.NotImplemented,  "Update not done")
                }
            }catch (e: ExposedSQLException){
                call.respond(HttpStatusCode.BadRequest, e.message ?: "SQL Exception")
            }
        }
        delete{
            val user=call.receive<User>()
            val result=userService.deleteUser(user)
            if(result){
                call.respond(HttpStatusCode.OK, "Delete Successful")
            }
            else{
                call.respond(HttpStatusCode.NotImplemented, "User not deleted")
            }
        }
        get("/search"){
            val query=call.request.queryParameters["q"].toString()
            val users=userService.searchUser(query)
            call.respond(HttpStatusCode.OK, users)
        }
        get("/id"){
            val id=call.parameters["id"]?.toInt()
            id?.let {
                userService.getUser(it)?.let {user->
                    call.respond(HttpStatusCode.OK, user)
                } ?: call.respond(HttpStatusCode.NotFound, "User not found")
            } ?: call.respond(HttpStatusCode.BadGateway, "Provide Input!")
        }
        get("/followers/{id}"){
            val id = call.parameters["id"]?.toIntOrNull()

            if(id == null){
                call.respond(HttpStatusCode.BadRequest, "Invalid ID")
                return@get
            }

            val listUsers = userService.getFollowers(id)
            call.respond(HttpStatusCode.OK, listUsers)
        }
        get("/following/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()

            if (id == null) {
                call.respond(HttpStatusCode.BadRequest, "Invalid ID")
                return@get
            }

            val listUsers = userService.getFollowing(id)
            call.respond(HttpStatusCode.OK, listUsers)
        }
        get("/login"){
            val email=call.request.queryParameters["email"]
            val password=call.request.queryParameters["password"]

            if(email != null && password != null){
                val user=userService.getUserByLogin(email, password)
                if (user != null)
                    call.respond(HttpStatusCode.OK, user.id)
                else
                    call.respond(HttpStatusCode.NotFound, "User not found")
            }
            else
                call.respond(HttpStatusCode.NotFound, "Invalid user")
        }
        get("/follow") {
            val followerId = call.parameters["followerId"]?.toIntOrNull()
            val followedId = call.parameters["followedId"]?.toIntOrNull()

            if (followerId == null || followedId == null) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "followerId or followedId missing or invalid"))
                return@get
            }

            val result = userService.getFollowedUser(followerId, followedId)

            if (result) {
                call.respond(HttpStatusCode.OK, mapOf("message" to "Unfollow"))
            } else {
                call.respond(HttpStatusCode.NoContent)
            }
        }
        post("/follow") {
            val request = call.receive<FollowRequest>()
            val result = userService.followUser(request.followerId, request.followedId)
            if (result) {
                call.respond(HttpStatusCode.Created, mapOf("message" to "Follow Successful"))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("message" to "User not found"))
            }
        }

        // requisicao DELETE sera feita
        // recebe o corpo da requisicao e desserializa para objeto da classe FollowRequest(.kt)
        // chama a funcao unfollowUser com os parametros desserializados
        // se a operacao foi bem sucedida, responde com um status success via http
        // senao, envia um failed
        delete("/unfollow") {
            val request = call.receive<FollowRequest>()
            val result = userService.unfollowUser(request.followerId, request.followedId)
            if (result) {
                call.respond(HttpStatusCode.OK, mapOf("message" to "Unfollow Successful"))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("message" to "User not found"))
            }
        }
    }
}