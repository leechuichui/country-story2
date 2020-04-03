import React, { Component } from "react"
import Banner from "components/banner"
import BannerItem from "components/banner-item"
import "react-id-swiper/src/styles/scss/swiper.scss"

import logo from "images/logo.png"
import bg from "images/end_bg.png"
import iptv from "images/iptv.png"
import sctv from "images/sctv.png"
import panda from "images/panda.png"

const bannerCount = Array.from(new Array(6).keys()).map(m => ({
  src: require(`images/${m + 1}.png`),
}))

import "./styles.scss"

export default class EndPage extends Component {
  render() {
    return (
      <div className="app-endpage-container">
        <section className="app-endpage-header">
          <img src={logo} />
          <h1 className="app-endpage-header-text">正在直播 敬请关注</h1>
        </section>
        <section className="app-endpage-content">
          <Banner
            initialSlide={3}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
          >
            {bannerCount.map((m, i) => {
              return <BannerItem key={i} src={m.src} />
            })}
          </Banner>
        </section>
        <section className="app-endpage-footer">
          <ul className="app-endpage-partner-list">
            <li>
              <img src={sctv} />
            </li>
            <li>
              <img src={iptv} />
            </li>
            <li>
              <img src={panda} />
            </li>
          </ul>
          <span className="app-endpage-company">
            四川金熊猫新媒体有限公司 荣誉出品
          </span>
        </section>
        <img className="app-endpage-bg" src={bg} />
      </div>
    )
  }
}
