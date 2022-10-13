import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native';

export default function App() {
  const [data, setData] = useState();

  const submit = () => {
    const fetchedData = () => {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => setData(data));
    };

    const fetchApi = () => {
      return fetch(
        'http://localhost:5555/api',
        // { mode: 'no-cors' },
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log('submit:', data));
    };

    fetchedData();
    fetchApi();
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => submit()} title="Fetch and save data in Mongodb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
