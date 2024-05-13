package com.campus_v2.models

import kotlinx.serialization.Serializable

@Serializable
data class UserInfo(
    val username:String,
    val profileBio:String,
    val location:String,
    val followersCount:Int,
    val userType:Char,
)
