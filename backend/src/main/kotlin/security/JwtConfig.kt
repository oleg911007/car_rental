package security
import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm

class JwtConfig private constructor(secret: String){
    private val algorithm = Algorithm.HMAC256(secret)
    val verifier: JWTVerifier = JWT
        .require(algorithm)
        .withIssuer()
        .withAudience()
        .build()
    fun createAccessToken(id: Int):String =  JWT
        .create()
        .withIssuer(ISSUER)
        .withAudience(AUDIENCE)
        .withClaim(CLAIM,id)
        .sign(algorithm)
    companion object{
        private const val ISSUER = "web"
        private const val AUDIENCE = "web"
        const val CLAIM = "id"
        lateinit var instance: JwtConfig
            private set
        fun initialize(secret: String){
            synchronized(this){
                if(!this::instance.isInitialized){
                    instance = JwtConfig(secret)
                }
            }
        }
    }
}