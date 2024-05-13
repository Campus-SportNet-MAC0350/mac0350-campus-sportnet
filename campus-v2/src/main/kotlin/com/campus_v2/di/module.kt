package com.campus_v2.di

import com.campus_v2.db.UserService
import com.campus_v2.db.UserServiceImpl
import com.campus_v2.db.PublicationService
import com.campus_v2.db.PublicationServiceImpl
import org.koin.dsl.module

val appModule= module {
    single<UserService>{
        UserServiceImpl()
    }
    single<PublicationService>{
        PublicationServiceImpl()
    }
}