import React, { Component } from "react"
import People from "components/people"
import map from "images/map.png"
import btnAccept from "images/btn_accept.png"
import PropTypes from "prop-types"
import "./styles.scss"

export default class IntroPage extends Component {
  static propTypes = {
    onAccept: PropTypes.func,
  }
  render() {
    const { onAccept } = this.props
    return (
      <div className="app-intropage-container">
        <img className="app-intropage-map" src={map} />
        <section className="app-intropage-footer">
          <div className="app-intropage-content">
            <People />
            <section className="app-intropage-introtext">
              <span>四川地大物博，乡间美食、</span>
              <span>特产更是数不胜数。</span>
              <span>你知道这些特产吗？</span>
              <span>知道多少呢？让我来考考你！</span>
            </section>
          </div>
          <img
            className="app-intropage-btnaccept"
            src={btnAccept}
            onClick={onAccept}
          />
        </section>
      </div>
    )
  }
}
