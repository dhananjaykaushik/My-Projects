import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.blue[900]
      ),
      home: Scaffold(
        appBar: AppBar(
          centerTitle: false,
          title: Text('Chatty', textAlign: TextAlign.center, style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            letterSpacing: 1
          )),
        ),
        body: Center(
          child: Text('Hello World', style: TextStyle(
            fontWeight: FontWeight.bold,
            letterSpacing: 1.2
          )),
        ),
      )
    );
    
  } 
  
}


