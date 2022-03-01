import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#24292e'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Repositorio</Text>
    </View>
  );
};

export default AppBar;