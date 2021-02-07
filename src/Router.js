import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

import HomeScreen from './screens/HomeScreen.js';
import AboutUsScreen from './screens/AboutUs'

// const InboxIcon = () => {
//   return (
//     <View style={{marginRight: 10}}>
//       <TouchableOpacity onPress={() => Actions.employeeCreate()}>
//         <Icon name="list" type="font-awesome" color="#f50" size={28} />
//       </TouchableOpacity>
//     </View>
//   );
// };

import {Icon} from 'react-native-elements';
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" headerMode="none" >
        {/* <Scene
          // icon={<Icon name="list" type="font-awesome" color="#f50" size={15} />}
          renderRightButton={InboxIcon}
          // onRight={() => {
          //   Actions.employeeCreate();
          // }}
          // navBar={}
          navBar={navbar}
          key="home"
          component={ArticleScreen}
          renderTitle={() => <AppLogo style={{alignSelf: 'center', flex: 1}} />}
          titleStyle={{textAlign: 'center', flex: 1}}
        /> */}

        <Scene initial={true} key="Home" component={HomeScreen} />
        <Scene  key="About" component={AboutUsScreen} />
      </Scene>
    </Router>
  );
};
export default RouterComponent;
