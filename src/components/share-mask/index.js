import React, { Component } from "react"
import shareDirection from "images/share.png"
import PropTypes from "prop-types"
import "./styles.scss"

export default class ShareMask extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }
  render() {
    const { onClick } = this.props
    return (
      <div className="app-sharemask-container" onClick={onClick}>
        <img src={shareDirection} />
      </div>
    )
  }
}
