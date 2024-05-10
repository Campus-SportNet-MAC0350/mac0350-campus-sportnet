package com.campus_v2.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table

// this file is gonna represent the database on the backend file

@Serializable
data class User(
    val username:String,
    val profileBio:String,
    val location:String,
    val followersCount:Int=0,
    val id:Int=0
)

object Users:Table(){
    val id=integer("id").autoIncrement()
    val username=varchar("name",255)
    val profileBio=varchar("bio",255)
    val location=varchar("location",255)
    val followersCount=integer("followers")
//    val cityId=integer("city_id").references(Cities.id,ReferenceOption.CASCADE)

    override val primaryKey: PrimaryKey
        get() = PrimaryKey(id)
}