// métodos get e set são pré implementados, inferidos quando usamos atribuição ou consulta
// ex: val user = Usuario(parametros); user.nomeUsuario = "nome"; println(user.nomeUsuario)
// Super-Classe Usuário
open class Usuario(var nomeUsuario: String, var numSeguidores: Int, var bio: String, var localizacao: String) {
    fun addSeguidor(){
        numSeguidores += 1
    }
}

// Sub-Classe Aluno
class Aluno(nomeUsuario: String, numSeguidores: Int, bio: String, localizacao: String, var modalidadeFavorita: String, var atleticaFavorita: String, var instituicao: String): Usuario(nomeUsuario, numSeguidores, bio, localizacao) {
    
}

// Sub-Classe Atletica
class Atletica(nomeUsuario: String, numSeguidores: Int, bio: String, localizacao: String, var mascote: String, var tituloDestaque: String): Usuario(nomeUsuario, numSeguidores, bio, localizacao) {

}

// Super-Classe Publicacao
open class Publicacao (qtdCurtidas: int, textoPub: String, usuarioPub: String, horaPub: String, dataPub: String) {
    fun addCurtida(){
        qtdCurtidas += 1
    }
}

// Sub-Classe Evento
class Evento(qtdCurtidas: int, textoPub: String, usuarioPub: String, horaPub: String, dataPub: String, var dataEvento: String, var horaEvento: String, var qtdParticipantes: int): Publicacao(qtdCurtidas, textoPub, usuarioPub, horaPub, dataPub){
    fun addParticipante(){
        qtdParticipantes += 1
    }
}