import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { findByStringSearch } from '../actions/linha';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../helpers/theme';

class SearchLinha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: false,
    };
  }

  onChangeText = text => {
    this.setState({ text });
    this.findByStringSearch(text);
  };

  pararBusca = () => {
    clearTimeout(this.state.busca);
  };

  findByStringSearch = text => {
    const buscar = async () => {
      await this.props.findByStringSearch(text);
      this.setState({
        loading: false,
        errors: this.props.errors,
      });
    };

    this.pararBusca();

    this.setState({ loading: true });
    this.setState({
      busca: setTimeout(function() {
        buscar();
      }, 500),
    });
  };

  clearInput = async () => {
    this.setState({ text: '' });
    await this.props.findByStringSearch('text');
  };

  render() {
    const { text, loading } = this.state;
    const { topBar } = this.props;
    return (
      <View style={topBar ? styles.topBar : {}}>
        <View>
          <TextInput
            style={[styles.input, styles.fixed]}
            onChangeText={this.onChangeText}
            value={text}
            placeholder={'Digite o nº ou nome da linha'}
          />
          {loading ? (
            <TouchableOpacity style={styles.loading}>
              <ActivityIndicator size={22} color={COLORS.THEME} />
            </TouchableOpacity>
          ) : (
            !!text && (
              <TouchableOpacity
                onPress={this.clearInput}
                style={styles.clearButton}>
                <Icon name="ios-close" size={36} color={COLORS.THEME} />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    );
  }
}

SearchLinha.defaultProps = {
  topBar: false,
};

SearchLinha.propTypes = {
  topBar: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 18,
    paddingLeft: 20,
    paddingRight: 42,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#FFF',
    fontFamily: 'OpenSans-Regular',
  },
  clearButton: {
    position: 'absolute',
    top: 11,
    right: 18,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  loading: {
    position: 'absolute',
    top: 18,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  topBar: {
    flex: 1,
    marginTop: 10,
    marginLeft: -16,
    width: Dimensions.get('screen').width,
  },
});

const mapStateToProps = state => {
  return {
    errors: state.linha.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ findByStringSearch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLinha);
