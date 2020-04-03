import React, { Component } from "react"
import peopleImg from "images/people.png"
import peopleBottom from "images/start_people_bg.png"
import cn from "classnames"
import PropTypes from "prop-types"
import "./styles.scss"

export default class People extends Component {
  static propTypes = {
    isBottom: PropTypes.bool,
    className: PropTypes.string,
  }
  render() {
    const { isBottom, className } = this.props
    return (
      <div className={cn("app-people-container", className)}>
        {isBottom && <img className="app-people-bottom" src={peopleBottom} />}
        <img className="app-people-role" src={peopleImg} />
      </div>
    )
  }
}
