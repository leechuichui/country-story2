import React, { Fragment } from "react"
import { connect } from "react-redux"
import LoadingPage from "components/loading-page"
import StartPage from "components/start-page"
import IntroPage from "components/intro-page"
import ArchivePage from "components/archive-page"
import EndPage from "components/end-page"
import QuestionPage from "components/question-page"
import Audio from "components/audio"
import ShareMask from "components/share-mask"
import * as mediaQuery from "libs/media-query"
import * as rem from "libs/rem"
import * as act from "modules/app/actions"
import * as orientation from "libs/orientation"
import questionList from "libs/questions"
import { PHONE, PAD_NARROW, PAD_WIDE } from "libs/constants"
import produce from "immer"
import "./styles.scss"

const SWIPE_TYPE = {
  RIGHT: "right",
  LEFT: "left",
}

const initState = {
  prev: 0,
  next: 1,
  num: 0,
  startX: 0,
  startY: 0,
  distX: 0,
  distY: 0,
  startTime: null,
  direct: null,
  swipeNext: false,
  swipePrev: false,
  isLoading: false,
  currentQuestion: null,
  questions: questionList,
  pageCount: questionList.length + 4,
  answers: {}, // {[questionInd]: answer}
  res: {},
  isShare: false,
}
@connect(
  ({ app }) => ({
    breakpoint: app.breakpoint,
    landscape: app.landscape,
  }),
  {
    setBreakpoint: act.setBreakpoint,
    setLandscape: act.setLandscape,
  },
)
export default class App extends React.Component {
  state = initState
  render() {
    const { num, prev, next, isLoading, isShare } = this.state
    const { breakpoint } = this.props
    if (breakpoint == null) return null
    return (
      <Fragment>
        <div className="panda-app-wrapper">
          {<Audio className="panda-app-audio" />}
          <div
            className="panda-app-tmp-prev"
            ref={ref => (this.prevPageContainer = ref)}
          >
            {this.renderPage(prev, false)}
          </div>
          <div className="panda-app" ref={ref => (this.pageContainer = ref)}>
            {isLoading ? (
              <LoadingPage onLoaded={this.handleLoaded} />
            ) : (
              this.renderPage(num)
            )}
          </div>
          <div
            className="panda-app-tmp-next"
            ref={ref => (this.nextPageContainer = ref)}
          >
            {this.renderPage(next, false)}
          </div>
        </div>
        {isShare && <ShareMask onClick={this.handleShareMaskClick} />}
      </Fragment>
    )
  }
  handleLoaded = () => {
    this.setState({
      isLoading: false,
    })
  }
  handleShareMaskClick = () => {
    this.setState({
      isShare: false,
    })
  }

  renderPage = (num, isCurrent = true) => {
    const { res } = this.state
    const questions = this.state.questions

    const pages = [
      <StartPage
        key="start"
        isAnimation={isCurrent}
        onGoClick={this.handleGoClick}
      />,
      <IntroPage
        key="intro"
        isAnimation={isCurrent}
        onAccept={this.handleAccept}
      />,
      ...questions.map((q, ind) => (
        <QuestionPage
          key={q.id}
          data={q}
          onNext={answer => this.handleQuestionNext(ind, answer)}
        />
      )),
      <ArchivePage
        key="archive"
        correctCount={res.correctCount}
        percent={res.percent}
        isAnimation={isCurrent}
        onAgainClick={this.handleAgain}
        onShareClick={this.handleShare}
      />,
      <EndPage key="end" isAnimation={isCurrent} />,
    ]
    return pages[num]
  }
  handleGoClick = () => {
    this.swipePage(SWIPE_TYPE.LEFT)
  }
  handleAccept = () => {
    this.swipePage(SWIPE_TYPE.LEFT)
  }
  handleAgain = () => {
    this.setState(initState)
  }
  handleShare = () => {
    this.setState({
      isShare: true,
    })
  }
  handleQuestionNext = (ind, answer) => {
    const { questions } = this.state
    this.setState(
      state =>
        produce(state, draft => {
          draft.answers = {
            ...state.answers,
            [ind]: answer,
          }
        }),
      () => {
        if (questions.length - 1 === ind) {
          const res = this.calcResult(this.state.answers, questions)
          this.setState({ res }, () => {
            this.swipePage(SWIPE_TYPE.LEFT)
          })
        } else {
          this.swipePage(SWIPE_TYPE.LEFT)
        }
      },
    )
  }
  calcResult = (answers, questions) => {
    let correctCount = 0
    const count = questions.length
    questions.map((q, i) => {
      if (q.question.answer === answers[i]) {
        correctCount++
      }
    })
    const percent = ((correctCount / count) * 100).toFixed(0)
    return { correctCount, percent }
  }
  async componentDidMount() {
    const { setBreakpoint, setLandscape } = this.props
    mediaQuery.add("(max-width: 767px)", () => setBreakpoint(PHONE))
    mediaQuery.add("(min-width: 768px) and (max-width: 1023px)", () =>
      setBreakpoint(PAD_NARROW),
    )
    mediaQuery.add("(min-width: 1024px)", () => setBreakpoint(PAD_WIDE))
    rem.init()
    orientation.init(() => {
      if (orientation.getScreenAngle() === 90) {
        setLandscape(true)
      } else {
        setLandscape(false)
      }
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.breakpoint !== prevProps.breakpoint) {
      rem.calcBaseFont()
    }
    const { num, pageCount } = this.state
    const { swipeNext, swipePrev } = this.state
    if (swipeNext && swipeNext !== prevState.swipeNext) {
      if (this.animNext) {
        this.animNext.restart()
      } else {
        this.animNext = new TimelineLite({
          pause: true,
          onComplete: () =>
            this.setState(state => ({
              num: state.num < pageCount ? state.num + 1 : state.num,
              swipeNext: false,
              direct: null,
            })),
        })
          .set(this.nextPageContainer, { opacity: 1, display: "block" })
          .to(this.nextPageContainer, 0.5, { x: 0 })
          .to(this.nextPageContainer, 0, { opacity: 0, x: "100%" })
        this.animNext.restart()
      }
    }
    if (swipePrev && swipePrev !== prevState.swipePrev) {
      if (this.animPrev) {
        this.animPrev.restart()
      } else {
        this.animPrev = new TimelineLite({
          pause: true,
          onComplete: () =>
            this.setState(state => ({
              num: state.num > 1 ? state.num - 1 : state.num,
              swipePrev: false,
              direct: null,
            })),
        })
          .set(this.prevPageContainer, { opacity: 1, display: "block" })
          .to(this.prevPageContainer, 0.5, { x: 0 })
          .to(this.prevPageContainer, 0, { opacity: 0, x: "-100%" })
        this.animPrev.restart()
      }
    }
    if (num && num !== prevState.num) {
      this.setState(state => ({
        prev: num - 1,
        next: num + 1,
      }))
    }
  }
  componentWillUnmount() {
    mediaQuery.removeAll()
  }

  swipePage = swipeType => {
    if (swipeType === SWIPE_TYPE.RIGHT) {
      // Swipe to prev page
      this.setState(state => ({
        swipePrev: state.num > 1,
      }))
    } else if (swipeType === SWIPE_TYPE.LEFT) {
      // Swipe to next page
      this.setState(state => ({
        swipeNext: state.num < this.state.pageCount,
      }))
    }
  }
}
