function unauthorizedError(){
    return{
        name: "UnauthorizedError",
        message: "You must be signed in to continue"
    }
}
function invalidCredentialsError(){
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect"
    }
}
function notFoundError(){
    return {
        name: "NotFoundError",
        message: "No result for this search"
    }
}
function conflictError(message){
    return {
        name: "ConflictError",
        message
    }
}
function DuplicatedEmailError(){
    return{
        name: "DuplicatedEmailError",
        message: "Unautorized email"
    }
}

export default {
    unauthorizedError,
    invalidCredentialsError,
    notFoundError,
    conflictError,
}