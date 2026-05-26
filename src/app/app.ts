import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  http = inject(HttpClient);
  
  formulario = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    telefone : new FormControl(''),
    tipo : new FormControl('')
  });

  cadastrar() {

    const form = this.formulario.value;

    const params = new HttpParams()
      .set('nome', form.nome!)
      .set('email', form.email!)
      .set('telefone', form.telefone!)
      .set('tipo', form.tipo!)

      this.http.post('http://localhost:8080/api/clientes/criar', null, { params: params, responseType: 'text'})
        .subscribe((response) => {
          alert(response);
          this.formulario.reset();
        });

    console.log(this.formulario.value);
  }
  
}
