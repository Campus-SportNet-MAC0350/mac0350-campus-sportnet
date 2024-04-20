package com.campus_sportnet.com.campus_sportnet.models

open class Post(a: String, b: String)
{
    private val likesCount: Int = 0
    private val postText: String = a
    private val postUser: String = b
    private val postTime: String = ""
    private val postDate: String = ""

    fun addLike()
    {
        println("Fun addLike")
    }
    fun editText()
    {
        println("Fun editText")
    }
}