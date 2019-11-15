import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { StyleProvider, Container, Text, View, Button, Icon, Spinner } from 'native-base';
import { ImageBackground } from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import { ShowToast } from '../services/ApiCaller';

// import Parse from 'parse/react-native';


export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.checkSession = this.checkSession.bind(this);
    }

    componentDidMount() {
        // let install = new Parse.Installation();
        // install.set("deviceType", navigator.userAgent);

        // install.save().then((resp) => {
        //   console.log('Created install object', resp);

        //   this.setState({
        //     result: 'New object created with objectId: ' + resp.id
        //   })
        // }, err => {
        //   console.log('Error creating install object', err);

        //   this.setState({
        //     result: 'Failed to create new object, with error code: ' + err.message
        //   })
        // })
        // this.setState({ isFetching: true });
        // setTimeout(() => {
        //   this.checkSession();
        // }, 3000)
    }

    //   checkSession() {
    //     try {
    //       Parse.User.currentAsync().then(user => {
    //         if (user !== undefined || user !== null) {
    //           // try to log user in with current token
    //           try {
    //             let sessionToken = user.getSessionToken();
    //             this.setState({ isFetching: true });
    //             Parse.User.become(sessionToken).then(object => {
    //               // if session hasn't expired, grant user access
    //               this.props.navigation.navigate('Home');
    //             }).catch(error => {
    //               // session expired
    //               ShowToast('Session Expired', 'danger');
    //               this.props.navigation.navigate('Login');
    //             });
    //           } catch (error) {
    //             this.setState({ isFetching: false });
    //             this.props.navigation.navigate('Login');
    //           }
    //         } else {
    //           this.setState({ isFetching: false });
    //           this.props.navigation.navigate('Login');
    //         }
    //       })
    //     } catch (error) {
    //       this.setState({ isFetching: false });
    //       this.props.navigation.navigate('Login');
    //     }
    //   }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{ flex: 1 }}>
                    <View>
                        <ImageBackground
                            source={require('../assets/img/tree_hand.jpg')}
                            style={{ width: '100%', height: '100%' }}>
                            <View style={[{ flex: 1 }, styles.maskDarkSlight]}>
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            paddingVertical: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                    ]}>
                                    <View style={{ alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: 100, backgroundColor: "#FFF" }}>
                                        <Icon name={"ios-leaf"} style={styles.greenText} />
                                    </View>
                                    <Text style={[styles.introHeader, styles.centerText]}>Farmers&apos;{'\n'}Market Place</Text>
                                    <Text note style={{ color: '#FFF' }}>Taking you to your clients&apos; doorstep</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        justifyContent: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 40,
                                    }}>
                                    {this.state.isFetching ? <Spinner size={20} color={"white"} />
                                        :
                                        <Button
                                            iconRight
                                            block
                                            rounded
                                            light
                                            onPress={() => {
                                                navigate('Login');
                                            }}>
                                            <Text>Continue</Text>
                                            <Icon name="ios-arrow-forward" />
                                        </Button>
                                    }
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}
