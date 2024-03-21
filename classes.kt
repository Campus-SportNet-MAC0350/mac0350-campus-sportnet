// métodos get e set são pré implementados, inferidos quando usamos atribuição ou consulta
// ex: val user = Usuario(parametros); user.nomeUsuario = "nome"; println(user.nomeUsuario)
// Super-Classe Usuário
class Usuario(var nomeUsuario: String, var numSeguidores: Int, var bio: String, var localizacao: String) {
    fun addSeguidor() {
        numSeguidores += 1
    }
}

// Sub-Classe Aluno
class Aluno(nomeUsuario: String, numSeguidores: Int, bio: String, localizacao: String, var modalidadeFavorita: String, var atleticaFavorita: String, var instituicao: String) : Usuario(nomeUsuario, numSeguidores, bio, localizacao) {
    
}

// Sub-Classe Atletica
class Atletica(nomeUsuario: String, numSeguidores: Int, bio: String, localizacao: String, var mascote: String, var tituloDestaque: String) : Usuario(nomeUsuario, numSeguidores, bio, localizacao) {

}