class TokenService {
    getToken(){
        return localStorage.getItem('session_token');
    }

    setToken(token){
        localStorage.setItem('session_token', token);
    }

    removeToken(){
        localStorage.removeItem('session_token');
    }
}

export default new TokenService();
