import React, { Component } from "react"
import OptionItem from "./option-item"
import btnNext from "images/btn_next.png"
import locationImg from "images/location.png"
import PropTypes from "prop-types"

import "./styles.scss"
import cn from "classnames"

export default class QuestionPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      place: PropTypes.string,
      location: PropTypes.string,
      cover: PropTypes.string,
      question: PropTypes.shape({
        text: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
        answer: PropTypes.number,
      }),
      tip: PropTypes.string,
    }).isRequired,
    onNext: PropTypes.func,
  }
  state = {
    answer: null,
  }
  render() {
    const { data } = this.props
    const { answer } = this.state
    const { place, location, cover, question, tip } = data
    return (
      <div className="app-questionpage-container">
        <section className="app-questionpage-question">
          <h1 className="app-questionpage-question-header">
            <img src={locationImg} />
            <span className="app-questionpage-question-place">{place}</span>
            <span className="app-questionpage-question-location">
              {location}
            </span>
          </h1>
          <section className="app-questionpage-question-content">
            <h2 className="app-questionpage-question-title">{question.text}</h2>
            <ul className="app-questionpage-question-options">
              {question.options.map((qo, i) => (
                <li key={qo} className="app-questionpage-question-optionitem">
                  <OptionItem
                    label={qo}
                    ind={i}
                    isCorrect={
                      answer !== null ? i === question.answer : undefined
                    }
                    onClick={this.handleOptionItemClick}
                  />
                </li>
              ))}
            </ul>
          </section>
        </section>
        <section className="app-questionpage-cover-wrapper">
          <img src={cover} />
        </section>
        <section
          className={cn("app-questionpage-tipwrapper", {
            "app-questionpage-tipwrapper--hidden": answer === null,
          })}
        >
          <h1 className="app-questionpage-tip-title">小提示</h1>
          <p className="app-questionpage-tip-text">{tip}</p>
        </section>
        <section className="app-questionpage-footer">
          <img
            className="app-questionpage-btn-next"
            src={btnNext}
            onClick={this.handleNext}
          />
        </section>
      </div>
    )
  }
  handleOptionItemClick = ind => {
    this.setState({
      answer: ind,
    })
  }
  handleNext = () => {
    const { onNext, data } = this.props
    const { answer } = this.state
    if (answer === null) {
      return
    }
    // eslint-disable-next-line
    onNext && onNext(answer, data)
  }
}
