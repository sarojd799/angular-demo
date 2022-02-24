


const AUTH_API = {
    loginUserURI: '/login',

    registerNewUserURI: '/registerNewUser',

    checkUserByEmailURI: (name: string) => `/api/existsUserWithName?username=${name}`,

    refreshTokenURI: () => `/api/refreshToken`,

    logoutUserURI: (userId: number) => `/auth/${userId}/logout`,

    getAllURI: function () {
        return [this.loginUserURI, this.registerNewUserURI, '/api/existsUserWithName']
    }
};

export { AUTH_API }