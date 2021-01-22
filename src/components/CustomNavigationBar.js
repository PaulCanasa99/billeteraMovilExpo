import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

let color;
const CustomNavigationBar = ({ navigation, previous, scene }) => {
  const { colors } = useTheme();
  color = colors.surface;
  // useEffect(() => {
  //   console.log(scene.route.params.name);
  // }, []);
  return (
    <Appbar.Header style={style.appBar}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        titleStyle={{ fontFamily: 'Montserrat-SemiBold' }}
        style={style.appTitle}
        title={scene.route.params.name}
      />
      {previous ? <Appbar.Action /> : null}
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  appBar: {
    backgroundColor: '#222831',
  },
  appTitle: {
    alignItems: 'center',
  },
});
export default CustomNavigationBar;
