package com.campus_v2.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

// this file is going to represent the database on the backend file

// attributes represent the columns on the User table
// @Serializable enables JSON serialization
@Serializable
data class User(
    val username:String,
    val password:String,
    val profileBio:String,
    val university:String,
    val team:String,
    val followersCount:Int=0,
    val userType:Char,
    val profileImagePath: String? = null,
    val id:Int=0
)

object Users:Table(){
    val id=integer("id").autoIncrement()
    val username=varchar("name",255)
    val password=varchar("password", 255)
    val profileBio=varchar("bio",255)
    val university=varchar("university", 255)
    val team=varchar("team", 255)
    val userType=char("userType")
    val followersCount=integer("followers_count")
    val profileImagePath = varchar("profile_image_path", 255).nullable()

    override val primaryKey: PrimaryKey
        get() = PrimaryKey(id)
}

object UserFollows : Table() {
    val followerId = integer("follower_id").references(Users.id)
    val followedId = integer("followed_id").references(Users.id)
    override val primaryKey = PrimaryKey(followerId, followedId)
}