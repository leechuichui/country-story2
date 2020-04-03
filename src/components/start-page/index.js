import React, { Component } from "react"
import People from "components/people"
import rightCloud from "images/cloud_right.png"
import leftCloud from "images/cloud_left.png"
import sun from "images/sun.png"
import btnGo from "images/btn_go.png"
import PropTypes from "prop-types"
import "./styles.scss"

export default class StartPage extends Component {
  static propTypes = {
    onGoClick: PropTypes.func,
  }

  render() {
    const { onGoClick } = this.props
    return (
      <div className="app-startpage-container">
        <img className="app-startpage-leftcloud" src={leftCloud} />
        <img className="app-startpage-rightcloud" src={rightCloud} />
        <img className="app-startpage-sun" src={sun} />
        <People className="app-startpage-people" isBottom />
        <section className="app-startpage-welcome-wrapper">
          <section className="app-startpage-welcome">
            <span>大家好,我是导游殷九龙</span>
            <span>欢迎来到四川，</span>
            <span>今天，我将带大家去四川的乡间走走……</span>
          </section>
        </section>
        <img className="app-startpage-btngo" src={btnGo} onClick={onGoClick} />
      </div>
    )
  }
}
