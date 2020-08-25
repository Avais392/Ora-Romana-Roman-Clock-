import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import data from '../data/data';

let custonOffset = 360 / 60;
let ClockFrame = '../assets/Clock.png';
export default class AnalogClock extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.timeFunction();
    this.state = {
      dottedClock: false,
      offset: 0,
      counter: 1,
      timeSpan: 0,
      timePassedInSeconds: 0,
      //   sec: d.getSeconds() * 6,
      //   min: d.getMinutes() * 6 + (d.getSeconds() * 6) / 60,
      hour: 90,
    };
  }

  getTimeDifferenceInSeconds(time1, time2) {
    let difference = time1[0] - time2[0];
    difference = difference * 60 + (time1[1] - time2[1]);
    difference = difference * 60;
    return difference;
  }
  timeFunction() {
    let timeSpan = 0;
    let d = new Date();
    const {times} = this.props;
    // console.log('timesFunc', times);
    let currentTime = [d.getHours(), d.getMinutes()];
    let sunrise = times.dawn.split(' ')[1];
    console.log('timesFunc', times);
    sunrise = sunrise.split(':').map((x) => parseInt(x));
    let afternoon = times.solarNoon.split(' ')[1];
    afternoon = afternoon.split(':').map((x) => parseInt(x));
    let sunset = times.sunset.split(' ')[1];
    sunset = sunset.split(':').map((x) => parseInt(x));
    let midnight = times.nadir.split(' ')[1];
    midnight = midnight.split(':').map((x) => parseInt(x));

    let timePassedInSeconds = 0;
    if (
      this.getTimeDifferenceInSeconds(currentTime, sunrise) >= 0 &&
      this.getTimeDifferenceInSeconds(afternoon, currentTime) >= 0
    ) {
      timeSpan = this.getTimeDifferenceInSeconds(afternoon, sunrise);
      timePassedInSeconds = this.getTimeDifferenceInSeconds(
        currentTime,
        sunrise,
      );
      this.setState({
        timeSpan,
        timePassedInSeconds,
        offset: 360 / timeSpan,
        dottedClock: false,
      });

      this.props.statusCallback('sunrise-to-afternoon');
      this.ClockFrame = '../assets/Clock.png';
    } else if (
      this.getTimeDifferenceInSeconds(currentTime, afternoon) >= 0 &&
      this.getTimeDifferenceInSeconds(sunset, currentTime) >= 0
    ) {
      timeSpan = this.getTimeDifferenceInSeconds(sunset, afternoon);
      timePassedInSeconds = this.getTimeDifferenceInSeconds(
        currentTime,
        afternoon,
      );
      this.setState({
        timeSpan,
        timePassedInSeconds,
        offset: 360 / timeSpan,
        dottedClock: true,
      });
      this.props.statusCallback('afternoon-to-sunset');
      this.ClockFrame = '../assets/DottedClock.png';
    } else if (
      this.getTimeDifferenceInSeconds(currentTime, sunset) >= 0 &&
      this.getTimeDifferenceInSeconds(midnight, currentTime) >= 0
    ) {
      timeSpan = this.getTimeDifferenceInSeconds(midnight, sunset);
      timePassedInSeconds = this.getTimeDifferenceInSeconds(
        currentTime,
        sunset,
      );
      this.setState({
        timeSpan,
        timePassedInSeconds,
        offset: 360 / timeSpan,
        dottedClock: true,
      });
      this.props.statusCallback('sunset-to-midnight');
      this.ClockFrame = '../assets/DottedClock.png';
    } else {
      // midnight to 24:00 PLUS 00:00 to sunrise
      timeSpan = this.getTimeDifferenceInSeconds([24, 0], midnight);
      timeSpan = timeSpan + this.getTimeDifferenceInSeconds(sunrise, [0, 0]);
      if (currentTime[0] < 24) {
        timePassedInSeconds = this.getTimeDifferenceInSeconds(
          currentTime,
          midnight,
        );
      } else {
        timePassedInSeconds = this.getTimeDifferenceInSeconds(
          [24, 0],
          midnight,
        );
        timePassedInSeconds =
          timePassedInSeconds +
          this.getTimeDifferenceInSeconds(currentTime, [0, 0]);
      }
      this.setState({
        timeSpan,
        timePassedInSeconds,
        offset: 360 / timeSpan,
        dottedClock: false,
      });
      this.props.statusCallback('midnight-to-sunrise');
      this.ClockFrame = '../assets/Clock.png';
    }
    this.setState({counter: timePassedInSeconds, quarterTime: timeSpan / 24});
    const quarterIndex =
      this.state.timePassedInSeconds / this.state.quarterTime;
      
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      let d = new Date();

      console.log(this.state);
      this.timeFunction();
      this.setState({hour: this.state.offset * this.state.counter + 90});
      this.setState({counter: (this.state.counter + 1) % this.state.timeSpan});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  clockFrame() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'relative',
      borderColor: 'black',
      borderWidth: this.props.clockBorderWidth,
      borderRadius: this.props.clockSize / 2,
    };
  }

  clockHolder() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'absolute',
      right: -this.props.clockBorderWidth,
      bottom: -this.props.clockBorderWidth,
    };
  }

  clockFace() {
    return {
      width: this.props.clockCentreSize,
      height: this.props.clockCentreSize,
      backgroundColor: this.props.clockCentreColor,
      borderRadius: this.props.clockCentreSize / 2,
      top: (this.props.clockSize - this.props.clockCentreSize) / 2,
      left: (this.props.clockSize - this.props.clockCentreSize) / 2,
    };
  }

  hourHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.hourHandColor,
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginVertical: -this.props.hourHandWidth,
      marginLeft: -this.props.hourHandLength / 2,
      paddingVertical: this.props.hourHandWidth,
      paddingLeft: this.props.hourHandLength,
      borderTopLeftRadius: this.props.hourHandCurved
        ? this.props.hourHandWidth
        : 0,
      borderBottomLeftRadius: this.props.hourHandCurved
        ? this.props.hourHandWidth
        : 0,
    };
  }
  getTransform = () => {
    let transform = {
      transform: [{perspective: 400}, {rotateX: 2}],
    };
    return withAnchorPoint(
      transform,
      {x: 0.5, y: 0},
      {width: 400, height: 400},
    );
  };

  render() {
    return (
      <View
      // style={this.clockFrame()}
      >
        {/* Uncomment for background image */}
        <Image
          style={{
            width: this.props.clockSize - this.props.clockBorderWidth * 2,
            height: this.props.clockSize - this.props.clockBorderWidth * 2,

            // backgroundColor:'#000'
          }}
          resizeMode="cover"
          source={
            this.state.dottedClock
              ? require('../assets/DottedClock.png')
              : require('../assets/Clock.png')
          }
        />

        <View style={this.clockHolder()}>
          <View
            style={[
              this.hourHandStyles(),
              {
                transform: [
                  {rotate: this.state.hour + 'deg'},
                  {
                    translateX: -(
                      this.props.hourHandOffset +
                      this.props.hourHandLength / 2
                    ),
                  },
                ],
              },
            ]}>
            {/* <Image
              style={{
                position: 'absolute',
                backgroundColor: this.props.hourHandColor,
                // top: this.props.clockSize / 2,
                // left: this.props.clockSize / 2,
                marginVertical: -this.props.hourHandWidth,
                marginRight: -this.props.hourHandLength / 2,
                marginTop: -this.props.hourHandLength / 2,
                paddingVertical: this.props.hourHandWidth,
                paddingLeft: this.props.hourHandLength,
                // borderTopLeftRadius: this.props.hourHandCurved
                //   ? this.props.hourHandWidth
                //   : 0,
                // borderBottomLeftRadius: this.props.hourHandCurved
                //   ? this.props.hourHandWidth
                //   : 0,
                transform: [{rotate: -90 + 'deg'}],
                // width: (this.props.clockSize - this.props.clockBorderWidth * 2)/2,
                height: this.props.hourHandLength,
              }}
              resizeMode="cover"
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4lc2DeYJI1q_lPEfr-gJGeoz7xLMKCiyrsQ&usqp=CAU',
              }}
            /> */}
          </View>

          <View style={this.clockFace()} />
        </View>
      </View>
    );
  }
}

AnalogClock.defaultProps = {
  backgroundImage: './img/clockBack.png',
  clockSize: 270,
  clockBorderWidth: 7,
  clockCentreSize: 15,
  clockCentreColor: 'black',
  hourHandColor: 'black',
  hourHandCurved: true,
  hourHandLength: 70,
  hourHandWidth: 5.5,
  hourHandOffset: 0,
  minuteHandColor: 'black',
  minuteHandCurved: true,
  minuteHandLength: 100,
  minuteHandWidth: 5,
  minuteHandOffset: 0,
  secondHandColor: 'black',
  secondHandCurved: false,
  secondHandLength: 120,
  secondHandWidth: 2,
  secondHandOffset: 100,
};
