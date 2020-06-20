import Data from '../Db';
import CorDB from './CordovaDB'
import { ToastAndroid } from 'react-native';

var cordova = new CorDB();

export default class DbWrapper {

  init() {
    cordova.init(); // create table if not exists
  }

  save(word, meaning) {
    try {
      cordova.insert(word, meaning);
      // ToastAndroid.show("asd",ToastAndroid.SHORT);
    }
    catch (e) {
      console.log("********* " + e + " ************");
      ToastAndroid.show(e + "Kaydedilirken hata meydana geldi! ", ToastAndroid.LONG);
    }
  }

  getMax = async () => {
    return await cordova.max();
  }

  /**
     * 
     * @param {*} id 
     * @param {*} val (meaning)
     * 
     */
  async getVal(id) {
    // var result = await dbService.select(tableName, "meaning", { "id": id })
    // var data = result[0];
    
    return await cordova.select(id);

    //ToastAndroid.show("asd " + meaning, ToastAndroid.SHORT);
  }

}
