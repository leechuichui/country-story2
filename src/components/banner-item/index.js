import React from "react"
import cn from "classnames"
import "./styles.scss"

export default class BannerItem extends React.PureComponent {
  render() {
    const { src, onClick, className, style } = this.props
    return (
      <div className={cn("app-banneritem", className)} style={style}>
        <img
          className="app-banneritem-img"
          src={src}
          onClick={onClick}
          alt="Ad Banner"
        />
      </div>
    )
  }
}
