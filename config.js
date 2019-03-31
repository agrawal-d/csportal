var isLocal = true;
var database = (isLocal) ? "mongodb://127.0.0.1/cs" : "mongodb+srv://root:mongodb@hereisdx-khs4b.mongodb.net/cs?retryWrites=true"; // Server
var googleClient = (isLocal) ? "120289353582-qrn3fenvf6pkq0s8hfhk8002fju02g4g.apps.googleusercontent.com" : "860179520621-ajigborrngka61ggo7ueikn54hi3kuq1.apps.googleusercontent.com";//Server

var vars = {
    database: database,
    googleClient: googleClient,
    googleSecret: ""
}
console.log(vars.database)
module.exports = vars