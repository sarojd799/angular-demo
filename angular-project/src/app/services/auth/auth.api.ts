


const AUTH_API = {
    loginUserURI: '/login',
    registerNewUserURI: '/registerNewUser',
    checkUserByEmailURI: (name: string) => `/api/existsUserWithName?username=${name}`,
    getAllURI: function () {
        return [this.loginUserURI, this.registerNewUserURI, '/api/existsUserWithName']
    }
};

export { AUTH_API }