import React, { Component } from "react"
import PropTypes from "prop-types"
import cn from "classnames"
import "./styles.scss"

const indMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
}

export default class OptionItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    ind: PropTypes.number,
    onClick: PropTypes.func,
    isCorrect: PropTypes.oneOfType([PropTypes.bool, PropTypes.undefined]),
  }
  render() {
    const { label, ind, className, isCorrect } = this.props
    return (
      <div
        className={cn("app-optionitem-container", className, {
          "app-optionitem-container--error":
            isCorrect !== undefined && !isCorrect,
          "app-optionitem-container--correct":
            isCorrect !== undefined && isCorrect,
        })}
        onClick={this.handleClick}
      >
        <span>
          {indMap[ind]}. {label}
        </span>
      </div>
    )
  }
  handleClick = e => {
    const { onClick, ind } = this.props
    // eslint-disable-next-line
    onClick && onClick(ind, e)
  }
}
