import React, { Component } from 'react'
import { AppRegistry, TextInput, View, StyleSheet, Button } from 'react-native'
import Mybutton from './Button'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

export default class ChangeText extends Component {
  constructor (props) {
    super(props)
    this.state = {
        word: "",
        meaning: "",
        appText: 'Hello World'
      }
  }

  submitAndClear = () => {

    this.props.save(this.state.word,this.state.meaning);

    this.setState({
      meaning: ''
    });

    this.setState({
        word: ''
      })
  
  }

  search = () => {
    //this.props.writeText(this.state.meaning)
    
    var query = this.state.word;

    if (query === '') return;

    var translateMeaning;
    var self = this;

    axios({
      method: 'get',
      url: 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=' + query,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
        console.log(response.data);
        self.setState({meaning : response.data[0][0][0] })
        console.log(translateMeaning);

      })
      .catch(function (response) {
        alert(response);
        console.log(response);
        page = null;
      });

    this.setState({
        meaning: translateMeaning
      })
  }

  setMeaning = (meaning) => {
     this.state.meaning = meaning;
  }

  setWord = (word) => {
    this.state.word = word;
  }

  render () {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.inputTextWord}>
          <TextInput
            textAlign={'center'}
            placeholder='Type here to Word!'
            onChangeText={val => this.setWord(val)}
            clearButtonMode='always'
            defaultValue={this.state.word}
          />
        </View>
        <View style={styles.inputTextMeaning}>
          <TextInput
            textAlign={'center'}
            placeholder='Type here to Meaning!'
            onChangeText={val => this.setMeaning(val)}
            defaultValue={this.state.meaning}
            clearButtonMode='always'
          />
        </View>
        
        <Mybutton
          customClick={this.submitAndClear}
          title="Save"
          style={styles.saveButton}
        />
        <Mybutton
          title="Search"
          style={styles.sorgula}
          customClick={this.search}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '90%'
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 20,
    margin: 10,
    borderRadius: 20
  },saveButton: {
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
  sorgula: {
    height: 40,
    width: 110,
    top: 225,
    left: 50,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.dark,
  },
})

AppRegistry.registerComponent('clear-text', () => ChangeText)