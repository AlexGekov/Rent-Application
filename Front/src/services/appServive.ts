import internalFetch from "../lib/InternalFetch";
import { formAppData } from "../types/app";
import { appErrObj } from "../types/errors";

export function validateData({ name, location, image, tenants, rent, sign_date }: formAppData,) {
    const nameLength = 5
    const locationLength = 6
    const errObj: appErrObj = {}

    if (!name) {
        errObj.name = "Name is required!"
    } else if (name.length < nameLength) {
        errObj.name = "Name is too short!"
    }

    if (!location) {
        errObj.location = "Location is required!"
    } else if (location.length < locationLength) {
        errObj.location = "Enter a real location!"
    }

    if (!image) {
        errObj.image = "An image is required!"
    } else if (!image.includes(".jpg") || !image.includes(".png")) {
        errObj.image = "Jpg/png image is required"
    }

    if (!tenants) {
        errObj.tenants = "Tenants are required!"
    }

    if(!rent){
        errObj.rent = "Rent is required"
    }

    if(!sign_date){
        errObj.sign_date = "Sign date is required"
    }

    return errObj
}

export async function create(appData: formAppData){
    try{
        const resp: Response = await internalFetch("POST", "/apartments/create", {...appData})
    }catch(err){

    }

}