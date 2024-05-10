plugins {
    kotlin("jvm") version "1.9.23"
}

group = "com.campus_sportnet"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("io.ktor:ktor-server-call-logging:$ktor_version")
}

tasks.test {
    useJUnitPlatform()
}