
import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Root, Button, Icon, View, Text, Thumbnail } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './native-base-theme/variables/Styles';
import SplashScreen from './src/views/SplashScreen';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import CreateContentScreen from './src/views/CreateContentScreen';

//  import Parse from 'parse/react-native';
//  const Globals = require('./src/services/Globals');

//  Parse.setAsyncStorage(AsyncStorage);
//  Parse.initialize(Globals.APPLICATION_KEY, Globals.JAVASCRIPT_KEY);
//  Parse.serverURL = Globals.SERVER_URL;

// IntroStack
const IntroStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: {
      headerTintColor: '#010103',
      headerStyle: {
        backgroundColor: styles.bgLeafGreen.backgroundColor,
      },
      headerTintColor: '#fff',
      boxShadow: 'none',
    },
  },
);

// HomeStack
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft:
          <Thumbnail
            circular
            small
            style={{ marginLeft: 10 }}
            source={require("./src/assets/img/white_onion_leaf.jpg")}
          />,
        headerTitle: "Home",
        headerRight:
          <Button
            style={[styles.bgLeafGreen]}
            small
            icon
            onPress={navigation.getParam('checkout')}>
            <Icon name={"ios-more"} />
          </Button>,
        headerStyle: {
          backgroundColor: styles.bgLeafGreen.backgroundColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    },
  },
  //    Category: {
  //      screen: CategoryScreen,
  //      navigationOptions: () => {
  //        return {
  //          header: null,
  //        };
  //      },
  //    },
  //    Farms: {
  //      screen: FarmsScreen,
  //      navigationOptions: () => {
  //        return {
  //          header: null,
  //        };
  //      },
  //    },
},
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: '#010103',
      headerStyle: {
        backgroundColor: styles.bgLeafGreen.backgroundColor,
      },
      headerTintColor: '#fff',
      boxShadow: 'none',
    },
  });

//  // CartStack
//  const CartStack = createStackNavigator({
//    Cart: {
//      screen: CartScreen,
//      navigationOptions: ({ navigation }) => {
//        return {
//          headerLeft:
//            <Button
//              style={[styles.bgLeafGreen]}
//              small
//              onPress={navigation.getParam('goHome')}>
//              <Icon name={"ios-arrow-back"} />
//            </Button>,
//          headerTitle: "Cart",
//          headerRight:
//            <Button
//              style={[styles.bgLeafGreen]}
//              small
//              icon
//              onPress={navigation.getParam('checkout')}>
//              <Icon name={"ios-checkmark-circle-outline"} />
//            </Button>,
//          headerStyle: {
//            backgroundColor: styles.bgLeafGreen.backgroundColor,
//          },
//          headerTintColor: '#fff',
//          headerTitleStyle: {
//            fontWeight: 'bold',
//          },
//        };
//      },
//    },
//  });

// NewContentStack
const NewContentStack = createStackNavigator({
  CreateContent: {
    screen: CreateContentScreen,
    navigationOptions: () => {
      return {
        headerTitle: "New Content",
        headerStyle: {
          backgroundColor: styles.bgLeafGreen.backgroundColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    },
  },
});

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabNavs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={'ios-paper'} size={25} color={tintColor} />
        ),
      },
    },
    NewContent: {
      screen: NewContentStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={'ios-add-circle'} size={40} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: NewContentStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={'ios-person'} size={25} color={tintColor} />
        ),
        tabBarVisible: false,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: styles.greenText.color,
      inactiveTintColor: '#9e9e9e',
      indicatorStyle: {
        backgroundColor: 'yellow',
      },
      style: Platform.OS === "ios" ? null : {
        backgroundColor: '#fff',
        position: 'absolute',
        left: 50,
        right: 50,
        bottom: 20,
        borderRadius: 100,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingBottom: 0,
      },
      showLabel: false,
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);

const AllStacks = createStackNavigator({
  // this holds all the stacks
  Intro: {
    screen: IntroStack,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
  MainApp: {
    screen: TabNavs,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
});

export default class App extends Component {
  _loadResourcesAsync = async () => {
    return Promise.all([

    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    return (
      <Root>
        <AllStacks />
      </Root>
    );
  }
}

