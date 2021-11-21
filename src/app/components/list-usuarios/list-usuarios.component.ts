import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {
  usuarios:any[] = [];

  constructor(private _usuarioService:UsuarioService,
    private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data =>{
      
      this.usuarios =[];

       data.forEach((element:any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.usuarios.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.usuarios);   
    })
  }

  eliminarUsuario(id:string){
      this._usuarioService.eliminarUsuario(id).then(()=>{
        this.toastr.error('El registro fue eliminado con exito!', 'Usuario Eliminado!',
        {positionClass:'toast-bottom-right'});
  
      }).catch(error => {
        console.log(error);
      })
     
  }

}
