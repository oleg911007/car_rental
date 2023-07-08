package security

import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
fun Application.configureSecurity(){
    JwtConfig.initialize("web")
    install(Authentication){
        jwt{
            verifier(JwtConfig.instance.verifier)
            validate{
                val claim: Int = it.payload.getClaim(JwtConfig.CLAIM).asInt()
                if(claim != null){
                    UseridPrincipalForUser(claim)
                }else{
                    null
                }
            }
        }
    }
}