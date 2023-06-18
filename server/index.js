const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql2");
// import { params } from 'pa';

const db = mysql.createPool({  // clever cloud, cloud server mysql
    host: "bmx83quxfcxyki2o9qst-mysql.services.clever-cloud.com",
    user: "u40wucefck2ag3bc",
    password: "rS1o6aCR5EFtEGcaLjl6",
    database: "bmx83quxfcxyki2o9qst"
})

/* These 3 lines  of code app.use are configuring middleware for the Express application. */

/* `app.use(cors());` is configuring the CORS (Cross-Origin Resource Sharing) middleware for the
Express application. This allows the server to handle requests from different origins (domains) and
enables cross-domain communication. */
app.use(cors());
/* `app.use(express.json);` is configuring the middleware for 
parsing JSON data in the request body 
of incoming HTTP requests
. This middleware is provided by the `body-parser` package and it allows the
server to parse JSON data in the request body and make it available in the `req.body` object of the
request handler. */
app.use(express.json());
/* `app.use(bodyparser.urlencoded({ extended: true }));` is configuring the middleware for parsing
URL-encoded data in the request body of incoming HTTP requests. This middleware is provided by the
`body-parser` package and it allows the server to parse URL-encoded data in the request body and
make it available in the 
`req.body`
 object of the request handler. The `extended: true` option
allows the parsing of nested objects in the URL-encoded data. */
app.use(bodyParser.urlencoded({ extended: true }));
// end of basics

// fetch from database and sending to browser at "/api/get"
// app.get("/DB_se_lelo_aur_bhejo_browser_pe/get", (req, res) => { // is address pe sab database 's data chor do
//     const sqlGet = 'Select * FROM contact_db';
//     db.query(sqlGet, (err, result) => {
//         try {
//             console.log("Result", result);
//             res.send(result);
//         } catch (error) {
//             console.log("Error", err);
//         }
//     });
// })

// HARD CODED INSERT INTO DB PRACTICE 
// app.get("/", (req, res) => {
//     // sending  only at sql DB >> table in one get function
//     const sqlInsert = "INSERT into contact_db (name, email, contact) VALUES ('huz', 'ch@gmail.com', '+92336-01') "
//     db.query(sqlInsert, (err, result) => {

//         console.log("error", err); // error message bhejo if there is err.
//         console.log("result", result); // same applies to result
//         // sending  only at "/" browser in one get function
//         res.send("Hi");
//     })
// })

// after every stuff e.g get stuff.  we are not moving from sending to receiving data from browser(client side)
app.post("/db/post", (req, res) => {
    // aur ye aiy ga humari traf
    console.log(req.body)
    const { email, name } = req.body; // haris said it is compulsory to get it from req.body as client is at the body of browser. We'll have each name/email/contact recorded and will attach it to these {name,email,contact}
    const sqlInsert = "INSERT into contact_casim ( email, name) VALUES (?, ?)";
    db.query(sqlInsert, [email, name], (err, result) => { // ye line thori ratta marni wali bcz of [name, email, contact]
        try {
            console.log("result successful in inserting into DB", result);
        }
        catch {
            console.log("error at inserting into DB from Browser");
        }
    })
})

// app.post('/post', (req, res) => {
//     console.log(req.body)
// })

// app.delete("/Database_mein_removal/remove/:id", (req, res) => {

//     // BASICALLY REMOVAL KA KAAM DATABASE KA HAI. YE AXIOS APPROVE NHI KR RHA DELETE KRNE KA. YE BS URL ADDRESS BHIJWA RHA HAI app.delete pe. 
//     // YAHAN PE HAM NE :id BNAI HAI, IDHR SE SIRF id AIY GI {id} ke andar through params. BCZ     const { id } = req.params; MEIN KAHA GYA KE URL MEIN PARAMETER ID KO PKRO BS SIRF NUMBER WALI KO AUR {id} MEIN DAAL DO
//     const { id } = req.params;// why params?
//     const sqlInsert = "DELETE FROM contact_db WHERE Id = (?)";
//     db.query(sqlInsert, id, (err, result) => { // ye line thori ratta marni wali bcz of [name, email, contact]
//         try {
//             console.log("result successful in deleting from DB", result);
//         }
//         catch {
//             console.log("error at deleting from DB");
//         }
//     })
// })

app.listen(5000, () => {
    console.log("Running on port 5000")
})