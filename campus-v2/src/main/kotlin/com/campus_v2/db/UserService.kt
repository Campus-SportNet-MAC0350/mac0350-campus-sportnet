package com.campus_v2.db

import com.campus_v2.models.User
interface UserService {
    suspend fun addUser(user: User):User?
    suspend fun updateUser(user: User):Boolean
    suspend fun deleteUser(user: User):Boolean
    suspend fun getUsers():List<User>
    suspend fun searchUser(query:String):List<User>
    suspend fun getUser(id:Int):User?
}