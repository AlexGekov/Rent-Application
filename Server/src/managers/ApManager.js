const Apartment = require('../models/apartment')
const userManager = require('./UserManager')

const Imap = require('node-imap')
const { simpleParser } = require('mailparser').simpleParser

const imap = new Imap({
    user: userManager.Email,
    password: userManager.Password,
    host: imap.gmail.com,
    port: 993,
    tls: true
})

let userId = ''

exports.Find = async (apId) => {
    let apartment = Apartment.findById(apId)
    return apartment
}

exports.create = async (apData, userId) => {
    const nameLength = 5
    const locationLength = 6

    if (!apData.name) {
        throw new Error("Name is required!")
    } else if (apData.name.length < nameLength) {
        throw new Error("Name is too short!")
    }

    if (!apData.location) {
        throw new Error("Location is required!")
    } else if (apData.location.length < locationLength) {
        throw new Error("Enter a real location!")
    }

    if (!apData.image) {
        throw new Error("An image is required!")
    }


    if (!apData.tenants) {
        throw new Error("Tenants are required!")
    }

    if (!apData.rent) {
        throw new Error("Rent is required")
    }

    if (!apData.sign_date) {
        throw new Error("Sign date is required")
    }

    const apartment = apData
    apartment.owner = userId
    userId
    console.log(apartment)
    await Apartment.create(apartment)
    return
}

exports.FindApartments = async (userId) => {
    userId = userId
    return await Apartment.find({ owner: userId })
}

exports.search = async (Param) => {
    let result = await Apartment.find().lean()
    result = result.filter(post => post.name.toLowerCase().includes(Param.toLowerCase()))
    return result
}

exports.Delete = async (userId, apId) => {
    let apartment = await Apartment.findById(apId)
    if (apartment.owner == userId) {
        await Apartment.findByIdAndDelete(apId)
    }
    return
}

exports.Edit = (Id, Data) => Apartment.findByIdAndUpdate(Id, Data)

imap.once('ready', () => {
    openInbox( async (err, box) => {
        if (err) throw err;

        let apartments = await FindApartmentsAdresses()

        // Loop over each apartment to search for its utility bill email
        apartments.forEach((apartment) => {
            imap.search([['BODY', apartment.address]], (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    console.log(`No utility bill found for ${apartment.address}`);
                    return;
                }

                const f = imap.fetch(results, { bodies: '' });
                f.on('message', (msg, seqno) => {
                    msg.on('body', (stream) => {
                        simpleParser(stream, (err, parsed) => {
                            if (err) throw err;

                            // Parsed email details
                            console.log(`Utility bill for ${apartment.address}:`);
                            console.log(`From: ${parsed.from.text}`);
                            console.log(`Subject: ${parsed.subject}`);
                            console.log(`Body: ${parsed.text}`);
                        });
                    });
                });

                f.once('error', (err) => {
                    console.log(`Fetch error: ${err}`);
                });
            });
        });
    });
});

async function FindApartmentsAdresses(){
    const aps = await this.FindApartments(userId)
    let apLocations = aps.map(ap => ap.location)
    return apLocations
}


imap.once('error', (err) => {
    console.log(err);
});

imap.once('end', () => {
    console.log('Connection ended');
});

function openInbox(callback) {
    imap.openBox('INBOX', true, callback);
}