package com.campus_v2.db

import com.campus_v2.models.Publication

interface PublicationService {
    suspend fun addPublication(pub: Publication):Publication?
    suspend fun getAllPublicationsFromUser():List<Publication>
    suspend fun getPublications():List<Publication>
    suspend fun deletePublication(id:Int):Boolean
}