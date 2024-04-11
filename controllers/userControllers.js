const User = require('../models/myDataSchema'); // DB From Schema
const moment = require('moment');

/* ===={ Start Variable }==== */

const country_list = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", 
"Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", 
"Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", 
"Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", 
"Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", 
"Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", 
"Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", 
"Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", 
"Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
"Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", 
"French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
"Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
"Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", 
"India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
"Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", 
"Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", 
"Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", 
"Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", 
"Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", 
"Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", 
"Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", 
"Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", 
"Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
"Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
"Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", 
"South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", 
"St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", 
"Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", 
"Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
"Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
"United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", 
"Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", 
"Yugoslavia", "Zambia", "Zimbabwe"];

const genders = ["Male", "Female"];

/* ===={ Start Render Pages }==== */

const getAllData = (req, res) => {

    /* ===={ get Data From DB }==== */
    User.find().then(usersData => {

        res.render("index", {
            // users: [],
            users: usersData,
            moment: moment,
        });
    })
    .catch(error => console.log(error));
}

const editData = (req, res) => {

    User.findById(req.params.id)
    .then(result => {
        res.render("user/edit", {
            user: result,
            countries : country_list,
            genders: genders,
        })
        
    }).catch(error => console.log(error));
}

const showUser =(req, res) => {

    User.findById(req.params.id).then(result => {
        res.render("user/view", { user: result, moment: moment, })

    }).catch(error => console.log(error));

}

const newUser = (req, res) => {
    res.render("user/add", {
        countries : country_list,
        genders: genders,
    })
}

/* ===={ Start Post Request }==== */

const addNewUser = function(req, res) {

    User.create(req.body)
    .then(result => {

        console.log("Data is created");

        res.redirect("/");
    })
    .catch(error => console.log(error));

}

const searchUser = function(req, res) {

    const searchText = req.body.search.trim();

    User.find(
        {$or: [
                {firstName: searchText},
                {lastName: searchText}
            ]}
).then(result => {
        console.log("search is done")
        res.render('user/search', {users: result});
    }).catch(error => console.log(error))
}

/* ===={ Start PUT Request  }==== */

const updateUserData = function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body).then(result => {
        res.redirect("/");
    }).catch(error => console.log(error));
}

/* ===={ Start delete Request  }==== */

const deleteUserData = function(req, res) {
    User.findByIdAndDelete(req.params.id).then(result => {
        console.log("Data is deleted");
        res.redirect("/")
    }).catch(error => console.log(error));
}

/* ===={ Start Exports  }==== */

module.exports = {
    getAllData,
    editData,
    showUser,
    newUser,
    addNewUser,
    searchUser,
    updateUserData,
    deleteUserData,
};