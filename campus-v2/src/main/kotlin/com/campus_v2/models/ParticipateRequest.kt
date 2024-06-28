package com.campus_v2.models

import kotlinx.serialization.Serializable

@Serializable
data class ParticipateRequest(
    val userId: Int,
    val eventId: Int
)