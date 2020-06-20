import { ToastAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import WebSQLite from 'websqlite';

const SQLiteManager = new WebSQLite();


var database_name = "mySQLite.db";
var database_version = "1.0";
var database_displayname = "db";
var database_size = 20000000;

let conn;
var maxId;

export default class CorDB {

    constructor(props) {
        conn = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);
        //this.drop();
    }

    getConnection() {
        return conn;
    }

    init() {
        SQLiteManager.init({
            id: 'mySQLite',
            dbObject: SQLite,
        })

        conn.transaction(function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS words (id integer primary key AUTOINCREMENT, word text, meaning text, second_meaning text, show text, level text, _count text)', [],
                function (tx, result) {
                    //alert("Table created successfully");
                },
                function (error) {
                    alert("Error occurred while creating the table.");
                });
        });

    }

    insert(word, meaning) {
        conn.transaction(function (transaction) {
            var executeQuery = "INSERT INTO words (word,meaning,show) VALUES (?, ?, ?)";
            transaction.executeSql(executeQuery, [word, meaning, "yes"],
                function (tx, result) {
                    alert('Inserted');
                    console.log("inserted succesed");
                },
                function (error) {
                    console.log("inserted failed" + error);
                    alert('Error occurred' + error);
                });
        });
    }
    max = async () => {
        var a;

        //a = await SQLiteManager.select("words", " * ", whereKey + " = ?", [whereValue]);
        a = await SQLiteManager.select(" (select max(id) as id from words) ", " * ");
        const array = Object.values(a[0]);
        maxId = array
        return maxId;
    }

    select = async (id) => {
        var val;
        var map = {};
        val = await SQLiteManager.select(" (select * from words where id = " + id + ") ", " * ");
        map = val[0] || "";
        //console.log(map);
        return map;
    }

    executeSQL(query) {
        SQLiteManager.query(query)
    }

    update() {
        var id = $("#id").text();
        var title = $("#title").val();
        var desc = $("#desc").val()
        conn.transaction(function (transaction) {
            var executeQuery = "UPDATE codesundar SET title=?, desc=? WHERE id=?";
            transaction.executeSql(executeQuery, [title, desc, id],
                //On Success
                function (tx, result) {
                    alert('Updated successfully');
                },
                //On Error
                function (error) {
                    alert('Something went Wrong');
                });
        });
    }

    drop() {
        conn.transaction(function (transaction) {
            var executeQuery = "DROP TABLE IF EXISTS words";
            transaction.executeSql(executeQuery, [],
                function (tx, result) {
                    alert('Table deleted successfully.');
                },
                function (error) {
                    alert('Error occurred while droping the table.');
                }
            );
        });
    }

}