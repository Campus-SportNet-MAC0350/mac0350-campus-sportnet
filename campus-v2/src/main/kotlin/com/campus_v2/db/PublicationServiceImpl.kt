package com.campus_v2.db

import com.campus_v2.models.*
import com.campus_v2.plugins.dbQuery
import io.ktor.server.plugins.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class PublicationServiceImpl(private val userService: UserService) : PublicationService {
    private fun resultRowToPublication(resultRow: ResultRow):Publication{
        return Publication(
            userId=resultRow[Publications.userId],
            publicationText=resultRow[Publications.publicationText],
            publicationType=resultRow[Publications.publicationType],
            countParticipants=resultRow[Publications.countParticipants],
            publicationImagePath=resultRow[Publications.publicationImagePath],
            dateTime=resultRow[Publications.dateTime],
            eventDate=resultRow[Publications.eventDate],
            eventTime=resultRow[Publications.eventTime],
            id=resultRow[Publications.id],
        )
    }

    override suspend fun addPublication(publication: Publication): Publication? = dbQuery {
        val insertStmt=Publications.insert {
            it[userId]=publication.userId
            it[publicationText]=publication.publicationText
            it[publicationType]=publication.publicationType
            it[countParticipants]=0
            it[dateTime]=publication.dateTime
            it[eventDate]=publication.eventDate
            it[eventTime]=publication.eventTime
            it[publicationImagePath]=publication.publicationImagePath
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

    override suspend fun deletePublication(id: Int): Boolean = dbQuery {
        Publications.deleteWhere { Publications.id eq id }>0
    }

    override suspend fun getFollowedPublications(id:Int):List<UserAndPublication> = dbQuery {
        val followedUserIds = UserFollows.slice(UserFollows.followedId)
            .select { UserFollows.followerId eq id }
            .map { it[UserFollows.followedId] }

        val publications = Publications.select { (Publications.userId inList followedUserIds) or (Publications.userId eq id) }
            .map { resultRowToPublication(it) }

        publications.map { publication ->
            println("PublicationID ${publication.id}")
        }

        publications.map { publication ->
            val user = Users.select { Users.id eq publication.userId }
                .map { userService.getUserFromResultRow(it) }
                .firstOrNull() ?: throw IllegalStateException("User not found for publication ID: ${publication.id}")
            UserAndPublication(user, publication)
        }
    }

    override suspend fun participateEvent(userId: Int, eventId: Int): Boolean = dbQuery {
        val insertResult = EventsParticipation.insert {
            it[EventsParticipation.userId] = userId
            it[EventsParticipation.eventId] = eventId
        }.insertedCount > 0

        if(insertResult){
            Publications.update({ Publications.id eq eventId }) {
                with(SqlExpressionBuilder){
                    it[countParticipants] = countParticipants + 1
                }
            }
        }
        insertResult
    }

    override suspend fun stopParticipating(userId: Int, eventId: Int): Boolean = dbQuery {
        val deleteResult = EventsParticipation.deleteWhere {
            (EventsParticipation.userId eq userId) and (EventsParticipation.eventId eq eventId)
        } > 0

        if(deleteResult){
            Publications.update({ Publications.id eq eventId }) {
                with(SqlExpressionBuilder){
                    it[countParticipants] = countParticipants - 1
                }
            }
        }
        deleteResult
    }

    override suspend fun getParticipation(userId: Int, eventId: Int): Boolean = dbQuery {
        val result = EventsParticipation.select {
            (EventsParticipation.userId eq userId) and (EventsParticipation.eventId eq eventId)
        }.count() > 0

        return@dbQuery result
    }

    override suspend fun getParticipants(eventId: Int): List<User> = dbQuery {
        (EventsParticipation innerJoin Users)
            .select { EventsParticipation.eventId eq eventId }
            .map { row ->
                User(
                    id = row[Users.id],
                    email = row[Users.email],
                    username = row[Users.username],
                    password = row[Users.password],
                    profileBio = row[Users.profileBio],
                    university = row[Users.university],
                    userType = row[Users.userType],
                    followersCount = row[Users.followersCount],
                    profileImagePath = row[Users.profileImagePath]
                )
            }
    }
}