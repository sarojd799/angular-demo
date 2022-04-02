
const CHAT_API = {
    getSavedChats: function (senderId: number, receipentId: number) {
        return `/api/chat/${senderId}/${receipentId}/getAllMessages`
    }
}

export {
    CHAT_API
} 