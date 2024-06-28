package com.campus_v2.db

import com.campus_v2.models.Publication
import com.campus_v2.models.UserAndPublication

interface PublicationService {
    suspend fun addPublication(publication: Publication):Publication?
    suspend fun getAllPublicationsFromUser(userId: Int):List<Publication>
    suspend fun getPublications():List<Publication>
    suspend fun deletePublication(id:Int):Boolean
    suspend fun getFollowedPublications(id:Int):List<UserAndPublication>
}