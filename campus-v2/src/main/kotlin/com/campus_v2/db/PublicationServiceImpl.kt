package com.campus_v2.db

import com.campus_v2.models.Publications
import com.campus_v2.models.Publication
import com.campus_v2.plugins.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class PublicationServiceImpl : PublicationService {
    private fun resultRowToPublication(resultRow: ResultRow):Publication{
        return Publication(
            userId = resultRow[Publications.userId],
            publicationText = resultRow[Publications.publicationText],
            publicationType = resultRow[Publications.publicationType],
            countParticipants = resultRow[Publications.countParticipants],
            dateTime = resultRow[Publications.dateTime],
            id = resultRow[Publications.id],
        )
    }

    override suspend fun addPublication(publication: Publication): Publication? = dbQuery {
        val insertStmt=Publications.insert {
            it[userId]=publication.userId
            it[publicationText]=publication.publicationText
            it[publicationType]=publication.publicationType
            it[countParticipants]=0
            it[dateTime]=publication.dateTime
        }
        insertStmt.resultedValues?.singleOrNull()?.let { resultRowToPublication(it) }
    }

    override suspend fun getAllPublicationsFromUser(userId: Int): List<Publication> = dbQuery {
        Publications.select {
            Publications.userId eq userId
        }.map { resultRowToPublication(it) }
    }

    override suspend fun getPublications(): List<Publication> = dbQuery{
        Publications.selectAll().map { resultRowToPublication(it) }
    }

    override suspend fun deletePublication(id: Int): Boolean= dbQuery {
        Publications.deleteWhere { Publications.id eq id }>0
    }
}