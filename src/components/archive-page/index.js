import React, { Component } from "react"
import People from "components/people"
import btnShare from "images/btn_share.png"
import btnAgain from "images/btn_again.png"
import fire from "images/fire.png"
import PropTypes from "prop-types"

import "./styles.scss"

export default class ArchivePage extends Component {
  static propTypes = {
    correctCount: PropTypes.number,
    percent: PropTypes.string,
    onAgainClick: PropTypes.func,
    onShareClick: PropTypes.func,
  }
  render() {
    const { correctCount, percent, onAgainClick, onShareClick } = this.props
    return (
      <div className="app-archivepage-container">
        <section className="app-archivepage-header">
          <span className="app-archivepage-header-text">
            恭喜你共计答对
            {correctCount}
            题，
          </span>
          <span className="app-archivepage-header-text app-archivepage-header-text--bottom">
            成功超越了全国
            <span className="app-archivepage-header-text--strong">
              {percent}%
            </span>
            玩家
          </span>
        </section>
        <section className="app-archivepage-achieve">
          <People />
          <h1 className="app-archivepage-achieve-text">
            少年真是万中无一的奇才，你就是四川的百科全书！
          </h1>
        </section>
        <section className="app-archivepage-action-area">
          <img
            className="app-archivepage-action-area-btn"
            src={btnAgain}
            onClick={onAgainClick}
          />
          <img
            className="app-archivepage-action-area-btn"
            src={btnShare}
            onClick={onShareClick}
          />
        </section>
        <img className="app-archivepage-fire" src={fire} />
      </div>
    )
  }
}
