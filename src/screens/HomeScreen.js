import React, {Component} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Svg, Path, Rect, G, Circle, SvgAst} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {Scene, Router, Actions} from 'react-native-router-flux';

import moment from 'moment';
import data from '../data/data.json';
import AnalogClock1 from '../components/AnalogClock';
var SunCalc = require('suncalc');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

let times = SunCalc.getTimes(new Date(), 31.5204, 74.3587 );
Object.keys(times).map(
  (key) => (times[key] = moment(times[key]).format('YYYY-MM-DD HH:mm:ss')),
);
console.log('mappedTimes',times)
const {width, height} = Dimensions.get('window');

var categories = Array(6).fill(false);

class HomeScreen extends Component {
  scrollX = new Animated.Value(0);
  
  constructor(props) {
   
    super(props);
    this.state = {
      status: '',
      categories: [],
      rotation: new Animated.Value(0),
      offset: 0,
    };
  }
  _hourName = () => {
    const curr_time = moment().format('HH:MM').split(':');
    let index = parseInt(curr_time[0]) * 4;
    if (parseInt(curr_time[1] < 15)) {
      index = index + 0;
    } else if (parseInt(curr_time[1] < 30)) {
      index = index + 1;
    } else if (parseInt(curr_time[1] < 45)) {
      index = index + 2;
    } else if (parseInt(curr_time[1] < 60)) {
      index = index + 3;
    }
    return data['local-times'][index].Name;
  };
  _backgroundColor = () => {
    switch (this.state.status) {
      case 'sunrise-to-afternoon':
        return '#ADD8E6';
      case 'afternoon-to-sunset':
        return '#1167b1';
      case 'sunset-to-midnight':
        return '#FFC0CB';
      case 'midnight-to-sunrise':
        return '#0000ff';
    }
  };
  componentDidMount() {
    // console.log(data['local-times']);
    Animated.loop(
      Animated.timing(this.state.rotation, {
        useNativeDriver: true,
        duration: 10000,
        toValue: 1,
      }),
    ).start();
  }

  onLayout =
    Platform.OS === 'android'
      ? (a) => {
          this.setState({offset: a.nativeEvent.layout.width / 2});
        }
      : null;

  render() {
    const offsetAndroid = this.state.offset;
    const [pivotX, pivotY] = [25, 25];
    return (
      <ScrollView style={{ backgroundColor: '#fff', }}>
        <View
          style={{
            ...styles.container,
            backgroundColor: this._backgroundColor(),
          }}>
          <Text style={styles.heading}>Ora Romana</Text>
          <AnalogClock1
            minuteHandLength={110}
            times={times}
            statusCallback={(status) => this.setState({status})}
            timeLabelCallback={(timeLabel) => this.setState({timeLabel})}
          />
          <Text style={styles.localtime}>
            {(this.state.timeLabel || '') + '\n\n'}
            {'(' + moment().format('hh:mm') + ' ora italiana)'}
            {/* {console.log(moment())} */}
            {/* {this._hourName()}  */}
            
          </Text>
          <Button title='ABOUT US' style={{}} onPress={()=>Actions.push('About')}></Button>
        </View>
      
      </ScrollView>
    );
  }
}

HomeScreen.defaultProps = {};
HomeScreen.navigationOptions = {
  title: '',
  
 
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex:1,
    height: height,
   
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#00f',
  },
 

  heading: {
    fontFamily:'Trajan-Bold',
    fontSize: 30,
    
    
    // top: 50,
    // position: 'absolute',
    // marginTop:10,
    color: '#fff',
  },
 
  localtime: {
    // fontFamily: 'Trajan',
    fontSize: 25,
    // fontWeight: 'bold',
    // bottom: 100,
    // position: 'absolute',
    textAlign: 'center',
    color: '#fff',
    padding: 10,
  },
});

export default HomeScreen;
