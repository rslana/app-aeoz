import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../helpers/theme';

class CardLinha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linha: {
        name: '',
        number: '',
        link: '',
      },
      loading: true,
    };
  }

  componentDidMount = async () => {
    this.setState({ linha: this.props.linha, loading: false });
  };

  handlePress = linha => {
    this.props.navigation.navigate('Linha', { ...linha });
  };

  render() {
    console.log(this.props);
    const { linha } = this.state;
    return (
      <View key={linha.number}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.card}
          onPress={() => this.handlePress(linha)}>
          <Text style={styles.linhaNumber}>{linha.number}</Text>
          <Text style={styles.linhaName} numberOfLines={2}>
            {linha.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.THEME_OPACITY,
    borderRadius: 6,
    flex: 1,
    height: 80,
    flexDirection: 'row',
    alignContent: 'center',
  },
  linhaNumber: {
    fontSize: 15,
    borderRadius: 6,
    backgroundColor: COLORS.THEME,
    color: '#FFF',
    paddingVertical: 13,
    paddingHorizontal: 12,
    fontFamily: FONTS.SEMI_BOLD,
    alignSelf: 'center',
  },
  linhaName: {
    fontSize: 15,
    paddingHorizontal: 14,
    flex: 1,
    color: COLORS.THEME,
    fontFamily: FONTS.MAIN,
    alignSelf: 'center',
  },
});

export default CardLinha;
