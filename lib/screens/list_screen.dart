import 'package:crud_withnodejs/providers/empresa_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ListScreen extends StatefulWidget {
   
  const ListScreen({super.key});

  @override
  State<ListScreen> createState() => _ListScreenState();
}

class _ListScreenState extends State<ListScreen> {
  @override
  void initState(){
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_){
      Provider.of<EmpresaProvider>(context, listen: false).load();
    });
  }

  Future<void> _confirmDelete(BuildContext context, int id, String nombre) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Confirmacion de Eliminacion'),
        content: Text('¿Estás seguro que deseas eliminar "$nombre"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx,false) , 
            child: Text('Cancelar')
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx,true), 
            child: Text('Eliminar', style: TextStyle(color: Colors.red),))
        ],
      )
    );
  }


  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Empresas', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: ListView.builder(
        itemBuilder:(context, index) {
          return Card(
            child: ListTile(
              title: Text('Nombre de Empresa'),
              subtitle: Text('RUC: 2039949500923'),
              trailing: Row(
                children: [
                  IconButton(
                    onPressed: (){}, 
                    icon: Icon(Icons.edit)),
                  IconButton(
                    onPressed: (){}, 
                    icon: Icon(Icons.delete))
                ]
              ),
            ),
          );
        },
        )
    );
  }
}