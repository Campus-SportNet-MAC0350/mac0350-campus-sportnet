package com.campus_v2.models

import kotlinx.serialization.Serializable

@Serializable
data class UserInfo(
    val email:String,
    val username:String,
    val password:String,
    val profileBio:String,
    val university:String,
    val followersCount:Int=0,
    val profileImagePath: String? = null,
    val userType:Char,
)