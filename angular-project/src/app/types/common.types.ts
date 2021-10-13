
type BasicAuthType = {
    username: String,
    password: String
}

type StudentType = {
    firstName: String,
    lastName: String,
    middleName: String | null,
    gender: String,
    email: String,
    phone: String
}


export type {
    BasicAuthType,
    StudentType
}