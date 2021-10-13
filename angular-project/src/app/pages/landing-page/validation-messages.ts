
const loginValidations = {
    username: {
        missingVal: 'Username is required!',
        emailExists: 'Another user with same email exists.'
    },
    password: {
        missingVal: 'Password is required'
    }
}

const signupValidationMsg = {
    email: {
        missingVal: 'Email is required!',
        invalidEmail: 'Email is invalid'
    },
    password: {
        missingVal: 'Password is required!'
    },
    confirmPassword: {
        missingVal: 'Confirm password is required!'
    },
    passwordGroup: {
        mismatch: 'Password and confirm password don\'t match'
    }
}

export {
    loginValidations,
    signupValidationMsg
}