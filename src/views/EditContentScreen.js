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
    TouchableOpacity
} from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import { GetData, ShowToast } from '../services/ApiCaller';
import { LoaderOverlay, ErrorOverlay } from './components/MiscComponents';
import { CreateDealContentForm } from "./components/ContentCreatorForms/CreateDealContentForm";
import { CreateServiceContentForm } from "./components/ContentCreatorForms/CreateServiceContentForm";
import { CreateFarmContentForm } from "./components/ContentCreatorForms/CreateFarmContentForm";
// import ImagePicker from 'react-native-image-crop-picker';
// import Parse from "parse/react-native";
const Globals = require('../services/Globals');

export default class EditContentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            refreshControl: false,
            ajaxCallState: 200,
            ajaxCallError: null,
            contentExists: false,
            item_id: null,
            heading: "",
            article: "",
            measurements: [
                {
                    id: 2,
                    unit_name: "Kilogram",
                    symbol: "Kg"
                },
                {
                    id: 23,
                    unit_name: "Cups",
                    symbol: "Cup"
                }
            ],
            user: {
                account_code: "002",
                avatar:
                    'data:image/jpeg;base64,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',

            }
        };

        this.initializePage = this.initializePage.bind(this);
        this.pickImageFromDeviceStorage = this.pickImageFromDeviceStorage.bind(this);
    }
    /* account codes */
    /* 001 - Buyer account */
    /* 002 - Farmer account */
    /* 003 - serviceProvider account (Vets and extension managers) */
    /* 004 - dealer account (Land sales and machinery dealers) */

    componentDidMount() {
        let contentExists = this.props.navigation.state.params.contentExists || false;
        let item_id = this.props.navigation.state.params.item_id || null;
        this.setState({ item_id: item_id, contentExists: contentExists });
        setTimeout(() => {
            this.initializePage(true);
        }, 3000);
    }

    async initializePage(showLoader) {

    }

    pickImageFromDeviceStorage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            return image;
        });
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={[styles.bgWhite, { flex: 1 }]}>
                    {this.state.fetching ?
                        <LoaderOverlay />
                        :
                        this.state.ajaxCallState == 200 ?
                            <ScrollView>
                                <View style={{ flex: 1 }}>
                                    {this.state.user.account_code == "002" ?
                                        // farmer
                                        <CreateFarmContentForm
                                            user={this.state.user}
                                            unit={this.state.unit}
                                            measurements={this.state.measurements}
                                            foodItemName={this.state.heading}
                                            quantity={this.state.stock}
                                            unit={this.state.unit}
                                            price={this.state.price}
                                            tax={this.state.tax}
                                            description={this.state.description}
                                            setHeading={(value) => { this.setState({ heading: value }) }}
                                            setDescription={(value) => { this.setState({ description: value }) }}
                                            setStock={(value) => { this.setState({ stock: value }) }}
                                            setTax={(value) => { this.setState({ tax: value }) }}
                                            setPrice={(value) => { this.setState({ price: value }) }}
                                            setUnit={(value) => this.setState({ unit: value })}
                                            chooseImage={() => { this.pickImageFromDeviceStorage() }}
                                        />
                                        :
                                        this.state.user.account_code == "003" ?
                                            // service provider
                                            <CreateServiceContentForm
                                                user={this.state.user}
                                            />
                                            :
                                            // dealer
                                            <CreateDealContentForm
                                                user={this.state.user}
                                            />
                                    }
                                </View>
                            </ScrollView>
                            : <ErrorOverlay />
                    }
                </Container>
            </StyleProvider>
        );
    }
}
