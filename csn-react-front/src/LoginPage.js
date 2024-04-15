export const LoginPage = () => {
    return (
        <div className="containerLogin">
            <div className="Centro">
                <div className="loginDetails">
                    <img src="logo192.png" className="logo_login" alt="logo"/>
                    <b><p className="login_txt">Bem Vindo ao Campus SportNet!</p></b>
                    <p className="login_txt">Faça login para continuar.</p>
                </div>
                <div className="login_form">
                    <form>
                        <input type='text' placeholder='Email' />
                        <input type='password' placeholder='Senha' />
                        <a href="register.html" className="register_url">Não possui uma conta? Cadastre-se!</a>
                        <button type="button">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};