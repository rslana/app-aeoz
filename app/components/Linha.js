import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';
import {
  findById,
  loadFavorito,
  saveFavoritos,
  removeFavoritos,
  findFavoritoByNumber,
} from '../actions/linha';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Horario from './Horario';
import { COLORS, FONTS } from '../helpers/theme';

const Tab = createMaterialTopTabNavigator();

class Linha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linha: {},
      loading: true,
    };
  }

  componentDidMount = async () => {
    const { navigation, route } = this.props;
    await this.props.findFavoritoByNumber(route.params.number);
    if (this.props.linha && this.props.linha.number) {
      navigation.setOptions({
        title: (
          <Text>
            {this.props.linha.number} • {this.props.linha.name}
          </Text>
        ),
      });
    } else {
      navigation.setOptions({
        title: (
          <Text>
            {route.params.number} • {route.params.name}
          </Text>
        ),
      });
      await this.props.findById(this.props.route.params._id);
    }
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            fontFamily: FONTS.BOLD,
          },
          tabStyle: { width: 200, paddingVertical: 12 },
          scrollEnabled: true,
          indicatorStyle: {
            backgroundColor: COLORS.THEME,
            height: 4,
          },
        }}>
        <Tab.Screen
          name={'Dias úteis'}
          component={Horario}
          initialParams={{ tipoDia: 'diasUteis' }}
        />
        <Tab.Screen
          name={'Sábados'}
          component={Horario}
          initialParams={{ tipoDia: 'sabados' }}
        />
        <Tab.Screen
          name={'Domingos e Feriados'}
          component={Horario}
          initialParams={{ tipoDia: 'domingosFeriados' }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return {
    linhas: state.linha.linhas,
    linha: state.linha.linha,
    errors: state.linha.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      findById,
      loadFavorito,
      saveFavoritos,
      removeFavoritos,
      findFavoritoByNumber,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Linha);
