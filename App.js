import {Alert, StatusBar, View} from 'react-native';
import {Post} from "./components/Post/Post";
import React from "react";
import {newsApi} from "./api/newsAPI";


export default function App() {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
            newsApi.getNews()
                .then((r) => setData(r.data))
                .catch(err => {
                    console.log(err)
                    Alert.alert('Error', "Error response news")
                })
        },
        [])
    return (
        <View>
            {
                data.map(el => {
                    return <Post
                        key={el.id}
                        title={el.title}
                        imageUrl={el.imageUrl}
                        createdAt={el.createdAt}
                    />
                })
            }
            <Post/>
            <StatusBar theme="auto"/>

        </View>
    );
}
