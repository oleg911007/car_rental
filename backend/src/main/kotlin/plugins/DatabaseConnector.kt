import org.jetbrains.exposed.sql.Database


fun initDatabase() {
    Database.connect(
        url = "jdbc:mysql://#:#/mydb",
        driver = "com.mysql.cj.jdbc.Driver",
        user = "#",
        password = "#"
    )
}