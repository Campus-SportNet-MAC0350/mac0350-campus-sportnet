package com.campus_sportnet.com.campus_sportnet.models

class Student(a: String, b: String, c: String, d: Int): User(a, b, c, d)
{
    private val favoriteSport: String = ""
    private val favoriteTeam: String = ""
    private val school: String = ""

    fun getSport(): String
    {
        println("Fun getSport")
        return favoriteSport
    }
    fun getTeam(): String
    {
        println("Fun getTeam")
        return favoriteTeam
    }
    fun getSchool(): String
    {
        println("Fun getSchool")
        return school
    }
    fun setSport(a: String)
    {
        println("Fun setSport")
    }
    fun setTeam(a: String)
    {
        println("Fun setTeam")
    }
    fun setSchool(a: String)
    {
        println("Fun setSchool")
    }
}