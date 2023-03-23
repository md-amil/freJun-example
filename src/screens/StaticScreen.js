import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import userConstant from '../constant/users';

export default function StaticScreen() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(userConstant);

  useEffect(() => {
    const filtered = userConstant.filter(user => {
      return user.login.includes(search);
    });
    setUsers(filtered);
  }, [search]);

  const _renderItem = ({item}) => {
    return (
      <View style={styles.userContainer}>
        <Text>{item.login}</Text>
        <Text>{item.id}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="Insert your text"
        />
        <View>
          <Button title="clear" onPress={() => setSearch('')} />
          <Button
            title="short"
            onPress={() => setUsers(u => [...u.reverse()])}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={users}
        renderItem={_renderItem}
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
