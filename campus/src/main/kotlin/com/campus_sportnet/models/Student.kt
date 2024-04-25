package com.campus_sportnet.com.campus_sportnet.models

class Student(a: String, b: String, c: String, d: Int): User(a, b, c, d)
{
    private val favoriteSport: String = ""
    private val favoriteTeam: String = ""

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
    fun setSport(a: String)
    {
        favoriteSport = a
        println("Fun setSport")
    }
    fun setTeam(a: String)
    {
        favoriteTeam = a
        println("Fun setTeam")
    }
}