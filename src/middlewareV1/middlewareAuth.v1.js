import { v5 as uuidv5 } from 'uuid'

const NAMESPACE_URL_V1 = '3fa50577-c4fd-40d1-b0d8-1ddbe8c0021c'

class AuthDB {
    constructor(email, password, arr) {
        try {
            arr.some(elm => {
            if(elm == email){ throw new Error('user is already registered')
            } else { 
            const urlPassword = uuidv5(password, NAMESPACE_URL_V1)
            this.email = email
            this.password = urlPassword
       }})} catch (err) {
            throw new Error({message: err.message})
        }
    }
}


const authLogin = (useremail, userpassword, arr) => {
    try {
        let accessToken
        const authuser = arr.filter(authuser => authuser.email === useremail)
        console.log(authuser)
            if(authuser && authuser.some((auth)=> (uuidv5(userpassword, NAMESPACE_URL_V1) == auth.password))){ 
            accessToken=true
            return accessToken
         } else {
            throw new Error('unable to find user / user password not correct')
        }
    } catch(err) {
    throw new Error({'message': err.message})
    }
}


export default AuthDB

export { authLogin }