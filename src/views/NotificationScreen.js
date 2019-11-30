import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import {
    StyleProvider,
    Container,
    Text,
    View,
    Button,
    Icon,
    Form,
    Item,
    Label,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Left,
    Right,
    Thumbnail,
    Body,
    H3,
    Badge,
    Header,
    Spinner,
    Textinput,
    Content,
} from 'native-base';
import {
    ImageBackground,
    Image,
    ScrollView,
    AsyncStorage,
    RefreshControl,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import { GetData, ShowToast } from '../services/ApiCaller';
import { LoaderOverlay, ErrorOverlay, PostListItem, FarmerCatalogItemList } from './components/MiscComponents';
// import ImagePicker from 'react-native-image-crop-picker';
// import Parse from "parse/react-native";
const Globals = require('../services/Globals');

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            refreshControl: false,
            ajaxCallState: 200,
            ajaxCallError: null,
            notifications: [
                {
                    id: 23,
                    title: "Credit Alert",
                    description: "You successfully funded your account with the sum of NGN2,000.00",
                    createdAt: "Tue 20 Nov, 2019 12:02:34",
                    isClickable: true,
                    type: 1, // this is used to identify the type of notif and also know how to handle it
                    target_id: Globals.ACCOUNT_TYPES.FARMER, // this is used to track the order which prompted the notification
                }
            ],
        }
        this.initializePage = this.initializePage.bind(this);
        this.openNotifTarget = this.openNotifTarget.bind(this);
    }

    componentDidMount() {
    }

    initializePage() {
        this.setState({ fetching: false, ajaxCallState: 200, ajaxCallError: Globals.ERRORS.CONNECTION });
    }

    openNotifTarget(item) {
        const { navigate } = this.props.navigation;
        switch (item.target_id) {
            case Globals.ACCOUNT_TYPES.FARMER: // notif was intended for an order placed for a farm produce, navigate to farmOrderProcessPage
                navigate("FarmOrder", {
                    order_id: item.target_id
                });
                break;

            default:
                alert("unknown")
                break;
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={[styles.bgWhite, { flex: 1 }]}>
                    {this.state.fetching ?
                        <LoaderOverlay />
                        :
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshControl}
                                    onRefresh={() => this.initializePage(false)}
                                />
                            }>
                            {this.state.ajaxCallState == 200 ?
                                this.state.notifications.length == 0 ?
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            paddingTop: 100,
                                            paddingHorizontal: 10,
                                        }}>
                                        <Icon
                                            type={'FontAwesome'}
                                            name="info-circle"
                                            style={[styles.greyText, { fontSize: 100 }]}
                                        />
                                        <Text
                                            style={[
                                                styles.greyText,
                                                { textAlign: 'center', fontSize: 20 },
                                            ]}>There are no notifications for you at the moment</Text>
                                    </View>
                                    :
                                    <List>
                                        {this.state.notifications.map(item => (
                                            <ListItem
                                                onPress={() => { if (item.isClickable) this.openNotifTarget(item) }}
                                                key={item.id}>
                                                <Body>
                                                    <Text>{item.title}</Text>
                                                    <Text note numberOfLines={3}>{item.description}</Text>
                                                    <Text note numberOfLines={1}>
                                                        {item.createdAt.substring(0, 25)}
                                                    </Text>
                                                </Body>
                                                {item.isClickable ?
                                                    <Right>
                                                        <Icon name={"ios-arrow-forward"} />
                                                    </Right>
                                                    : null}
                                            </ListItem>
                                        ))}
                                    </List>
                                :
                                <ErrorOverlay
                                    title={"Notification"}
                                    errorMessage={this.state.ajaxCallError}
                                    action={() => this.initializePage(true)} />
                            }
                        </ScrollView>
                    }
                </Container>
            </StyleProvider>
        )
    }
}