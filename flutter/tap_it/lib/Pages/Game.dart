import 'dart:async';
import 'dart:math';

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

  bool gameStarted = false;

  bool gameOnGoing = false;

  int startedAt = 0;

  Color boxColor = Colors.grey;

  Timer intervalRef;

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
                            if (gameOnGoing) {
                              btnClicked(field1, context);
                            }
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
                  child: Container(
                    color: boxColor,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: <Widget>[
                        Text(
                          'Tap your button when the box color changes',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.w500,
                              decoration: TextDecoration.none),
                          textAlign: TextAlign.center,
                        ),
                        RaisedButton(
                          color: gameStarted ? Colors.red : Colors.green,
                          onPressed: () {
                            setState(() {
                              gameStarted = !gameStarted;
                              if (gameStarted) {
                                startGame();
                              } else {
                                stopGame();
                              }
                            });
                          },
                          child: Text(
                            gameStarted ? 'Stop Game' : 'Start Game',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.w500),
                          ),
                        )
                      ],
                    ),
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
                            if (gameOnGoing) {
                              btnClicked(field2, context);
                            }
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

  void startGame() {
    setState(() {
      gameStarted = true;
      Random rnd;
      int min = 3;
      int max = 10;
      rnd = new Random();
      int num = min + rnd.nextInt(max - min);
      intervalRef = Timer(new Duration(seconds: num), () {
        changeBackground();
      });
    });
  }

  void stopGame() {
    setState(() {
      gameStarted = false;
      intervalRef.cancel();
    });
  }

  void changeBackground() {
    setState(() {
      gameOnGoing = true;
      startedAt = DateTime.now().millisecondsSinceEpoch;
      boxColor = Colors.cyan;
    });
  }

  void btnClicked(user, BuildContext context) {
    setState(() {
      gameOnGoing = false;
      gameStarted = false;
      int endedAt = DateTime.now().millisecondsSinceEpoch;
      boxColor = Colors.grey;
      showWinner(user, (endedAt - startedAt) / 1000, context);
    });
  }

  showWinner(String winner, double reactionTime, BuildContext context) async {
    setState(() {
      if (winner == field1) {
        player1Score += 1;
      } else {
        player2Score += 1;
      }
    });

    showDialog(
        context: context,
        builder: (context) {
          return SimpleDialog(
            title: Text(
              'Winner',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 26),
            ),
            children: <Widget>[
              Padding(
                padding: EdgeInsets.fromLTRB(18, 18, 18, 18),
                child: Text(
                  'Winner: $winner',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 22),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(18, 18, 18, 18),
                child: Text(
                  'Reaction Time: $reactionTime',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 22),
                ),
              ),
            ],
          );
        });
  }
}
