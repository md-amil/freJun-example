import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBeers, loadingStatus, resetBeers} from '../store/beers';
import {useIsFocused} from '@react-navigation/native';

const _renderItem = ({item}) => {
  return (
    <>
      <View style={styles.userContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text numberOfLines={1}>{item.description}</Text>
      </View>
    </>
  );
};

const _renderFooter = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);

export default function ApiScreen({navigation}) {
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const {loading, data: beers} = useSelector(state => state.beers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(resetBeers());
      setPage(1);
      dispatch(loadingStatus(true));
    }
  }, [isFocused, dispatch]);

  useEffect(() => {
    dispatch(fetchBeers(page));
  }, [page, dispatch]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          dispatch(loadingStatus(true));
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
    justifyContent: 'space-between',
  },
  title: {fontSize: 16, fontWeight: 'bold'},
});
