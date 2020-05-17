import 'package:chat_app/Pages/Game.dart';
import 'package:chat_app/theme/theme.dart' as MyTheme;
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    String field1 = '';
    String field2 = '';

    return MaterialApp(
      home: Scaffold(
        body: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.fromLTRB(0, 16.0, 0, 16.0),
                child: TextFormField(
                  onChanged: (value) {
                    field1 = value;
                  },
                  cursorColor: MyTheme.Theme.homePageFieldColor,
                  decoration: InputDecoration(
                    labelText: 'Player One',
                    labelStyle: TextStyle(
                        color: MyTheme.Theme.homePageFieldColor,
                        fontSize: 20,
                        fontWeight: FontWeight.bold),
                  ),
                  style: TextStyle(
                      color: MyTheme.Theme.homePageFieldColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 16.0, 0, 16.0),
                child: TextFormField(
                  onChanged: (value) {
                    field2 = value;
                  },
                  cursorColor: MyTheme.Theme.homePageFieldColor,
                  decoration: InputDecoration(
                    labelText: 'Player Two',
                    labelStyle: TextStyle(
                        color: MyTheme.Theme.homePageFieldColor,
                        fontSize: 20,
                        fontWeight: FontWeight.bold),
                  ),
                  style: TextStyle(
                      color: MyTheme.Theme.homePageFieldColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                ),
              ),
              Padding(
                  padding: EdgeInsets.fromLTRB(0, 44.0, 0, 16.0),
                  child: Builder(
                    builder: (context) => RaisedButton(
                      onPressed: () {
                        // Send field1 and field2 forward
                        Navigator.push(context,
                            MaterialPageRoute(
                              builder: (context) {
                                return Game(field1, field2);
                              }));
                      },
                      child: Text(
                        'Start',
                        style: TextStyle(
                          color: MyTheme.Theme.homePageButtonColor,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      color: MyTheme.Theme.homePageButtonBackground,
                      padding: EdgeInsets.fromLTRB(32, 12, 32, 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                  ))
            ],
          ),
          color: MyTheme.Theme.homePageBackground,
          padding: EdgeInsets.fromLTRB(40, 20, 40, 20),
        ),
      ),
    );
  }
}
