import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../helpers/theme';

export class HomeHeaderLeft extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerIcon}>
          <Icon name="ios-bus" size={36} color={COLORS.THEME} />
        </Text>
        <Text style={styles.headerName}>AEOZ</Text>
      </View>
    );
  }
}

export const HomeHeaderRight = ({ navigation }) => {
  console.log(navigation);
  return (
    <TouchableOpacity
      style={styles.iconRight}
      onPress={() => navigation.navigate('Configurações')}>
      <Icon name={'ios-options'} size={28} color={COLORS.THEME} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  headerIcon: {
    flex: 1,
    marginLeft: 4,
  },
  headerName: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    letterSpacing: 4,
    color: COLORS.THEME,
    marginTop: 2,
    marginLeft: 12,
    textAlign: 'center',
  },
  iconRight: {
    padding: 18,
  },
});
