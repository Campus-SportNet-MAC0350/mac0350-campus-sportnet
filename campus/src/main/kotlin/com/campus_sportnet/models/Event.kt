package com.campus_sportnet.com.campus_sportnet.models

class Event(a: String, b: String, c: String, d: String) : Post(a, b)
{
    private val eventDate: String = c
    private val eventTime: String = d
    private val confirmedCount: Int = 0

    fun getDate() : String
    {
        println("Fun getDate")
        return eventDate
    }
    fun getTime() : String
    {
        println("Fun getTime")
        return eventTime
    }
    fun getConfirmedCount() : Int
    {
        println("Fun getConfirmedCount")
        return confirmedCount
    }
    fun addConfirmedCount()
    {
        println("Fun addConfirmedCount")
    }
}