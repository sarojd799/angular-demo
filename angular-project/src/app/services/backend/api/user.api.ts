
const USER_API = {
    searchUser: function (userName: string) {
        return `/api/getAllUsersByMatch?username=${userName}`
    },
    searchURIForUserConSearch(userId: number, keyword: string) {
        return `/api/${userId}/getAllUsersWithKeyword?keyword=${keyword}`;
    },

    addConnection: function (userId: string) {
        return `/api/${userId}/saveNewConnection`
    },

    getAllConnections: function (userId: number) {
        return `/api/${userId}/getAllConnectionsOfUser`
    },

    updateUserInfo: function (userId: number) {
        return `/api/${userId}/updateUserInfo`;
    },

    updateUserInfoURISnippet: 'updateUserInfo',

    uploadUserProfileImg: function (userId: number) {
        return `/api/${userId}/uploadProfileImage`
    },

    updateUserStatus: function (userId: number) {
        return `/api/${userId}/updateUserStatus`;
    },


    getProfileById: function (userId: number) {
        return `/api/${userId}/getProfileById`
    }
}
export {
    USER_API
};