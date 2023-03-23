import axios from '../api';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addBeers, resetBeers} from '../store/beers';
import {useIsFocused} from '@react-navigation/native';

const _renderItem = ({item}) => {
  return (
    <View style={styles.userContainer}>
      <Text>{item.name}</Text>
      <Text>{item.id}</Text>
    </View>
  );
};

const _renderFooter = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);

export default function ApiScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();

  const beers = useSelector(state => state.beers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(resetBeers());
      setPage(1);
    }
  }, [isFocused, dispatch]);

  useEffect(() => {
    const fetchBeer = async page => {
      console.log(page);
      const {data} = await axios
        .get('beers', {
          params: {page},
        })
        .catch(err => {
          console.log(err);
        });
      setRefreshing(false);
      dispatch(addBeers(data));
    };
    fetchBeer(page);
  }, [page, dispatch]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          dispatch(resetBeers());
          setPage(1);
        }}
        keyExtractor={item => item.id}
        ListFooterComponent={_renderFooter}
        data={beers}
        renderItem={_renderItem}
        onEndReachedThreshold={0}
        onEndReached={() => {
          setPage(p => p + 1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 2,
    elevation: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
