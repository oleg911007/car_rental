package plugins
import Contacts
import RentalRequests
import User
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun migrate() {
    transaction {
        SchemaUtils.create(User)
        SchemaUtils.create(Contacts)
        SchemaUtils.create(RentalRequests)
    }
}