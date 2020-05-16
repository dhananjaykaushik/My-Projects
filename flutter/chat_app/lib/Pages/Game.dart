import 'package:flutter/material.dart';
import 'package:chat_app/theme/theme.dart' as MyTheme;

class Game extends StatefulWidget {
  String field1;
  String field2;
  Game(this.field1, this.field2);
  @override
  _GameState createState() => _GameState(this.field1, this.field2);
}

class _GameState extends State<Game> {
  String field1;
  String field2;

  int player1Score = 0;
  int player2Score = 0;
  _GameState(this.field1, this.field2);
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => Future.value(false),
      child: Container(
          child: Column(
            children: <Widget>[
              Expanded(
                  flex: 2,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        color: Colors.blue,
                        padding: EdgeInsets.fromLTRB(32, 16, 32, 16),
                        child: Text(
                          '$field1 : $player1Score',
                          style: TextStyle(
                              color: MyTheme.Theme.homePageButtonColor,
                              fontSize: 22,
                              fontWeight: FontWeight.w600,
                              decoration: TextDecoration.none),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: RawMaterialButton(
                          onPressed: () {
                            setState(() {
                              player1Score += 1;
                            });
                          },
                          elevation: 2.0,
                          fillColor: MyTheme.Theme.homePageButtonBackground,
                          child: Icon(
                            Icons.wb_sunny,
                            size: 25.0,
                          ),
                          padding: EdgeInsets.all(15.0),
                          shape: CircleBorder(),
                        ),
                      )
                    ],
                  )),
              Expanded(
                  flex: 5,
                  child: Center(
                    child: Text('GAMING HERE'),
                  )),
              Expanded(
                  flex: 2,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: RawMaterialButton(
                          onPressed: () {
                            setState(() {
                              player2Score += 1;
                            });
                          },
                          elevation: 2.0,
                          fillColor: MyTheme.Theme.homePageButtonBackground,
                          child: Icon(
                            Icons.wb_sunny,
                            size: 25.0,
                          ),
                          padding: EdgeInsets.all(15.0),
                          shape: CircleBorder(),
                        ),
                      ),
                      Container(
                        color: Colors.blue,
                        padding: EdgeInsets.fromLTRB(32, 16, 32, 16),
                        child: Text(
                          '$field2 : $player2Score',
                          style: TextStyle(
                              color: MyTheme.Theme.homePageButtonColor,
                              fontSize: 22,
                              fontWeight: FontWeight.w600,
                              decoration: TextDecoration.none),
                        ),
                      )
                    ],
                  ))
            ],
          ),
          color: MyTheme.Theme.homePageBackground,
          padding: EdgeInsets.fromLTRB(40, 60, 40, 60)),
    );
  }
}
