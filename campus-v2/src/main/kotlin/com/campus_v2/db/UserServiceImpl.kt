package com.campus_v2.db

import com.campus_v2.models.User
import com.campus_v2.models.Users
import com.campus_v2.plugins.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class UserServiceImpl : UserService {
    private fun resultRowToUser(row: ResultRow):User{
        return User(
            id = row[Users.id],
            username = row[Users.username],
            profileBio = row[Users.profileBio],
            location = row[Users.location],
            followersCount = row[Users.followersCount],
            userType = row[Users.userType],
            password = row[Users.password],
            university = row[Users.university],
            team = row[Users.team]
        )
    }

    override suspend fun addUser(user: User): User? = dbQuery {
        val insertStmt=Users.insert {
            it[username]=user.username
            it[username]=user.password
            it[profileBio]=user.profileBio
            it[location]=user.location
            it[followersCount]=user.followersCount
            it[userType]=user.userType
            it[university]=user.university
            it[team]=user.team
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
        Users.select { (Users.id eq id) }.map { resultRowToUser(it) }.singleOrNull()
    }
}