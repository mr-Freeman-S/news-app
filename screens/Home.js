import React from "react";
import {newsApi} from "../api/newsAPI";
import {Alert, FlatList, RefreshControl, TouchableOpacity, View} from "react-native";
import {Post} from "../components/Post";
import {Loading} from "../components/Loading";


export const Home = ({navigation}) => {
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const fetchPosts = () => {
        newsApi.getNews()
            .then(({data}) => setData(data))
            .catch(err => {
                console.log(err)
                Alert.alert('Error', "Error response news")
            })
            .finally(() => setIsLoading(false))
    }

    React.useEffect(fetchPosts, [])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <View>
            <FlatList data={data}
                      renderItem={({item}) => {
                          return <TouchableOpacity
                              onPress={() => navigation.navigate('FullPost', {id: item.id, title: item.title})}>
                              <Post title={item.title}
                                    createdAt={item.createdAt}
                                    imageUrl={item.imageUrl}/>
                          </TouchableOpacity>
                      }
                      }
                      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
            />
        </View>
    );
}
