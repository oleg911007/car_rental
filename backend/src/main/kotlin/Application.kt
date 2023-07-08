import plugins.configureRouting
import plugins.migrate
import security.configureSecurity
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.*
import kotlinx.serialization.json.Json
fun Application.module() {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            coerceInputValues = true
        })
    }
    install(CORS){
        allowHost("localhost:3000")
        allowHost("127.0.0.1:8080")
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
    }
        configureSecurity()
        initDatabase()
        migrate()
        configureRouting()
    }

fun main() {
    embeddedServer(Netty, port = 80, host = "127.0.0.1", module = Application::module)
        .start(wait = true)
}


