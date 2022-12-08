import styled from "styled-components/native";
import {Alert, View} from "react-native";
import React, {useEffect} from "react";
import {newsApi} from "../api/newsAPI";
import {Loading} from "../components/Loading";


const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`
const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`
export const FullPost = ({route, navigation}) => {
    const [data, setData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)
    const {id, title} = route.params

    const fetchPost = () => {
        navigation.setOptions({
            title,
        })
        newsApi.getPost(id)
            .then((r) => setData(r.data))
            .catch(err => {
                console.log(err)
                Alert.alert('Error', "Error response news")
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(fetchPost, [])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <View style={{padding: 20}}>
            <PostImage source={{uri: data.imageUrl}}/>
            <PostText>{data.text}</PostText>
        </View>
    );
};

