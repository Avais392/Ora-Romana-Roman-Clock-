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
} from 'react-native';
import {Svg, Path, Rect, G, Circle, SvgAst} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import data from '../data/data.json';
import AnalogClock1 from '../components/AnalogClock';
var SunCalc = require('suncalc');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

let times = SunCalc.getTimes(new Date(), 41.9028, 12.4964);
Object.keys(times).map(
  (key) => (times[key] = moment(times[key]).format('YYYY-MM-DD HH:mm:ss')),
);

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
    console.log(data['local-times']);
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
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
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
          />
          <Text style={styles.localtime}>
            {this._hourName() + '\n'}
            {'(' + moment().format('HH:MM ') + ' ora locale)'}
            {/* {this._hourName()} */}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

HomeScreen.defaultProps = {};
HomeScreen.navigationOptions = {
  title: '',
  headerStyle: {
    height: 0,
  },
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00f',
  },
  horizontalSeperator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '70%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    top: 50,
    position: 'absolute',
    color: '#fff',
  },
  header: {
    // backgroundColor: theme.colors.white,
    padding: 30,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  localtime: {
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 100,
    position: 'absolute',
    textAlign: 'center',
    color: '#fff',
  },
});

export default HomeScreen;
