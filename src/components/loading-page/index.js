import React, { Component } from "react"
// import Logo from "components/logo"
// import ProgressBar from "components/progress-bar"
import timer from "react-hoc-timerfuncs"

import PropTypes from "prop-types"
import "./styles.scss"

@timer
export default class LoadingPage extends Component {
  static propTypes = {
    onLoaded: PropTypes.func,
    isAuto: PropTypes.bool,
  }
  state = {
    progress: 0,
  }
  render() {
    const { progress } = this.state
    return (
      <div className="panda-loadingpage">
        <div className="panda-loadingpage-center">
          {/* <Logo className="panda-loadingpage-logo" /> */}
          <div className="panda-loadingpage-progress-wrapper">
            {/* <ProgressBar progress={progress} /> */}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.setInterval(() => {
      this.setState(state => ({
        progress: state.progress >= 100 ? 100 : state.progress + 0.5,
      }))
    }, 10)
  }
  componentDidUpdate(prevProps, prevState) {
    const { progress } = this.state
    if (progress && progress !== prevState.progress) {
      if (progress >= 100) {
        const { onLoaded } = this.props
        if (onLoaded) {
          onLoaded()
        }
      }
    }
  }
}
