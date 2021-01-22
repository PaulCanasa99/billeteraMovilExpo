import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Groups = () => {
  return (
    <View style={style.container}>
      <Text>Groups Screen</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Groups;
