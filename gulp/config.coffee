site = process.env.site_id or 'setting';


settings = require("./sites/#{site}")

module.exports =
  settings
