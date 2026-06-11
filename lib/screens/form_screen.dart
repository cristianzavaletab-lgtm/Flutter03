import 'package:flutter/material.dart';

class FormScreen extends StatefulWidget {
   
  const FormScreen({super.key});

  @override
  State<FormScreen> createState() => _FormScreenState();
}

class _FormScreenState extends State<FormScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nueva Empresa'),
      ),
      body: Form(
        child: ListView(
          children: [
            TextFormField(
              decoration: InputDecoration(labelText: "Nombre"),
              validator:(value) => null,
              ),
            SizedBox(height: 15),
            TextFormField(
              decoration: InputDecoration(labelText: "RUC"),
              validator:(value) => null,
              ),
            SizedBox(height: 15),
            TextFormField(
              decoration: InputDecoration(labelText: "Direccion"),
              validator:(value) => null,
              ),
            SizedBox(height: 15),
            TextFormField(
              decoration: InputDecoration(labelText: "Rubro"),
              validator:(value) => null,
              ),
            SizedBox(height: 25),
            ElevatedButton(
              onPressed: (){}, 
              child: Text('Guardar')
              )            
          ],
        )
        )
    );
  }
}