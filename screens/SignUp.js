import React from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from 'native-base';
import { StyleSheet, ImageBackground, View, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components';
import Dimensions from 'Dimensions';
import firebase from 'firebase';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

// const Color = ['#0089BA', '#3C80C0', '#6574BD'];
const Color = ['#0818A8', '#024FA8', '#2E96C7'];
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: '',
      email: '',
      password: '',
      logo_white:''
    };
  }

  componentDidMount() {
    const images = firebase.storage().ref();
    const logo_white = images.child('logo_white.png');
    const login_background = images.child('login_background.jpg');
    let promises = []
    promises.push(logo_white.getDownloadURL());
    promises.push(login_background.getDownloadURL());
    Promise.all(promises).then(images=>{
      this.setState({
        logo_white: images[0],
        login_background: images[1],
        loading: false
      })
    })
  }

  handleSignUp = () => {
    const { name, email, password } = this.state;

    // Signup with firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ name: '', email: '', password: '' });
        alert('success');
        // Move after Signup
      })
      .catch(error => alert(error));
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.navigation.navigate('Intro');
      })
      .catch(error => {
        console.log(error.message);
        alert('Please type correct login information');
      });
  };

  render() {
    if (this.state.loading) return <ActivityIndicator />
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{uri:this.state.login_background}}
          style={styles.backgroundImg}
        >
          <LinearGradient colors={Color} style={styles.gradient}>
            <Content contentContainerStyle={{ alignItems: 'center' }}>
              <View style={styles.intro}>
                <Image
                  style={styles.logoImg}
                  source={{uri:this.state.logo_white}}
                />
                <Title style={styles.title}>Aquafit For All</Title>
                <Text style={styles.detail}>
                  Hi, we're Aquafit for All Association. We organize aquatic
                  opportunities for individuals of all ages and abilities. We
                  would love your opinion on our programs!
                </Text>
              </View>

              <Form style={styles.form}>
                <ItemWrapper contentContainerStyle={{ alignItems: 'center' }}>
                  <Item rounded style={styles.item}>
                    <Input
                      placeholder="Full Name"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={name => this.setState({ name })}
                      style={{ fontSize: 16 }}
                    />
                  </Item>
                  <Item rounded style={styles.item}>
                    <Input
                      placeholder="Email"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={email => this.setState({ email })}
                      style={{ fontSize: 16 }}
                    />
                  </Item>
                  <Item rounded style={styles.item}>
                    <Input
                      placeholder="Password"
                      autoCapitalize={'none'}
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                      style={{ fontSize: 16 }}
                    />
                  </Item>
                </ItemWrapper>

                <Button
                  style={styles.signUpButton}
                  full
                  rounded
                  color="#e93766"
                  onPress={this.handleSignUp}
                >
                  <Text style={{ color: 'white' }}>Sign Up</Text>
                </Button>

                <Button
                  style={styles.logInButton}
                  full
                  rounded
                  color="#2D90F5"
                  onPress={this.handleLogin}
                >
                  <Text style={{ color: 'white' }}>Log In</Text>
                </Button>
                {/* <Wrapper>
              <Text>
                Already have an account?{' '}
                <Text
                  onPress={this.handleLogin}
                  style={{ color: '#2D90F5', fontSize: 20 }}
                >
                  Login
                </Text>
              </Text>
            </Wrapper> */}
              </Form>
            </Content>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: ScreenWidth,
    height: ScreenHeight
  },
  intro: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    textAlign: 'center'
  },
  gradient: {
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImg: {
    width: 100,
    height: 100
  },
  detail: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '90%'
  },
  logInButton: {
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%'
  },
  item: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    opacity: 1
  }
});
