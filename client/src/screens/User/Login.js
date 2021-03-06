import React from 'react';
import { Formik } from 'formik';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Separator  from '../../components/shared/Separator';
import { LOGIN_USER } from '../../apollo/mutations';
import { useMutation } from '@apollo/react-hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    fontFamily: 'Porsche Next',
    fontSize: 26,
    marginBottom: 18,
  },
  input: {
    fontFamily: 'Porsche Next',
    alignSelf: 'stretch',
    height: 50,
    padding: 17,
    borderWidth: 1,
    borderColor: '#c8cacb',
    color: '#000'
  },
  button: {
    alignSelf: 'stretch',
    padding: 12
  },
  buttonText: {
    fontFamily: 'Porsche Next Bold',
    fontSize: 18
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

const Screen = ({ navigation }) => {
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
  const logo = require('../../images/logo.png');

  const login = async ({ email, password }) => {
    const { data: { loginUser: user } } = await loginUser({ variables : { email, password } });

    if(user) {
      navigation.navigate('Home', {user});
    }
  }

  return(
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.title}> Bienvenue sur RN Porsche </Text>

      <Formik
        initialValues={{
          email: navigation.getParam('email') || 'dds1991@hotmail.fr',
          password: navigation.getParam('password') || 'a',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => login(values)}
      >
      { props => (
        <>
          <TextInput
            style={styles.input}
            textContentType='emailAddress'
            placeholder='Porsche ID (adresse e-mail)'
            value={props.values.email}
            onChangeText={v => props.setFieldValue('email', v)}
            />

          <Separator spacing={12} />

          <TextInput
            style={styles.input}
            textContentType='password'
            secureTextEntry={true}
            value={props.values.password}
            onChangeText={v => props.setFieldValue('password', v)}
            />

          <Separator spacing={45} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#d5001c' }]}
            onPress={props.handleSubmit}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}> >  Se Connecter </Text>
          </TouchableOpacity>

          <Separator spacing={12} />

          <TouchableOpacity
            style={[styles.button, { borderWidth: 1, borderColor: '#767676' }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}> >  S'inscrire </Text>
          </TouchableOpacity>
        </>
      )}
      </Formik>
    </View>
  );
}
export default Screen;
