import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.CurrentTimestamp
import org.jetbrains.exposed.sql.javatime.timestamp

object User : Table(){
    val id = integer("id").autoIncrement()
    val username = varchar("username",30)
    val mail = varchar("mail",50)
    val password = varchar("password",300)
    override val primaryKey = PrimaryKey(id)
}

object Contacts : Table(){
    val id = integer("id").autoIncrement()
    val name = varchar("name",50)
    val mail = varchar("mail",50)
    val message = varchar("message", 500)
    override val primaryKey = PrimaryKey(id)
}
object RentalRequests : Table(){
    val id = integer("id").autoIncrement()
    val name = varchar("name",50)
    val car = varchar("car",50)
    val createdAt = timestamp("created_at").defaultExpression(CurrentTimestamp())
    override val primaryKey = PrimaryKey(id)
}
