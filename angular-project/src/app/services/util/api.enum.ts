

const AUTH_API = {
    loginUserURI: '/login',
    registerNewUserURI: '/registerNewUser',
    checkUserByEmailURI: (name: string) => `/api/existsUserWithName?username=${name}`,
    getAllURI: function () {
        return [this.loginUserURI, this.registerNewUserURI, '/api/existsUserWithName']
    }
};

const USER_API = {
    searchUser: function (userName: string) {
        return `/api/getAllUsersByMatch?username=${userName}`
    }
}
export {
    AUTH_API,
    USER_API
};

