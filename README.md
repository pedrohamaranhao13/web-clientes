# 🌐 Web Clientes

> Frontend Angular para o sistema de gerenciamento de clientes, integrado à **API REST**.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Funcionalidades](#-funcionalidades)
- [Componentes e Arquivos](#-componentes-e-arquivos)
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
│   │   ├── app.ts           # Componente principal (formulário + lógica)
│   │   ├── app.html         # Template HTML do formulário
│   │   ├── app.css          # Estilos do componente
│   │   ├── app.config.ts    # Configuração da aplicação (HttpClient, Router)
│   │   └── app.routes.ts    # Definição de rotas
│   │
│   ├── styles.css           # Estilos globais
│   ├── main.ts              # Bootstrap da aplicação
│   └── index.html           # HTML raiz
│
├── angular.json             # Configuração do Angular CLI
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

A aplicação estará disponível em: `http://localhost:4200`

> ⚠️ A **API Java** precisa estar rodando em `http://localhost:8080` para o cadastro funcionar.

---

## ✅ Funcionalidades

- Formulário para cadastro de clientes com os campos:
  - Nome
  - E-mail
  - Telefone
  - Tipo (Pessoa Física ou Pessoa Jurídica)
- Envio dos dados via `HTTP POST` para a API REST
- Alerta de confirmação após cadastro bem-sucedido
- Limpeza automática do formulário após o envio

---

## 📄 Componentes e Arquivos

### `app.config.ts` — Configuração da Aplicação

Registra os providers globais necessários, incluindo o `HttpClient` para chamadas HTTP:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()   // habilita injeção do HttpClient
  ]
};
```

### `app.html` — Template do Formulário

Usa **Reactive Forms** com diretivas do Angular:

```html
<form [formGroup]="formulario" (ngSubmit)="cadastrar()">
  <input formControlName="nome" />
  <input formControlName="email" />
  ...
</form>
```

| Diretiva | Função |
|---|---|
| `[formGroup]` | Vincula o elemento `<form>` ao `FormGroup` do componente |
| `formControlName` | Vincula cada campo ao seu `FormControl` correspondente |
| `(ngSubmit)` | Chama o método `cadastrar()` ao submeter o formulário |

### `app.ts` — Lógica do Componente

```typescript
export class App {

  http = inject(HttpClient);        // injeta o cliente HTTP

  formulario = new FormGroup({      // define os campos do formulário
    nome:     new FormControl(''),
    email:    new FormControl(''),
    telefone: new FormControl(''),
    tipo:     new FormControl('')
  });

  cadastrar() {
    // monta os parâmetros e chama a API
    const params = new HttpParams()
      .set('nome', form.nome!)
      ...

    this.http.post('http://localhost:8080/api/clientes/criar', null, { params })
      .subscribe(response => {
        alert(response);
        this.formulario.reset();
      });
  }
}
```

### `angular.json` — Bootstrap integrado

O Bootstrap foi adicionado diretamente na lista de estilos globais:

```json
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

---

## 🔗 Integração com a API

O frontend se comunica com a API Java enviando os dados como **query parameters** via `HTTP POST`:

```
POST http://localhost:8080/api/clientes/criar
  ?nome=João Silva
  &email=joao@email.com
  &telefone=21999998888
  &tipo=PESSOA_FISICA
```

### Configuração de CORS (API Java)

Para permitir que o Angular (`localhost:4200`) acesse a API (`localhost:8080`), foi criada a classe `CorsConfiguration` no backend:

```java
@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("POST", "PUT", "DELETE", "GET")
                .allowedHeaders("*");
    }
}
```

> **CORS** (Cross-Origin Resource Sharing) é uma política de segurança do navegador que bloqueia requisições entre origens diferentes. Sem essa configuração, o Angular não conseguiria chamar a API Java.

---

## 📚 Conceitos Aprendidos

- **Angular CLI** — ferramenta para criar, servir e buildar projetos Angular (`ng new`, `ng serve`)
- **Componente standalone** — componente sem `NgModule`, importando dependências diretamente
- **Reactive Forms** — formulários controlados por código TypeScript (`FormGroup`, `FormControl`)
- **HttpClient** — serviço do Angular para fazer requisições HTTP
- **`inject()`** — forma moderna de injetar dependências em Angular (substitui o construtor)
- **`HttpParams`** — classe para construir query strings de forma segura e encadeada
- **`.subscribe()`** — método para "ouvir" o resultado de uma requisição HTTP (Observable)
- **`formulario.reset()`** — limpa todos os campos do formulário após o envio
- **CORS** — política de segurança que exige configuração explícita no backend para aceitar requisições de outras origens
- **Bootstrap via npm** — instalação e inclusão do Bootstrap como dependência do projeto

---

## 🚀 Próximos Passos

- [ ] Listar os clientes cadastrados em uma tabela na mesma página
- [ ] Adicionar validações nos campos (`Validators.required`, `Validators.email`)
- [ ] Exibir mensagens de erro inline no formulário
- [ ] Criar um `Service` dedicado para as chamadas HTTP (`ClienteService`)
- [ ] Implementar roteamento entre páginas (cadastro / listagem)
- [ ] Adicionar feedback visual de carregamento (loading spinner)
- [ ] Tratar erros de rede com `.pipe(catchError(...))`

---

*Pham Tecnologia · Fullstack Java -*
