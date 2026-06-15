const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.thehighwayking.il6brkr.mongodb.net",
  (err, records) => {
    if (err) {
      console.log("ERROR:", err);
    } else {
      console.log(records);
    }
  }
);