/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ListView,
  requireNativeComponent,
  ScrollView,
} from 'react-native';

const Ads = requireNativeComponent('Ads', null);


const MOCK = {
  title: "Kendini Sürekli Övmezse Ölecek Hastalığına Tutulmuş İnsanların Kullandığı 13 Yöntem",
  image: "https://img-s2.onedio.com/id-594a7872732603b411e85cf9/rev-1/w-480/h-240/o-74x49/f-jpg/s-127623f99108b3a223a4d01432d2fbb1ada3efd3.jpg",
}

var REQUEST_URL = 'https://onedio.com/api/mobile/v1/feed?limit=100';
export default class ReklamListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      items: [MOCK],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        var withAds = this.insertAds(responseData.articles);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(withAds),
          loaded: true,
        });
      })
      .done();
  }

  insertAds(articles) {
    var newArticleList = [];
    for (var index = 0; index < articles.length; index++) {
      if (index == 0) {
        newArticleList.push(articles[index]);
        newArticleList.push({
          isAd: true
        })
      } else {
        newArticleList.push(articles[index]);
      }
    }
    return newArticleList;
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            source={require('./logo.png')}
            style={styles.imageHeader} />
        </View>
        {this.renderList()}
      </View>
    );
  }

  renderList() {
    if (this.state.loaded) {
      return (
        <ListView
          contentContainerStyle={{
            paddingVertical: 4,
            alignItems: "center",
          }}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}>
        </ListView>
      )
    } else {
      return (
        <ActivityIndicator style={{ flex: 1 }} />
      )
    }
  }

  renderItem(item) {

    if (item.isAd) {

      return (
        <View style={{ width: 320, height: 268, padding: 4, }}>
          <Ads
            style={{ width: 320, height: 260, }}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image.x6 }}
            style={styles.image} />
          <Text
            style={styles.instructions}>
            {item.title}
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  ad: {
    height: 175,
    width: 350,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    borderRadius: 4,
    alignItems: "stretch",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  image: {
    width: 350,
    height: 175,
  },
  headerContainer: {
    flex: 1,
  },
  imageHeader: {
    width: 100,
    height: 48,
    alignSelf: 'center',
    margin: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    margin: 8,
    fontFamily: "AmericanTypewriter",
    marginBottom: 5,
    fontWeight: 'bold',
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 50,
  }
});

AppRegistry.registerComponent('ReklamListe', () => ReklamListe);
