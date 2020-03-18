import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { findByStringSearch, findFavoritos, findAll } from '../actions/linha';
import { COLORS, FONTS } from '../helpers/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      spinAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  saveOffline = async () => {
    this.setState({ loading: true });
    await this.props.findAll();
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;

    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <>
        <StatusBar barStyle="default" />
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View>
              {loading ? (
                <View style={styles.headerBody}>
                  <Animated.View
                    style={{
                      transform: [{ rotate: spin }],
                    }}>
                    <Icon
                      name="sync"
                      size={38}
                      color={COLORS.THEME_OPACITYx2}
                      style={styles.headerIconSync}
                    />
                  </Animated.View>
                  <Icon
                    name="box-open"
                    size={58}
                    color={COLORS.THEME}
                    style={styles.headerIcon}
                  />
                </View>
              ) : (
                <View style={styles.headerBody}>
                  <Icon
                    name="check"
                    size={58}
                    color={COLORS.THEME}
                    style={styles.headerIconCheck}
                  />
                  <Text style={styles.headerDescritpion}>Tudo ok por aqui</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              disabled={loading}
              onPress={this.saveOffline}>
              <Icon
                name="cloud-download-alt"
                size={20}
                color={'#FFF'}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Salvar horários offline</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyTitle}>
              <Icon name="history" size={18} color={COLORS.THEME} /> Última
              atualização
            </Text>
            <Text style={styles.bodyDescription}>20 de fevereiro de 2020</Text>
          </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBody: {
    alignItems: 'center',
  },
  headerDescritpion: {
    fontSize: 18,
  },
  button: {
    width: Dimensions.get('screen').width - 100,
    borderRadius: 28,
    height: 56,
    backgroundColor: COLORS.THEME,
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginTop: 58,
  },
  buttonIcon: {
    alignSelf: 'center',
    marginRight: 12,
  },
  buttonText: {
    fontFamily: FONTS.MAIN,
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 16,
  },
  body: {
    backgroundColor: COLORS.THEME_OPACITY,
    alignItems: 'baseline',
    padding: 36,
  },
  bodyTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.THEME,
    fontSize: 18,
  },
  bodyDescription: {
    fontFamily: FONTS.MAIN,
    color: COLORS.THEME,
    fontSize: 16,
    marginTop: 4,
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

export default connect(mapStateToProps, mapDispatchToProps)(Config);
