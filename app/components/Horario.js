import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS } from '../helpers/theme';

function Horario(props) {
  const { linha, route } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.column}>
        <Text style={[styles.text, styles.title]}>Saída</Text>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {linha && linha.number ? (
            linha.horario.ida[route.params.tipoDia].map(horario => (
              <Text key={horario} style={styles.text}>
                {horario}
              </Text>
            ))
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={COLORS.THEME} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.column}>
        <View style={styles.column}>
          <Text style={[styles.text, styles.title]}>Volta</Text>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {linha && linha.number ? (
              linha.horario.volta[route.params.tipoDia].map(horario => (
                <Text key={horario} style={styles.text}>
                  {horario}
                </Text>
              ))
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    color: COLORS.THEME,
    fontFamily: FONTS.MAIN,
  },
  title: {
    color: COLORS.THEME,
    fontFamily: FONTS.SEMI_BOLD,
  },
  column: {
    flex: 1,
  },
  loading: {
    textAlign: 'center',
    padding: 30,
  },
});

const mapStateToProps = state => {
  return {
    linha: state.linha.linha,
    errors: state.linha.errors,
  };
};

export default connect(mapStateToProps, {})(Horario);
