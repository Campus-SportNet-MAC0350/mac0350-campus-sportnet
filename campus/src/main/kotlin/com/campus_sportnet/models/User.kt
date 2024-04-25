package com.campus_sportnet.com.campus_sportnet.models

open class User(a: String, b: String, c: String, d: Int, e: Char)
{
    private val username: String = a
    private val profileBio: String = b
    private val location: String = c
    private val followersCount: Int = d
    private val userType: Char = e
    private val id: Int = 0
    private val school: String = ""

    fun getFollowers() : Int
    {
        println("Fun getFollowers")
        return followersCount
    }
    fun getUsername() : String
    {
        println("Fun getUsername")
        return username
    }
    fun getBio() : String
    {
        println("Fun getBio")
        return profileBio
    }
    fun getLocation() : String
    {
        println("Fun getLocation")
        return location
    }
    fun getSchool(): String
    {
        println("Fun getSchool")
        return school
    }
    fun getUserType(): Char
    {
        println("Fun getUserType")
        return userType
    }
    fun addFollower()
    {
        followersCount += 1
        println("Fun addFollower")
    }
    fun setBio(a: String)
    {
        if (length(a) <= 180)
        {
            profileBio = a
        }
        else {
            println("ERRO: Insira uma biografia com menos de 180 caracteres.")
        }
    }
    fun setUsername(a: String)
    {
        username = a
        println("Fun setUsername")
    }
    fun setLocation(a: String)
    {
        location = a
        println("Fun setLocation")
    }
    fun setSchool(a: String)
    {
        school = a
        println("Fun setSchool")
    }
    fun setUserType(a: Char)
    {
        if(a == 's' || a == 't')    // student or team
            userType = a
        else
            println("Por favor, insira um tipo de usuário válido")
    }
}