import 'package:flutter/material.dart';

class DetailScreen extends StatelessWidget {
   
  const DetailScreen({super.key});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Detalle de la Empresa'),
      ),
      body: Card(
        child: Column(
          children: [
            Text('Nombre de la Empresa'),
            SizedBox(height: 10),
            Text('RUC:'),
            SizedBox(height: 10),
            Text('Direccion:'),
            SizedBox(height: 10),
            Text('Rubro:'),
            SizedBox(height: 20),
            Row(
              children: [
                ElevatedButton.icon(
                  onPressed: (){}, 
                  label: Text('Editar')),
                SizedBox(width: 10),
                ElevatedButton.icon(
                  onPressed: (){}, 
                  label: Text('Eliminar'))
              ],
            )
          ],
        ),
      ),
    );
  }
}