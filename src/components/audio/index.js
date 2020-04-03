import React, { Component } from "react"
import audio from "images/audio.png"
import audioPause from "images/audio_pause.png"
import cls from "classnames"
import PropTypes from "prop-types"

import "./styles.scss"
export default class Audio extends Component {
  static propTypes = {
    className: PropTypes.string,
  }
  state = {
    pause: true,
  }
  render() {
    const { pause } = this.state
    const { className } = this.props
    return (
      <div
        className={cls("panda-audio-container", className || "")}
        onClick={this.toggle}
      >
        <img className="panda-audio-icon panda-audio-play" src={audio} />
        {pause && (
          <img
            className="panda-audio-icon panda-audio-pause"
            src={audioPause}
          />
        )}
        <audio
          ref={ref => (this.audio = ref)}
          id="bgsound"
          preloadloop="loop"
          src="//cdn1.zhizhucms.com/materials/556878/audio/46c63c06002f697a64ea7c503a44390a.mp3"
          autoPlay=""
        >
          <source src="//cdn1.zhizhucms.com/materials/556878/audio/46c63c06002f697a64ea7c503a44390a.mp3" />
        </audio>
      </div>
    )
  }
  toggle = () => {
    const { pause } = this.state
    if (pause) {
      // Play audio
      this.audio.play()
    } else {
      // Pause audio
      this.audio.pause()
    }
    this.setState(state => ({ pause: !state.pause }))
  }
}
