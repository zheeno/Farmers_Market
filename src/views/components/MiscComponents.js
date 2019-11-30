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

import { styles } from '../../../native-base-theme/variables/Styles';

export const CreateDealContentForm = props => {
  const user = props.user;
  return (<View style={[styles.bgWhite]}>
    <View style={{ flex: 1, }}>
      <Thumbnail
        large
        square
        style={{ height: 300, width: "100%" }}
        source={{ uri: user.avatar }}
      />
      <Button onPress={props.chooseImage} icon style={[styles.bgLeafGreen, { borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center", alignSelf: "flex-end", marginTop: -60, marginRight: 20 }]}><Icon name={"ios-image"} /></Button>
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

export const CreateServiceContentForm = props => {
  const user = props.user;
  return (
    <View style={[styles.bgWhite]}>
      <View style={{ flex: 1, }}>
        <Thumbnail
          large
          square
          style={{ height: 300, width: "100%" }}
          source={{ uri: user.avatar }}
        />
        <Button onPress={props.chooseImage} icon style={[styles.bgLeafGreen, { borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center", alignSelf: "flex-end", marginTop: -60, marginRight: 20 }]}><Icon name={"ios-image"} /></Button>
      </View>
      <View style={{ flex: 1 }}>
        <Content padder>
          <Form>
            <Label style={{ marginTop: 10, marginBottom: 5 }}>Heading</Label>
            <Item rounded style={styles.bgGrey}>
              <Input defaultValue={props.heading}
                onChangeText={(text) => {
                  props.setHeading(text)
                }} />
            </Item>
            <View style={{ borderBottonWidth: 1, borderBottomColor: "#777" }}>
              <Text style={{ marginLeft: 8, marginTop: 15, fontSize: 18, }}>Article</Text>
              <Textarea onChangeText={(text) => {
                props.setDescription(text)
              }} rowSpan={8} placeholder="Write a brief article" style={{ paddingHorizontal: 10 }}>{props.description}</Textarea>
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
    </View>
  )
}

export const CreateFarmContentForm = props => {
  const user = props.user;
  return (
    <View style={[styles.bgWhite]}>
      <View style={{ flex: 1, backgroundColor: "#eee" }}>
        <Thumbnail
          large
          square
          style={{ height: 300, width: "100%" }}
          source={{ uri: user.avatar }}
        />
        <Button onPress={props.chooseImage} icon style={[styles.bgLeafGreen, { borderRadius: 50, width: 50, height: 50, alignItems: "center", justifyContent: "center", alignSelf: "flex-end", marginTop: -60, marginRight: 20 }]}><Icon name={"ios-image"} /></Button>
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

export const FarmerCatalogItemList = props => {
  const navigate = props.navigate;
  return (
    <FlatList
      data={props.foodItems}
      numColumns={2}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshControl}
          onRefresh={props.onRefresh}
        />
      }
      renderItem={({ item, index }) => (
        <View style={[
          { margin: 2, flex: 1, borderRadius: 10 },
        ]}>
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigate('EditContent', {
                contentExists: true,
                headerTitle: item.item_name,
                item_id: item.id,
              })
            }
          >
            <ImageBackground
              source={require('../../assets/img/white_onion_leaf.jpg')}
              style={[{
                width: '100%',
                height: 100,
                overflow: 'hidden',
              }, Platform.OS == "ios" ? { borderRadius: 10 } : null]}>
              <View
                style={[
                  {
                    fex: 1,
                    justifyContent: 'flex-end',
                    height: '100%',
                    paddingHorizontal: 5,
                    paddingBottom: 10,
                  },
                  styles.maskDarkSlight,
                ]}>
                <Text
                  numberOfLines={2}
                  style={[styles.whiteText, { fontSize: 16 }]}>
                  {item.item_name}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

export const PostListItem = props => {
  const post = props.thisPost;
  const author = post.get("user_pointer");
  var currentUser = Parse.User.current();
  // using useState to manage like state
  const [userLikedPost, setLikeState] = useState(false);

  const init = async () => {
    // get author
    await author.fetch();
    // check if the user has liked a postvar currentUser = Parse.User.current();
    if (currentUser) {
      const Likes = Parse.Object.extend("Likes");
      const likeChecker = new Parse.Query(Likes);
      likeChecker.equalTo("post_id", post.id);
      likeChecker.equalTo("liked_by_user_id", currentUser.id);
      likeChecker.limit(1);
      const result = await likeChecker.find().then((res) => {
        if (res.length > 0) {
          setLikeState(true);
        }
      })
    }
  }; init();

  return (
    <View key={post.id} style={{ marginVertical: 5, borderBottomWidth: 0.4, borderBottomColor: "#d7d7d7", paddingBottom: 10 }}>
      <View style={{ flexDirection: "row", }}>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 5 }}>
          <TouchableOpacity onPress={() => props.navToUserProfile(author.id, author.get("username"))} >
            <Thumbnail
              circular
              style={{ marginLeft: 10 }}
              source={{ uri: author.get("avatar_url") }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18 }}>{post.get("header")}</Text>
          <Text note>{"@" + author.get("username")}</Text>
          <Text>{post.get("body")}</Text>
          {/* check if post has image */}
          {post.photo_uri != null ?
            <Image source={require('../../assets/img/liquid_circle_loader.gif')} style={{ width: "100%", borderRadius: 10, marginVertical: 2 }} />
            : null}
          {/* <Text note style={{ alignSelf: "flex-end", }}>{post.createdAt}</Text> */}
        </View>
      </View>
      {/* buttons */}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        {/* like */}
        <TouchableOpacity onPress={() => {
          // props.likePost(post, userLiked);
          props.likePost(post, userLikedPost, (like) => {
            setLikeState(like);
          })
        }}
          style={{ flex: 1, flexDirection: "row", paddingVertical: 1, alignItems: "center", justifyContent: "center" }} >
          <Icon name={userLikedPost ? "ios-heart" : "ios-heart-empty"} style={[userLikedPost ? { color: "#b80514" } : { color: "#777" }, { fontSize: 20 }]} />
          <Text note style={{ marginLeft: 5, color: "#777" }}>{post.likes}</Text>
        </TouchableOpacity>
        {/* comments */}
        <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingVertical: 1, alignItems: "center", justifyContent: "center" }} >
          <Icon name={"ios-chatbubbles"} style={{ fontSize: 20, color: "#777" }} />
          <Text note style={{ marginLeft: 5, color: "#777" }}>{post.comments}</Text>
        </TouchableOpacity>
        {/* more options */}
        <TouchableOpacity style={{ flex: 1, flexDirection: "row", paddingVertical: 1, alignItems: "center", justifyContent: "center" }} >
          <Icon name={"ios-more"} style={{ fontSize: 20, color: "#777" }} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export const CusListItem = props => {
  return (
    <ListItem icon onPress={props.action} disabled={props.disabled}>
      {props.hasIcon ?
        <Left>
          <Button style={{ backgroundColor: props.iconBgColor }}>
            <Icon active name={props.iconName} />
          </Button>
        </Left>
        : null}
      <Body>
        <Text>{props.text}</Text>
      </Body>

      <Right>
        <Icon active name="ios-arrow-forward" />
      </Right>
    </ListItem>
  );
}

export const LoaderOverlay = props => {
  return (
    <View
      style={[
        {
          zIndex: 20,
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignContent: 'center',
          aliginSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.80)',
        },
      ]}>
      {/* <Image source={require('../../assets/img/liquid_circle_loader.gif')} /> */}
      <View
        style={{
          backgroundColor: 'transparent',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Spinner color={styles.greenText.color} />
            <Text style={[styles.greenText, { marginLeft: 5, fontSize: 16 }]}>
              {props.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const MiscModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={props.togModal}
      transparent={props.transparent}
      style={props.style}>
      {props.hasHeader ? (
        <View transparent style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Button onPress={props.togModal} icon transparent>
              <Icon style={{ color: '#333' }} name="md-arrow-back" />
            </Button>
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
            <H3 style={{ color: '#333' }}>{props.title}</H3>
          </View>
        </View>
      ) : null}
      <View style={{ flex: 1 }}>{props.children}</View>
    </Modal>
  );
};

export const ErrorOverlay = props => {
  return (
    <View
      style={[
        {
          flex: 1,
          zIndex: 20,
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.80)',
        },
      ]}>
      <View
        style={{
          backgroundColor: 'transparent',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={[{ justifyContent: "center" }]}>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 5, borderRadius: 20, padding: 20, alignItems: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#f7f7f7", height: 60, width: 60, borderRadius: 100, marginTop: -50 }}>
              <Icon name={"ios-information-circle-outline"} style={styles.greenText} />
            </View>
            <View style={{ marginVertical: 0, minHeight: 100 }}>
              <H3 style={[styles.greenText, { alignSelf: "center", marginTop: 10 }]}>{props.title}</H3>
              <Text style={[styles.greenText, { fontSize: 16, alignSelf: "center", textAlign: "center" }]}>{props.errorMessage}</Text>
              {props.action != null ?
                <View>{}
                  <Button
                    onPress={props.action}
                    iconLeft rounded
                    style={[styles.bgLeafGreen, { alignSelf: "center", marginVertical: 10 }]}>
                    <Icon name={"ios-refresh"} />
                    <Text>Refresh</Text>
                  </Button></View>
                : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
