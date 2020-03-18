import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { findByStringSearch, findFavoritos, findAll } from '../actions/linha';
import { COLORS, FONTS } from '../helpers/theme';
import CardLinha from './CardLinha';
import SearchLinha from './SearchLinha';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { HomeHeaderRight, HomeHeaderLeft } from './layout/Header';

class Linhas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
      loading: false,
      topBarSearch: false,
    };
  }

  componentDidMount = async () => {
    this.props.navigation.setOptions({
      headerTitle: () => <HomeHeaderLeft />,
      headerRight: () => <HomeHeaderRight navigation={this.props.navigation} />,
    });
    await this.props.findFavoritos();
  };

  getFavoritos = async () => {
    const favoritosString = await AsyncStorage.getItem('@storage_favoritos');
    if (favoritosString) {
      return JSON.parse(favoritosString);
    }
    return [];
  };

  deleteFavoritos = async () => {
    await AsyncStorage.setItem('@storage_favoritos', '');
  };

  render() {
    const { linhas, favoritos } = this.props;
    return (
      <>
        <StatusBar barStyle="default" />
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled">
            <ImageBackground
              source={require('../../assets/images/people-illustration.jpeg')}
              style={styles.imageBackground}>
              <SearchLinha fixed={this.state.fixed} />
            </ImageBackground>
            <View style={styles.result}>
              <Text style={styles.searchFooter}>
                {linhas.length === 0 ? (
                  <Text>
                    <Icon name={'ios-heart'} size={14} color={COLORS.THEME} />{' '}
                    &nbsp;Favoritos
                  </Text>
                ) : (
                  <Text>
                    {linhas.length} resultado{linhas.length > 1 && 's'}
                  </Text>
                )}
              </Text>
            </View>
            <View>
              <View style={styles.linhasContainer}>
                {linhas.length > 0 ? (
                  linhas.map(linha => (
                    <CardLinha
                      key={Math.random()}
                      linha={linha}
                      navigation={this.props.navigation}
                      route={this.props.route}
                    />
                  ))
                ) : favoritos.length > 0 ? (
                  favoritos.map(linha => (
                    <CardLinha
                      key={Math.random()}
                      linha={linha}
                      navigation={this.props.navigation}
                      route={this.props.route}
                    />
                  ))
                ) : (
                  <Text style={styles.vazio}>Pesquise uma linha</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerName: {
    fontSize: 22,
    fontFamily: 'OpenSans-Bold',
    marginTop: -10,
    letterSpacing: 4,
    color: COLORS.THEME,
  },
  linhasContainer: {
    paddingVertical: 10,
  },
  vazio: {
    marginVertical: 8,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    textAlign: 'center',
  },
  imageBackground: {
    resizeMode: 'stretch',
    paddingTop: 200,
    display: 'flex',
    alignContent: 'center',
  },
  result: {
    marginTop: 20,
  },
  searchFooter: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.THEME,
    fontFamily: FONTS.MAIN,
  },
});

const mapStateToProps = state => {
  return {
    linhas: state.linha.linhas,
    errors: state.linha.errors,
    favoritos: state.linha.favoritos,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { findByStringSearch, findFavoritos, findAll },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Linhas);
