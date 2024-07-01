package com.campus_v2.db

import com.campus_v2.models.User
import org.jetbrains.exposed.sql.ResultRow

interface UserService {
    suspend fun getUserFromResultRow(row: ResultRow): User
    suspend fun addUser(user: User):User?
    suspend fun updateUser(user: User):Boolean
    suspend fun deleteUser(user: User):Boolean
    suspend fun getUsers():List<User>
    suspend fun searchUser(query:String):List<User>
    suspend fun getUser(id:Int):User?
    suspend fun getUserByLogin(email: String, pass: String):User?
    suspend fun followUser(followerId: Int, followedId: Int): Boolean
    suspend fun unfollowUser(followerId: Int, followedId: Int): Boolean
    suspend fun getFollowedUser(followerId: Int, followedId: Int): Boolean
    suspend fun getFollowedUsers(userId: Int): List<User>
    suspend fun getFollowers(userId: Int): List<User>
    suspend fun getFollowing(userId: Int): List<User>
}