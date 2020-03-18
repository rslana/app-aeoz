import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  findFavoritoByNumber,
  saveFavoritos,
  removeFavoritos,
} from '../../actions/linha';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../helpers/theme';

class BtnFavorito extends Component {
  render() {
    const { linha, existe } = this.props;
    if (existe) {
      return (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => this.props.removeFavoritos(linha)}>
          <Icon name={'ios-heart'} size={28} color={COLORS.THEME} />
        </TouchableOpacity>
      );
    } else {
      return linha.number ? (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => this.props.saveFavoritos(linha)}>
          <Icon name={'ios-heart-empty'} size={28} color={COLORS.THEME} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.iconRight}>
          <Icon
            name={'ios-heart-empty'}
            size={28}
            color={COLORS.THEME_OPACITY}
          />
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  iconRight: {
    padding: 18,
  },
});

const mapStateToProps = state => {
  return {
    linha: state.linha.linha,
    existe: state.linha.favoritos.some(
      fav => fav.number === state.linha.linha.number,
    ),
    errors: state.linha.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveFavoritos,
      removeFavoritos,
      findFavoritoByNumber,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnFavorito);
