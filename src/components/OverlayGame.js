import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { View, Button, Text, Animated, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import Mybutton from './Button';
import DbWrapper from './DbWrapper';
import { SmartText, LightText } from 'react-native-smart-text';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { func } from 'prop-types';
import { State } from 'react-native-gesture-handler';

var db = new DbWrapper()

const GamerOverlay = () => {
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [id, setID] = useState("");

  const [btn1Word, setBtn1Word] = useState("");
  const [btn1Meaning, setBtn1Meaning] = useState("");
  const [btn1Color, setBtn1Color] = useState("f15555");

  const [btn2Word, setBtn2Word] = useState("");
  const [btn2Meaning, setBtn2Meaning] = useState("");
  const [btn2Color, setBtn2Color] = useState("");

  const [btn3Word, setBtn3Word] = useState("");
  const [btn3Meaning, setBtn3Meaning] = useState("");
  const [btn3Color, setBtn3Color] = useState("");

  const [btn4Word, setBtn4Word] = useState("");
  const [btn4Meaning, setBtn4Meaning] = useState("");
  const [btn4Color, setBtn4Color] = useState("");

  const toggleOverlay = async () => {
    var max = await db.getMax();

    if (max < 5) {
      alert('Bu Oyun İçin Yeterli Kelime(5) Kaydetmelisiniz!');
      setVisible(visible);
      return;
    }
    refresh();
    setVisible(!visible);
  };

  var randomArray = [];

  async function getRandomValue(max) {

    var randomVal;

    while (true) {
      randomVal = Math.floor(Math.random() * max) + 1;
      if (!randomArray.includes(randomVal)) {
        randomArray.push(randomVal);
        return randomVal;
      }
    }

  }

  async function refresh() {
    var max = await db.getMax();
    var randomVal = await getRandomValue(max);
    var randomVa2 = await getRandomValue(max);
    var randomVa3 = await getRandomValue(max);
    var randomVa4 = await getRandomValue(max);

    var selectMap1 = await db.getVal(randomVal);
    var selectMap2 = await db.getVal(randomVa2);
    var selectMap3 = await db.getVal(randomVa3);
    var selectMap4 = await db.getVal(randomVa4);

    //console.log("log : " + selectMap1["meaning"]);

    randomArray = [];
    var random = await getRandomValue(4);

    if (random === 1) {
      setWord(selectMap1["word"]);
      setMeaning(selectMap1["meaning"]);
    } else if (random === 2) {
      setWord(selectMap2["word"]);
      setMeaning(selectMap2["meaning"]);
    } else if (random === 3) {
      setWord(selectMap3["word"]);
      setMeaning(selectMap3["meaning"]);
    } else if (random === 4) {
      setWord(selectMap4["word"]);
      setMeaning(selectMap4["meaning"]);
    }
    setID(random);

    setBtn1Word(selectMap1["word"]);
    setBtn1Meaning(selectMap1["meaning"]);
    setBtn1Color('#f15555');

    setBtn2Word(selectMap2["word"]);
    setBtn2Meaning(selectMap2["meaning"]);
    setBtn2Color('#f15555');

    setBtn3Word(selectMap3["word"]);
    setBtn3Meaning(selectMap3["meaning"]);
    setBtn3Color('#f15555');

    setBtn4Word(selectMap4["word"]);
    setBtn4Meaning(selectMap4["meaning"]);
    setBtn4Color('#f15555');

  }

  // async/await tüm route ta olmalı. yoksa düzgün çalışmıyor
  async function check(choice) {
    //show("type meaning : " + typeof({ meaning }));
    var a = ({ meaning })['meaning'];
    var b;
    if (choice !== undefined) {
      if ((choice)['btn1Meaning'] !== undefined) {
        b = (choice)['btn1Meaning'];
      } else if ((choice)['btn2Meaning'] !== undefined) {
        b = (choice)['btn2Meaning'];
      } else if ((choice)['btn3Meaning'] !== undefined) {
        b = (choice)['btn3Meaning'];
      } else if ((choice)['btn4Meaning'] !== undefined) {
        b = (choice)['btn4Meaning'];
      }

      if (id === 1) {
        setBtn1Color('green');
      } else if (id === 2) {
        setBtn2Color('green');
      } else if (id === 3) {
        setBtn3Color('green');
      } else if (id === 4) {
        setBtn4Color('green');
      }

/*
      if (a === b) {
        show("Bingo!");
      } else {
        show("Wrong!");
      }
      */
    }
    // await assignValues();
    // await setViewValues();
  }
  async function next(){
    await refresh();
  }

  function show(text) {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }

  return (
    <View>
      <Mybutton
        style={styles.openButton}
        title="Guess Game"
        customClick={toggleOverlay}
      />

      <Overlay
        isVisible={visible}
        borderRadius={20}
        onBackdropPress={toggleOverlay}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="white"
      >
        <View>
          <SmartText style={styles.text_word}> {word} </SmartText>
          <Mybutton
            title={btn1Meaning}
            style={[styles.button_1, { backgroundColor: btn1Color }]}
            customMeaning={btn1Meaning}
            customColor='blue'
            customClick={() => check({ btn1Meaning })}
          />
          <Mybutton
            title={btn2Meaning}
            style={[styles.button_2, { backgroundColor: btn2Color }]}
            customMeaning={btn2Meaning}
            backgroundColor='blue'
            customClick={() => check({ btn2Meaning })}
          />
          <Mybutton
            title={btn3Meaning}
            style={[styles.button_3, { backgroundColor: btn3Color }]}
            customMeaning={btn3Meaning}
            customClick={() => check({ btn3Meaning })}
          />
          <Mybutton
            style={[styles.button_4, { backgroundColor: btn4Color }]}
            title={btn4Meaning}
            customMeaning={btn4Meaning}
            customClick={() => check({ btn4Meaning })}
          />
          <Mybutton
            title='Next'
            style={[styles.button_next, { backgroundColor: '#46403d' }]}
            customClick={() => next()}
          />

        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  openButton: {
    height: 40,
    width: 280,
    top: 40,
    left: 50,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  button_next: {
    height: 35,
    width: 70,
    top: 121,
    left:190,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  button_1: {
    height: 40,
    width: 130,
    top: 191,
    left: -10,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  button_2: {
    height: 40,
    width: 130,
    top: 135,
    left: 140,
    backgroundColor: 'blue',
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  button_3: {
    height: 40,
    width: 130,
    top: 130,
    left: -10,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  button_4: {
    height: 40,
    width: 130,
    top: 75,
    left: 140,
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  textView: {
    height: 100,
    width: 150,
    top: 200,
    left: 100,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: "bold"
  },
  text_word: {
    height: 70,
    width: 270,
    top: 190,
    left: 30,
    fontSize: 35,
    color: '#f0000d',
    borderRadius: 10,
    backgroundColor: '#46403d',
    borderWidth: 1,
    textAlign: 'center',
  }
});
export default GamerOverlay;
