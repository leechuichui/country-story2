const fs = require("fs")
const path = require("path")

const file = process.argv[2]

if (!file) {
  console.log("usage: map-center-converter file-to-convert.json")
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(file, "utf8"))

const transformedData = data.reduce((ret, item) => {
  ret[item.FIELD4] = [item.FIELD1, item.FIELD2]
  return ret
})

const dir = path.dirname(file)
const ext = path.extname(file)
const base = path.basename(file, ext)

fs.writeFileSync(
  `${dir}/${base}-converted${ext}`,
  JSON.stringify(transformedData),
)
