import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-create-usuarios',
  templateUrl: './create-usuarios.component.html',
  styleUrls: ['./create-usuarios.component.css']
})
export class CreateUsuariosComponent implements OnInit {
  createUsuario:FormGroup;
  submitted = false;/**error form */
  loading = false; /*Spinner */
  id:string | null;/*Para editar */
  titulo = 'Agregar Usuario';

  constructor(private fb:FormBuilder,
    private _usuarioService:UsuarioService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute:ActivatedRoute) { 
      this.createUsuario = this.fb.group({
        nombre:["",Validators.required],
        apellido:["",Validators.required],
        documento:["",Validators.required],
        direccion:["",Validators.required]
      })
      this.id= this.aRoute.snapshot.paramMap.get('id');//captura id de url
        //console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarUsuario(){
    this.submitted = true;

    if(this.createUsuario.invalid){
      return;
    }

    if(this.id === null){
      this.agregarUsuario();
    }else{
      this.editarUsuario(this.id);
    }
  }

  
  agregarUsuario(){/** */
    const usuario: any ={
      nombre:this.createUsuario.value.nombre,
      apellido:this.createUsuario.value.apellido,
      documento:this.createUsuario.value.documento,
      direccion:this.createUsuario.value.direccion,
      fechaCreacion:new Date(),
      fechaActualización:new Date()
    }
    this.loading = true;
    this._usuarioService.agregarUsuario(usuario).then(()=>{
      this.toastr.success('El registro fue guardado con exito!', 'Usuario registrado!',
      {positionClass:'toast-bottom-right'});
      this.loading = false;
      this.router.navigate(['/list-usuarios'])
    }).catch(error =>{
      console.log(error);
      this.loading =false;
    })    
  }
  
  editarUsuario(id:string){
    const usuario: any ={
      nombre:this.createUsuario.value.nombre,
      apellido:this.createUsuario.value.apellido,
      documento:this.createUsuario.value.documento,
      direccion:this.createUsuario.value.direccion,
      fechaActualización:new Date()
    }

    this.loading = true;
    this._usuarioService.actualizarUsuario(id, usuario).then(()=>{
      this.loading = false;
      this.toastr.info('El usuario fue modificado con exito', 'Usuario Modificado',{
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-usuarios']);
    });
  }

  esEditar(){
    if(this.id !== null){
        this.loading=false;
        this.titulo = 'Editar Usuario';
        this._usuarioService.getUsuario(this.id).subscribe(data=>{
           // console.log(data);
            //console.log(data.payload.data()["nombre"]);

            this.createUsuario.setValue({
              nombre:data.payload.data()["nombre"],
              apellido:data.payload.data()["apellido"],
              documento:data.payload.data()["documento"],
              direccion:data.payload.data()["direccion"],
            })
        })
    }
  }

}
