import * as React from 'react';
import { View, Button, Text, Animated, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DbWrapper from './src/components/DbWrapper';
import Mybutton from './src/components/Button'
import GamerOverlay from './src/components/OverlayGame';
import MyWeb from './src/components/WebView'
import { RectButton } from 'react-native-gesture-handler';


var dbService = new DbWrapper()


var state = {
  word: "Type here to Word!",
  meaning: "Type here to Meaning!"
};
function setWord(pWord) {
  state.word = pWord;
};
function setMeaning(pMeaning) {
  state.meaning = pMeaning;
}
function getWord(pWord) {
  return state.word;
};
function getMeaning(pMeaning) {
  return state.meaning;
}


const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "Type here to Word!",
      meaning: "Type here to Meaning!"
    }

    dbService.init();

  }

  Show = (text) => {
    ToastAndroid.show(text,ToastAndroid.SHORT)
  }

  Refresh = () => {
   this.Show(this.state.word) 
  }

  Save = () => {
    if (getWord() === "Type here to Word!" || getMeaning() === "Type here to Meaning!") {
      alert('İki Alanda Boş Olamaz!')
      return;
    }
    dbService.save(getWord(), getMeaning());
    setWord("Type here to Word!");
    this.setState({ word: "Type here to Word!" });
    this.setState({ meaning: "Type here to Meaning!" });
  }

  forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return {
      leftButtonStyle: { opacity },
      rightButtonStyle: { opacity },
      titleStyle: { opacity },
      backgroundStyle: { opacity },
    };
  };

  GameScreen = () => {
    return (
      <View>
        <GamerOverlay />
      </View>
    );
  }

  Web = () => {
    return (
      <View>
        <MyWeb />
      </View>
    );
  }

  Home = ({ navigation }) => {
    return (
      <View>
        <View style={styles.inputTextWord}>
          <TextInput
            textAlign={'center'}
            placeholder={this.state.word}
            onChangeText={(value) => setWord(value)}
          //value={state.text}
          />
        </View>
        <View style={styles.inputTextMeaning}>
          <TextInput
            textAlign={'center'}
            placeholder={this.state.meaning}
            onChangeText={(value) => setMeaning(value)}
          //value={state.text}
          />
        </View>
        <Mybutton
          title="Save"
          style={styles.saveButton}
          customClick={() => this.Save()}
        />
        <Mybutton
          title="Start Games "
          style={styles.gameButton}
          customClick={() => navigation.navigate('Games')}
        />
        <Mybutton
          title="WebView"
          style={styles.webview}
          customClick={() => this.Refresh()}
        />
      </View>
    );
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={this.Home}
            options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'tomato' },
            }}
          />
          <Stack.Screen
            name="Games"
            component={this.GameScreen}
            options={{ headerStyleInterpolator: this.forFade }}
          />
          <Stack.Screen
            name="Web"
            component={this.Web}
            options={{ headerStyleInterpolator: this.forFade }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.RED,
  },
  inputTextMeaning: {
    height: 40,
    width: 270,
    top: 280,
    left: 85,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 10,
    //flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: Colors.dark,
  },
  inputTextWord: {
    height: 40,
    width: 270,
    top: 270,
    left: 85,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 10,
    //flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: Colors.dark,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  saveButton: {
    height: 40,
    width: 110,
    top: 280,
    left: 210,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.dark,
  },
  gameButton: {
    height: 40,
    width: 140,
    top: 600,
    left: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.dark,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
