package com.campus_sportnet.com.campus_sportnet.models

open class User(a: String, b: String, c: String, d: Int)
{
    private val username: String = a
    private val profileBio: String = b
    private val location: String = c
    private val followersCount: Int = d
    private val id: Int = 0

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
    fun addFollower()
    {
        println("Fun addFollower")
    }
    fun setBio(a: String)
    {
        println("Fun setBio")
    }
    fun setUsername(a: String)
    {
        println("Fun setUsername")
    }
    fun setLocation(a: String)
    {
        println("Fun setLocation")
    }
}