import { v5 as uuidv5 } from 'uuid'

const NAMESPACE_URL_V1 = '3fa50577-c4fd-40d1-b0d8-1ddbe8c0021c'

class AuthDB {
    constructor(email, password, arr) {
        try {
            arr.forEach(elm => {
            if(elm == email) throw new Error('user is already registered')
            const urlPassword = uuidv5(password, NAMESPACE_URL_V1)
            this.email = email
            this.password = urlPassword
       }) } catch (err) {
            throw new Error({message: err.message})
        }
    }
}


const authLogin = (useremail, userpassword, arr) => {
    try {
        let accessToken
        arr.map((authuser) => {
            if(authuser.email !== useremail) throw new Error('unable to find user')
            if(authuser.email && (uuidv5(userpassword, NAMESPACE_URL_V1) == authuser.password)){
                accessToken=true
            } else throw new Error('user password not correct')
        })
        return accessToken
    } catch(err) {
    throw new Error({'message': err.message})
}
}


export default AuthDB

export { authLogin }