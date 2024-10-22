// import {ref, type Ref} from 'vue'

import { formUserData } from "../types/user";
import internalFetch from "../lib/InternalFetch";
import { userErrObj } from "../types/errors";


export async function register(userData: formUserData, confpassword: string) {
    try {
        const resp: Response = await internalFetch("POST", 'users/register', { ...userData, confpassword })
        const data = await resp.json()

        if (resp.status === 400) {
            throw data.message
        }

    } catch (err) {
        throw err
    }

}

export function validateData({ email, password, username }: formUserData, confpassword: string) {
    const EmailReg: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const emailLength = 5
    const usernameLength = 4
    const passwordLength = 4

    const errObj: userErrObj = {}

    if (!email) {
        errObj.email = "Email is required!"
    } else if (email.length < emailLength) {
        errObj.email = `Email should be at least ${emailLength} characters long!`
    } else if (!EmailReg.test(email)) {
        errObj.email = "Please provide a valid email!"
    }

    if (!username) {
        errObj.username = "Username is required!"
    } else if (username.length < usernameLength) {
        errObj.username = `Username should be at leat ${usernameLength} characters long!`
    }

    if (!password) {
        errObj.password = "Password is required!"
    } else if (password.length < passwordLength) {
        errObj.password = `Password should be at least ${passwordLength} characters long!`
    } else if (!confpassword) {
        errObj.confpassword = "Confirmation password is required!"
    } else if (password != confpassword){
        errObj.password = "Passwords do not match!"
    }
    
    return errObj
}