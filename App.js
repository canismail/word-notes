import * as React from 'react';
import { View, Animated, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DbWrapper from './src/components/DbWrapper';
import Mybutton from './src/components/Button'
import GamerOverlay from './src/components/OverlayGame';
import ChangeText from './src/components/ChangeText'


var dbService = new DbWrapper()


const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "Type here to Word!",
      meaning: "Type here to Meaning!",
      text:"deneme",
      appText: 'Hello World'
    }

    dbService.init();

  }

  Show = (text) => {
    ToastAndroid.show(text,ToastAndroid.SHORT)
  }

  Save = (word,meaning) => {
    if (word === "" || meaning === "") {
      alert('İki Alanda Boş Olamaz!' + meaning)
      return;
    }
    dbService.save(word, meaning);
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



  Home = ({ navigation }) => {
    return (
      <View>
        <ChangeText save={this.Save} />
        <Mybutton
          title="Start Games "
          style={styles.gameButton}
          customClick={() => navigation.navigate('Games')}
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
         
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.RED,
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
  gameButton: {
    height: 40,
    width: 140,
    top: 560,
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
