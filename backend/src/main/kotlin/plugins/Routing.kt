package plugins

import Contacts
import RentalRequests
import User
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.or
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import security.JwtConfig
import security.verifyUser
import java.security.MessageDigest

fun Application.configureRouting() {

    routing {

        route("/register") {
            post {
                val user: RegisterRequest? = try {
                    call.receive()
                } catch (e: ContentTransformationException) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid JSON format")
                    null
                }

                if (user != null) {
                    var status = false
                    val md = MessageDigest.getInstance("SHA-256")
                    val passwordHash = md.digest(user.password.toByteArray()).joinToString("") {
                        "%02x".format(it)
                    }
                    transaction {
                        val query = User.select { (User.username eq user.username) or (User.mail eq user.mail)}

                        if (query.count().toInt() == 0) {
                            User.insert {
                                it[username] = user.username
                                it[mail] = user.mail
                                it[password] = passwordHash
                            }
                            status = true
                        }
                    }
                    if (status) {
                        call.respond(HttpStatusCode.OK, "User registered successfully")
                    } else {
                        call.respond(HttpStatusCode.Conflict, "Username already exists")
                    }
                }
            }
        }

        route("/contacts") {
            post {
                val contacts: contacts? = try {
                    call.receive()
                } catch (e: ContentTransformationException) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid JSON format")
                    null
                }
                if (contacts != null) {
                    transaction {
                        Contacts.insert {
                            it[name] = contacts.name
                            it[mail] = contacts.mail
                            it[message] = contacts.message
                        }
                    }
                    call.respond(HttpStatusCode.OK)
                }
            }
        }
        route("/login") {
            post {
                val credentials: LoginRequest? = try {
                    call.receive()
                } catch (e: ContentTransformationException) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid JSON format")
                    null
                }

                if (credentials != null) {
                    val isAuthenticated = verifyUser(credentials.username, credentials.password)
                    if (isAuthenticated) {
                        var id:Int = -1
                        /*Костиль підпертий костильом, лежить на костилі*/
                        transaction {
                            val query = User.select { (User.username eq credentials.username) }
                            val result = query.firstOrNull()
                            val userId: Int? = result?.getOrNull(User.id)?.toInt()
                            if (userId != null) {
                                id = userId
                            }

                        }
                        val token = JwtConfig.instance.createAccessToken(id)
                        call.respond(HttpStatusCode.OK, TokenResponse(token,credentials.username))
                    } else {
                        call.respond(HttpStatusCode.Forbidden, "Invalid username or password")
                    }
                }
            }
        }
        authenticate {
            post("/rent") {
                val rent = call.receive<RentRequest>()
                transaction {
                    RentalRequests.insert {
                        it[name] = rent.username
                        it[car] = rent.car
                    }
                }
                call.respond(HttpStatusCode.OK)
            }
        }

    }
}
