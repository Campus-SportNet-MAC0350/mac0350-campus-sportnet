package com.campus_v2.models

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import kotlinx.serialization.*
import kotlinx.serialization.encoding.*
import kotlinx.serialization.descriptors.*
import org.jetbrains.exposed.sql.ReferenceOption

// configure serialization for date-time format
object LocalDateTimeSerializer : KSerializer<LocalDateTime> {
    private val formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("LocalDateTime", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: LocalDateTime) {
        encoder.encodeString(value.format(formatter))
    }

    override fun deserialize(decoder: Decoder): LocalDateTime {
        return LocalDateTime.parse(decoder.decodeString(), formatter)
    }
}

@Serializable
data class Publication(
    val userId:Int,
    val publicationText:String,
    val publicationType:Char,
    val countParticipants:Int,
    @Serializable(with = LocalDateTimeSerializer::class)
    val dateTime: LocalDateTime,
    val id:Int=0
)

object Publications:Table(){
    private val id=integer("id").autoIncrement()
    val publicationType=char("publicationType")
    val publicationText=varchar("text", 255)
    val countParticipants=integer("participants")
    val dateTime=datetime("dateTime")
    val userId=integer("userId").references(Users.id, ReferenceOption.CASCADE)

    override val primaryKey: PrimaryKey
        get() = PrimaryKey(id)
}