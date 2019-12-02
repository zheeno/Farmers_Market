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
import { styles } from './PostStyles';



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
    };
    init();

    return (
        <View key={post.id} style={styles.container}>
            <View style={styles.flex_row}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={() => props.navToUserProfile(author.id, author.get("username"))} >
                        <Thumbnail
                            circular
                            style={styles.m_l_10}
                            source={{ uri: author.get("avatar_url") }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 18 }}>{post.get("header")}</Text>
                    <Text note>{"@" + author.get("username")}</Text>
                    <Text>{post.get("body")}</Text>
                    {/* check if post has image */}
                    {post.photo_uri != null ?
                        <Image source={require('../../../assets/img/liquid_circle_loader.gif')} style={{ width: "100%", borderRadius: 10, marginVertical: 2 }} />
                        : null}
                    {/* <Text note style={{ alignSelf: "flex-end", }}>{post.createdAt}</Text> */}
                </View>
            </View>
            {/* buttons */}
            <View style={styles.btnContainer}>
                {/* like */}
                <TouchableOpacity onPress={() => {
                    // props.likePost(post, userLiked);
                    props.likePost(post, userLikedPost, (like) => {
                        setLikeState(like);
                    })
                }}
                    style={styles.actionBtn} >
                    <Icon name={userLikedPost ? "ios-heart" : "ios-heart-empty"} style={[userLikedPost ? { color: "#b80514" } : { color: "#777" }, { fontSize: 20 }]} />
                    <Text note style={{ marginLeft: 5, color: "#777" }}>{post.likes}</Text>
                </TouchableOpacity>
                {/* comments */}
                <TouchableOpacity style={styles.actionBtn} >
                    <Icon name={"ios-chatbubbles"} style={{ fontSize: 20, color: "#777" }} />
                    <Text note style={{ marginLeft: 5, color: "#777" }}>{post.comments}</Text>
                </TouchableOpacity>
                {/* more options */}
                <TouchableOpacity style={styles.actionBtn} >
                    <Icon name={"ios-more"} style={{ fontSize: 20, color: "#777" }} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
