package com.campus_v2.models

import kotlinx.serialization.Serializable

@Serializable
data class UserInfo(
    val username:String,
    val password:String,
    val profileBio:String,
    val location:String,
    val university:String,
    val team:String,
    val followersCount:Int=0,
    val userType:Char,
)