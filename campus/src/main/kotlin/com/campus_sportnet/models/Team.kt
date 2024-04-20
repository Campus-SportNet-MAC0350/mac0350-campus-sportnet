package com.campus_sportnet.com.campus_sportnet.models

class Team(a: String, b: String, c: String, d: Int): User(a, b, c, d)
{
    private val pet: String = ""
    private val csHighlight: String = ""

    fun getPet(): String
    {
        println("Fun getPet")
        return pet
    }
    fun setPet(a: String)
    {
        println("Fun setPet")
    }
    fun changeHighlight(title: String)
    {
        println("Fun changeHighlight")
    }
}