module.exports = {
    port:process.env.SERVER_PORT || 8000,
    prefApiVersion:process.env.PREFIX_API_VERSION || "/api/v1",
   viewsFolder:`${__dirname}/../src/resource/views`,
   viewEngine:"ejs",
};
