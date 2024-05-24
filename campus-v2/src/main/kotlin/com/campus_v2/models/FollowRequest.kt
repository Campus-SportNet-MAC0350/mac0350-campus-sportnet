package com.campus_v2.models

import kotlinx.serialization.Serializable

// desserializar o request recebido via HTTP
@Serializable
data class FollowRequest(
    val followerId: Int,
    val followedId: Int
)
