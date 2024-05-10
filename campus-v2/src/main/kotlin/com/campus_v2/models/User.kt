package com.campus_v2.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

// this file is going to represent the database on the backend file

// attributes represent the columns on the User table
// @Serializable enables JSON serialization
@Serializable
data class User(
    val username:String,
    val profileBio:String,
    val location:String,
    val followersCount:Int=0,
    val userType:Char,
    val id:Int=0
)

object Users:Table(){
    val id=integer("id").autoIncrement()
    val username=varchar("name",255)
    val profileBio=varchar("bio",255)
    val location=varchar("location",255)
    val userType=char("userType")
    val followersCount=integer("followers")

    override val primaryKey: PrimaryKey
        get() = PrimaryKey(id)
}