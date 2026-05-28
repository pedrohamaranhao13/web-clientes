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

  apiUrl = 'http://localhost:8081/api/clientes';

  clientes = signal<any[]>([]);
  
  formulario = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    telefone : new FormControl(''),
    tipo : new FormControl('')
  });

  ngOnInit() {
    this.http.get(this.apiUrl + '/consultar')
      .subscribe((response) => {
        this.clientes.set(response as any[]);
      });
  }

  cadastrar() {

    const form = this.formulario.value;

      this.http.post(this.apiUrl + '/criar', form, {responseType: 'text'})
        .subscribe((response) => {
          alert(response);
          this.formulario.reset();
          this.ngOnInit();
        });
  }
  
}
