import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  http = inject(HttpClient);

  apiUrl = 'http://localhost:8081/api/clientes';

  clientes = signal<any[]>([]);

  mensagem = signal<string>('');

  pagina: number = 1;
  
  formCadastro = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    telefone : new FormControl(''),
    tipo : new FormControl('')
  });

  formEdicao = new FormGroup({
    id : new FormControl(''),
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

    const form = this.formCadastro.value;

      this.http.post(this.apiUrl + '/criar', form, {responseType: 'text'})
        .subscribe((response) => {
          this.mensagem.set(response);
          this.formCadastro.reset();
          this.ngOnInit();
        });
  }

  excluir(id: number) {

    if(confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.http.delete(this.apiUrl + '/excluir/' + id, { responseType : 'text' })
        .subscribe((response) => {
          this.mensagem.set(response);
          this.ngOnInit();
        });
    }
  }

  obterDados(id : number) {

    this.formEdicao.reset();

    this.http.get(this.apiUrl + '/obter/' + id)
      .subscribe((Response: any) => {

        this.formEdicao.patchValue({
          id : Response.id,
          nome : Response.nome,
          email : Response.email,
          telefone : Response.telefone,
          tipo : Response.tipo
        });

      });
  }

  atualizar() {
    const id = this.formEdicao.value.id;

    this.http.put(this.apiUrl + "/atualizar/" + id, this.formEdicao.value, { responseType : 'text' })
      .subscribe((response) => {
        this.mensagem.set(response);
        this.ngOnInit();
      });
  }

  pageChange(event: any) {
    this.pagina = event;
  }
  
}
