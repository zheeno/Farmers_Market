import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    RefreshControl,
    ImageBackground
} from 'react-native';
import {
    Text,
    View,
    Item,
    Form,
    Icon,
    Button,
    Input,
    Left,
    Right,
    Body,
    Container,
    Spinner,
    Row,
    List,
    Card,
    CardItem,
    H2,
    Header,
    Badge,
    H1,
    H3,
    Radio,
    Footer,
    Label,
    ListItem,
    Thumbnail,
    Textarea,
    Content,
    Picker,
} from 'native-base';
import Parse from 'parse/react-native';
import { styles } from '../../../../native-base-theme/variables/Styles';
import { StyleSheet, Dimensions } from 'react-native';

const FormStyles = StyleSheet.create({
    bgWhite: { backgroundColor: "#FFF" },

    thumbnailLarge: { height: 300, width: "100%" },

    bgLeafGreen: {
        backgroundColor: 'rgb(14, 46, 47)',
    },

    FAB: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: -60,
        marginRight: 20
    },
});

export const CreateDealContentForm = props => {
    const user = props.user;
    return (<View style={[FormStyles.bgWhite]}>
        <View style={{ flex: 1, }}>
            <Thumbnail
                large
                square
                style={FormStyles.thumbnailLarge}
                source={{ uri: user.avatar }}
            />
            <Button onPress={props.chooseImage} icon style={[FormStyles.bgLeafGreen, FormStyles.FAB]}><Icon name={"ios-image"} /></Button>
        </View>
        <View style={{ flex: 1 }}>
            <Content padder>
                <Form>
                    <Label style={{ marginTop: 10, marginBottom: 5 }}>Product Name</Label>
                    <Item rounded style={styles.bgGrey}>
                        <Input defaultValue={props.heading}
                            onChangeText={(text) => {
                                props.setHeading(text)
                            }} />
                    </Item>
                    <Label style={{ marginTop: 10, marginBottom: 5 }}>Asking Price (&#8358;)</Label>
                    <Item rounded style={styles.bgGrey}>
                        <Input defaultValue={props.price}
                            onChangeText={(text) => {
                                props.setPrice(text)
                            }} />
                    </Item>
                    <View style={{ borderBottonWidth: 1, borderBottomColor: "#777" }}>
                        <Text style={{ marginLeft: 8, marginTop: 15, fontSize: 18, }}>Description</Text>
                        <Textarea
                            rowSpan={5}
                            onChangeText={(text) => {
                                props.setDescription(text)
                            }}
                            placeholder="Write a compeling description of the product you're offering"
                            style={{ paddingHorizontal: 10 }} >{props.description}</Textarea>
                    </View>
                    <Button block iconRight rounded
                        disabled={props.isAdding || props.heading.trim().length == 0 && props.price.trim().length == 0 && props.description.trim().length == 0}
                        onPress={props.createItem}
                        style={[
                            props.heading != "" && props.price != "" && props.description != "" ?
                                styles.bgLeafGreen : styles.bgGrey,
                            { height: 52, marginHorizontal: 30 }]}
                    >
                        <Text>Create Content</Text>
                        {props.isAdding ?
                            <Spinner color={"#FFF"} size={20} /> :
                            <Icon name={"ios-add-circle"} />
                        }
                    </Button>
                </Form>
            </Content>
        </View>
    </View>);
}
