package plugins

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(
    val username: String,
    val password: String
)
@Serializable
data class RegisterRequest(
    val username: String,
    val mail: String,
    val password: String
)
@Serializable
data class contacts (
    val name: String,
    val mail: String,
    val message: String
)
@Serializable
data class TokenResponse(val token: String,val username: String)

@Serializable
data class RentRequest(val username : String,val car: String)