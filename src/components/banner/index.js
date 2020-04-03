import React from "react"
import Swiper from "react-id-swiper"
import "react-id-swiper/src/styles/scss/swiper.scss"
import cn from "classnames"
import "./styles.scss"

export default class Banner extends React.PureComponent {
  static defaultProps = {
    interval: 5,
  }

  render() {
    const { children, className, style, ...rest } = this.props

    return (
      <div className={cn("app-banner-container", className)} style={style}>
        <Swiper
          ref={ref => (this.ref = ref)}
          pagination=".swiper-pagination"
          paginationClickable
          slidesPerView={1.5}
          spaceBetween={15}
          centeredSlides
          centerInsufficientSlides
          autoplayDisableOnInteraction={false}
          {...rest}
        >
          {children}
        </Swiper>
      </div>
    )
  }
}
