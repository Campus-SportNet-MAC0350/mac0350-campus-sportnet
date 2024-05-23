package com.campus_v2.plugins

import com.campus_v2.models.UserFollows
import com.campus_v2.models.Users.autoIncrement
import com.campus_v2.models.Users.nullable
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*

@Serializable
data class ExposedUser(val name: String, val age: Int)
class UserService(private val database: Database) {
    object Users : Table() {
        val id= integer("id").autoIncrement()
        val username=varchar("name",255)
        val password=varchar("password", 255)
        val profileBio=varchar("bio",255)
        val university=varchar("university", 255)
        val team=varchar("team", 255)
        val userType=char("userType")
        val followersCount=integer("followers_count")
        val profileImagePath=varchar("profile_image_path", 255).nullable()

        override val primaryKey: PrimaryKey
            get() = PrimaryKey(id)
    }

    object UserFollows : Table() {
        val followerId = integer("followerId").references(Users.id)
        val followedId = integer("followedId").references(Users.id)
        override val primaryKey = PrimaryKey(followerId, followedId)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Users, UserFollows)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(user: ExposedUser): Int = dbQuery {
        Users.insert {
            it[username]=username
            it[password]=password
            it[profileBio]=profileBio
            it[followersCount]=followersCount
            it[userType]=userType
            it[university]=university
            it[team]=team
            it[profileImagePath]=profileImagePath

        }[Users.id]
    }

    suspend fun read(id: Int): ExposedUser? {
        return dbQuery {
            Users.select { Users.id eq id }
                .map { ExposedUser(it[Users.username], it[Users.followersCount]) }
                .singleOrNull()
        }
    }
    suspend fun update(id: Int, user: ExposedUser) {
        dbQuery {
            Users.update({ Users.id eq id }) {
                it[username] = user.name
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }
}