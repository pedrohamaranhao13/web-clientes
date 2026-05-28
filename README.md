# 🌐 Web Clientes

> Frontend Angular para o sistema de gerenciamento de clientes, integrado à API REST Java.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Funcionalidades](#-funcionalidades)
- [Arquivos Principais](#-arquivos-principais)
- [Integração com a API](#-integração-com-a-api)
- [Conceitos Aprendidos](#-conceitos-aprendidos)
- [Próximos Passos](#-próximos-passos)

---

## 🛠 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Angular | 19+ | Framework frontend |
| TypeScript | — | Linguagem principal |
| Bootstrap | 5 | Estilização e layout |
| HttpClient | — | Chamadas HTTP para a API |
| Reactive Forms | — | Gerenciamento do formulário |

---

## 📁 Estrutura do Projeto

```
web-clientes/
│
├── src/
│   ├── app/
│   │   ├── app.ts           # Componente principal (lógica + signal + ngOnInit)
│   │   ├── app.html         # Template: formulário + tabela em 2 colunas
│   │   ├── app.css          # Estilos do componente
│   │   ├── app.config.ts    # Providers globais (HttpClient, Router)
│   │   └── app.routes.ts    # Rotas da aplicação
│   │
│   ├── styles.css           # Estilos globais
│   ├── main.ts              # Bootstrap da aplicação
│   └── index.html           # HTML raiz
│
├── angular.json             # Bootstrap CSS incluído nos styles
├── package.json             # Dependências do projeto
└── tsconfig.json            # Configuração do TypeScript
```

---

## ▶️ Como Executar

**Pré-requisitos:** Node.js, npm e Angular CLI instalados.

```bash
# Instalar o Angular CLI globalmente (se ainda não tiver)
npm install -g @angular/cli

# Entrar na pasta do projeto
cd web-clientes

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
ng serve -o
```

- Aplicação: `http://localhost:4200`

> ⚠️ A **API Java** precisa estar rodando em `http://localhost:8081` para o sistema funcionar.

---

## ✅ Funcionalidades

- **Cadastro** de clientes via formulário (nome, e-mail, telefone, tipo)
- **Listagem** automática dos clientes ativos em tabela com atualização em tempo real
- **Contagem** de clientes no rodapé da tabela
- Botões de **Editar** e **Excluir** na tabela (a implementar nas próximas aulas)
- Limpeza automática do formulário e atualização da tabela após cadastro

---

## 📄 Arquivos Principais

### `app.ts` — Componente Principal

```typescript
export class App {

  http = inject(HttpClient);

  apiUrl = 'http://localhost:8081/api/clientes';

  // Signal: lista reativa de clientes
  clientes = signal<any[]>([]);

  // FormGroup: campos do formulário
  formulario = new FormGroup({
    nome:     new FormControl(''),
    email:    new FormControl(''),
    telefone: new FormControl(''),
    tipo:     new FormControl('')
  });

  // Carrega a lista ao iniciar o componente
  ngOnInit() {
    this.http.get(this.apiUrl + '/consultar')
      .subscribe((response) => {
        this.clientes.set(response as any[]);
      });
  }

  // Envia o formulário como JSON e recarrega a lista
  cadastrar() {
    const form = this.formulario.value;
    this.http.post(this.apiUrl + '/criar', form, { responseType: 'text' })
      .subscribe((response) => {
        alert(response);
        this.formulario.reset();
        this.ngOnInit();
      });
  }
}
```

### `app.html` — Template

Layout em duas colunas com Bootstrap Grid:

```
| col-md-3 (formulário) | col-md-9 (tabela de clientes) |
```

**Tabela com `@for`:**
```html
@for(c of clientes(); track c.id) {
  <tr>
    <td>{{ c.nome }}</td>
    <td>{{ c.email }}</td>
    <td>{{ c.telefone }}</td>
    <td>{{ c.tipo }}</td>
    <td>
      <button class="btn btn-sm btn-outline-primary">Editar</button>
      <button class="btn btn-sm btn-outline-danger">Excluir</button>
    </td>
  </tr>
}
```

**Rodapé dinâmico:**
```html
<td colspan="5">Quantidade de clientes: {{ clientes().length }}</td>
```

### `app.config.ts` — Providers Globais

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

---

## 🔗 Integração com a API

| Ação | Método | Endpoint |
|---|---|---|
| Listar clientes | `GET` | `/api/clientes/consultar` |
| Cadastrar cliente | `POST` | `/api/clientes/criar` |
| Editar cliente *(em breve)* | `PUT` | `/api/clientes/atualizar/{id}` |
| Excluir cliente *(em breve)* | `DELETE` | `/api/clientes/excluir/{id}` |

Os dados do formulário são enviados como **JSON no corpo** do POST:
```typescript
this.http.post(url + '/criar', form, { responseType: 'text' })
```

---

## 📚 Conceitos Aprendidos

- **Angular CLI** — `ng new`, `ng serve` para criar e servir o projeto
- **Componente Standalone** — sem NgModule, imports direto no `@Component`
- **Reactive Forms** — `FormGroup` / `FormControl` para gerenciar o formulário
- **`inject()`** — injeção de dependência moderna (Angular 14+), sem construtor
- **`signal<T>()`** — primitiva de reatividade do Angular 16+; atualiza a UI automaticamente
- **`signal.set()`** — atualiza o valor do signal e re-renderiza os consumidores
- **`clientes()`** — signals são lidos como funções (com parênteses)
- **`ngOnInit()`** — hook de ciclo de vida chamado na inicialização do componente
- **`@for(item of lista; track item.id)`** — diretiva de fluxo do Angular 17+ para listas
- **`HttpClient.get() / post()`** — requisições HTTP; retornam Observables
- **`.subscribe()`** — executa o Observable e processa a resposta
- **JSON body no POST** — passar o objeto diretamente serializa para JSON automaticamente
- **Bootstrap Grid** — `row`, `col-md-3`, `col-md-9` para layout responsivo em colunas
- **Bootstrap Table** — `table-striped`, `table-hover`, `table-sm` para tabelas estilizadas
- **CORS** — configuração no backend para aceitar requisições do Angular

---


*Pham Tecnologia · Fullstack Java —*