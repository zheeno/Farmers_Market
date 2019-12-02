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


export const CreateFarmContentForm = props => {
    const user = props.user;
    return (
        <View style={[FormStyles.bgWhite]}>
            <View style={{ flex: 1, backgroundColor: "#eee" }}>
                <Thumbnail
                    large
                    square
                    style={FormStyles.thumbnailLarge}
                    source={{ uri: user.avatar }}
                />
                <Button onPress={props.chooseImage} icon style={[styles.bgLeafGreen, FormStyles.FAB]}><Icon name={"ios-image"} /></Button>
            </View>
            <View style={{ flex: 1 }}>
                <Content padder>
                    <Form>
                        <Label style={{ marginTop: 10, marginBottom: 5 }}>Food Item Name</Label>
                        <Item rounded style={styles.bgGrey}>
                            <Input
                                defaultValue={props.foodItemName}
                                onChangeText={(text) => {
                                    props.setHeading(text)
                                }} />
                        </Item>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <Label style={{ marginTop: 10, marginBottom: 5 }}>Quantity</Label>
                                <Item rounded style={styles.bgGrey}>
                                    <Input
                                        keyboardType="numeric"
                                        defaultValue={props.quantity}
                                        onChangeText={(text) => {
                                            props.setStock(text)
                                        }} />
                                </Item>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <Label style={{ marginTop: 10, marginBottom: 5 }}>Unit Measurement</Label>
                                <Item picker rounded
                                    style={[styles.bgGrey, { height: 52 }]}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: undefined, }}
                                        placeholder="Select Unit"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={props.unit}
                                        onValueChange={props.setUnit}
                                    >
                                        {props.measurements.map(measurement => (
                                            <Picker.Item key={measurement.id} label={measurement.unit_name + " (" + measurement.symbol + ")"} value={measurement.id} />
                                        ))}
                                    </Picker>
                                </Item>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <Label style={{ marginTop: 10, marginBottom: 5 }}>Price (&#8358;)</Label>
                                <Item rounded style={styles.bgGrey}>
                                    <Input
                                        keyboardType="decimal-pad"
                                        defaultValue={props.price}
                                        onChangeText={(text) => {
                                            props.setPrice(text)
                                        }} />
                                </Item>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <Label style={{ marginTop: 10, marginBottom: 5 }}>Tax (%)</Label>
                                <Item rounded style={styles.bgGrey}>
                                    <Input
                                        keyboardType="decimal-pad"
                                        defaultValue={props.tax}
                                        onChangeText={(text) => {
                                            props.setTax(text)
                                        }} />
                                </Item>
                            </View>
                        </View>
                        <View style={{ borderBottonWidth: 1, borderBottomColor: "#777" }}>
                            <Text style={{ marginLeft: 5, marginTop: 15, fontSize: 18, }}>Description</Text>
                            <Textarea rowSpan={5}
                                placeholder="Write a brief description about the item"
                                style={{ paddingHorizontal: 10 }}
                                onChangeText={(text) => {
                                    props.setDescription(text)
                                }}
                            >{props.description}</Textarea>
                        </View>
                        <Button block iconRight rounded
                            onPress={props.createItem}
                            style={[styles.bgLeafGreen, { height: 52, marginHorizontal: 30 }]}>
                            <Text>Create Content</Text>
                            {props.isAdding ?
                                <Spinner color={"#FFF"} size={20} /> :
                                <Icon name={"ios-add-circle"} />
                            }
                        </Button>
                    </Form>
                </Content>
            </View>
        </View >)
};