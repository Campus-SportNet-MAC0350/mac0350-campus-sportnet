package com.campus_v2.models

import kotlinx.serialization.Serializable

@Serializable
data class FollowRequest(
    val followerId: Int,
    val followedId: Int
)