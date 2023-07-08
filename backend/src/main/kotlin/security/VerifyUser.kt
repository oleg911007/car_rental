package security

import User
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.security.MessageDigest

fun verifyUser(username: String, password: String): Boolean {
    val md = MessageDigest.getInstance("SHA-256")
    val passwordHash = md.digest(password.toByteArray()).joinToString("") {
        "%02x".format(it)
    }

    var exists = false
    transaction {
        val query = User.select { (User.username eq username) and (User.password eq passwordHash) }
        if (query.count().toInt() > 0) {
            exists = true
        }
    }
    return exists
}