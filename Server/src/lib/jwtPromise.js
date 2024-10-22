const jwt = require("jsonwebtoken")

const sign = (payload, secret, options) => {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret.SECRET, options, (err, result) => {
            console.log(err)
            if(err){
                return reject(result)
            }
            console.log('pre resolve')
            return resolve
        })
    })
    return promise
}

const verify = (token, secret, options) => {
    const promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, options, (err, result) => {
            if (err) {
                return reject(result)
            }

            return resolve(result)
        })
    })
    return promise
}


module.exports = {
    sign,
    verify
}
