package com.campus_v2.plugins

import com.campus_v2.models.EventsParticipation
import com.campus_v2.models.Publications
import com.campus_v2.models.UserFollows
import com.campus_v2.models.Users
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.*
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

private fun provideDataSource(url:String,driverClass:String):HikariDataSource{
    val hikariConfig= HikariConfig().apply {
        driverClassName=driverClass
        jdbcUrl=url
        maximumPoolSize=3
        isAutoCommit=false
        transactionIsolation="TRANSACTION_REPEATABLE_READ"
        validate()
    }
    return HikariDataSource(hikariConfig)
}

fun Application.configureDatabases() {
//    val driverClass=environment.config.property("storage.driverClassName").getString()
//    val jdbcUrl=environment.config.property("storage.jdbcURL").getString()
    val db = Database.connect(
        url = "jdbc:postgresql://localhost:5432/csnDB",
        driver = "org.postgresql.Driver",
        user = "newuser",
        password = "password"
    )
    transaction(db){
        SchemaUtils.create(Users,Publications,UserFollows,EventsParticipation)
    }
}

// perform database operations
suspend fun <T> dbQuery(block:suspend ()->T):T{
    return newSuspendedTransaction(Dispatchers.IO) { block() }
}