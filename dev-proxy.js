
const proxyConfig = {
  "/rest/config/widget": {
    target: "https://stg-folio-01.digitalenergycloud.com",
    ssl: {},
    changeOrigin: true,
    ws: true,
    secure: false,
    headers: {
      Host: "stg-folio-01.digitalenergycloud.com",
      Origin: "https://stg-folio-01.digitalenergycloud.com",
    },
  },
}

module.exports = proxyConfig
