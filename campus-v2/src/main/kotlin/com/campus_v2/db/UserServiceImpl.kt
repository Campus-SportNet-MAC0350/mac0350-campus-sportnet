package com.campus_v2.db

import com.campus_v2.models.User
import com.campus_v2.models.Users
import com.campus_v2.models.UserFollows
import com.campus_v2.plugins.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class UserServiceImpl : UserService {
    private fun resultRowToUser(row: ResultRow):User{
        return User(
            id=row[Users.id],
            email=row[Users.email],
            username=row[Users.username],
            profileBio=row[Users.profileBio],
            followersCount=row[Users.followersCount],
            userType=row[Users.userType],
            password=row[Users.password],
            university=row[Users.university],
            profileImagePath = row[Users.profileImagePath]
        )
    }

    override suspend fun addUser(user: User): User? = dbQuery {
        val insertStmt=Users.insert {
            it[email]=user.email
            it[username]=user.username
            it[password]=user.password
            it[profileBio]=user.profileBio
            it[userType]=user.userType
            it[university]=user.university
            it[followersCount]=0
            it[profileImagePath]=user.profileImagePath
        }
        insertStmt.resultedValues?.singleOrNull()?.let { resultRowToUser(it) }
    }
    override suspend fun updateUser(user: User): Boolean = dbQuery{
        Users.update({Users.id eq user.id}){
            it[username]=user.username
        }>0
    }

    override suspend fun deleteUser(user: User): Boolean = dbQuery{
        Users.deleteWhere { username eq user.username }>0
    }

    override suspend fun getUsers(): List<User> = dbQuery{
        Users.selectAll().map { resultRowToUser(it) }
    }

    override suspend fun searchUser(query: String): List<User> = dbQuery{
        Users.select { (Users.username.lowerCase() like "%${query.lowercase()}%")}
            .map { resultRowToUser(it) }
    }

    override suspend fun getUser(id: Int): User? = dbQuery{
        Users.select { (Users.id eq id) }
            .map { resultRowToUser(it) }
            .singleOrNull()
    }

    override suspend fun getUserByLogin(email: String, pass: String): User? = dbQuery {
        Users.select { (Users.email eq email) and (Users.password eq pass) }
            .map { resultRowToUser(it) }
            .singleOrNull()
    }

    // follow a user
    override suspend fun followUser(followerId: Int, followedId: Int): Boolean = dbQuery {
        val insertResult = UserFollows.insert {
            it[UserFollows.followerId] = followerId
            it[UserFollows.followedId] = followedId
        }.insertedCount > 0

        if (insertResult) {
            Users.update({ Users.id eq followedId }) {
                with(SqlExpressionBuilder) {
                    it[followersCount] = followersCount + 1
                }
            }
        }
        insertResult
    }
    // unfollow user
    override suspend fun unfollowUser(followerId: Int, followedId: Int): Boolean = dbQuery {
        val deleteResult = UserFollows.deleteWhere {
            (UserFollows.followerId eq followerId) and
                    (UserFollows.followedId eq followedId)
        } > 0

        if (deleteResult) {
            Users.update({ Users.id eq followedId }) {
                with(SqlExpressionBuilder) {
                    it[followersCount] = followersCount - 1
                }
            }
        }
        deleteResult
    }

    // check if a user follows another
    override suspend fun getFollowedUser(followerId: Int, followedId: Int): Boolean = dbQuery {
        val result = UserFollows.select {
            (UserFollows.followerId eq followerId) and (UserFollows.followedId eq followedId)
        }.count() > 0

        return@dbQuery result
    }

    // get list of users that one specific user follows
    override suspend fun getFollowedUsers(userId: Int): List<User> = dbQuery {
        (UserFollows innerJoin Users)
            .select { UserFollows.followerId eq userId }
            .map { resultRowToUser(it) }
    }

    // get list of followers
    override suspend fun getFollowers(userId: Int): List<User> = dbQuery {
        (UserFollows innerJoin Users)
            .select { UserFollows.followedId eq userId }
            .map { resultRowToUser(it) }
    }
}