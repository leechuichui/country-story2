import "./polyfill"
import "styles/index.scss"
require("gsap")
import quickClick from "quickclick"
import React from "react"
import { render } from "react-dom"

// FIXME: this is a temporary fix for `react-hoc-query`
import "regenerator-runtime/runtime"

import Container from "container"

console.log(`Current build profile is **${BUILD_PROFILE_NAME}**`)
console.log(`Version: ${APP_VERSION} - ${GIT_COMMIT_HASH}`)

const ele = document.getElementById("root")

quickClick(document.body)


render(<Container />, ele)
