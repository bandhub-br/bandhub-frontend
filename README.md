# 🎸 BandHub Frontend – Arquitetura e Organização do Projeto

Este documento descreve **como o frontend do BandHub está organizado**, quais padrões usamos e como novos componentes devem ser criados.

O objetivo é manter o projeto **simples para desenvolvedores iniciantes**, mas **organizado o suficiente para escalar** conforme o sistema cresce.

---

## 📌 Sobre o BandHub

O **BandHub** é uma inovadora rede social musical desenhada para conectar de forma orgânica bandas, músicos independentes, produtores e os fãs apaixonados por música. A plataforma preza por uma experiência premium, imersiva e com forte identidade visual em todos os dispositivos.

---

## 🚀 Como rodar o projeto localmente

### 1. Requisitos Prévios
Certifique-se de ter o **Node.js** instalado (versão recomendada: `22.20.0` ou superior) e que fará o uso do **Angular CLI**.

### 2. Instalação de Dependências
No terminal, certifique-se de estar na pasta do projeto e rode o comando:
```bash
npm install
```

### 3. Servidor de Desenvolvimento
Para inicializar o modo de desenvolvimento com hot-reload (recarregamento automático):
```bash
npm run start
# ou
ng serve
```
Em seguida, abra `http://localhost:4200/` em seu navegador.

### 4. Build para Produção
Crie uma build otimizada para ser publicada ou feito o deploy:
```bash
npm run build
# ou
ng build
```
O framework criará a aplicação compilada na pasta `dist/`.

---

# 💻 Stack utilizada e Decisões Técnicas

* **Angular 19** - Framework robusto em sua versão mais recente fornecendo excelente performance através das novas control flows.
* **Node 22.20.0**
* **Angular CLI 19**
* **Standalone components** - Dispensamos os tradicionais `NgModules` complexos. Facilita o aprendizado e carrega apenas o estritamente necessário por componente.
* **CSS nativo / padrão** - Optamos por não sobrecarregar no início com frameworks extras para manter máximo controle estético, criando designs autênticos e fluidos baseados no "Dark Theme".

---

## 🎨 Diretrizes de Estilo Visual (UI/UX)

Para manter a consistência da interface gráfica da plataforma BandHub:
- **Prioridade Dark Mode**: Utilize paletas noturnas ricas. Exemplo: fundos globais e contornos com tons de chumbo/preto (`#0f1115`, `#18191c`, `#2f3336`), em contraste com coloração clara das fontes (`#e4e6eb`, `#ffffff`).
- **Layouts Desacoplados e Fluidos**: Todo componente precisa suportar quebras de layout usando Media Queries (`@media max-width: 900px` / `600px`, por exemplo).
- **Sensação Premium**: Introduza delicadas estilizações como transições (`transition: 0.2s ease`), mudanças de cor em interações (`:hover`, `:focus`), cantos semi-arredondados generosos e leves sombreamentos.

---

# Estrutura geral do projeto

```
src/app
├─ core
│  ├─ guards
│  ├─ interceptors
│  ├─ layout
│  └─ services
│
├─ shared
│  ├─ components
│  ├─ models
│  └─ utils
│
├─ features
│  ├─ home
│  ├─ auth
│  ├─ dashboard
│  ├─ bands
│  ├─ events
│  ├─ notifications
│  └─ profile
```

---

# Conceito de cada pasta

## core

Contém funcionalidades **globais da aplicação**.

Nada aqui deve depender de features específicas.

Exemplos:

```
core
├─ guards
│  └─ auth.guard.ts
│
├─ interceptors
│  └─ auth.interceptor.ts
│
├─ layout
│  ├─ navbar
│  └─ footer
│
└─ services
   └─ api-base.service.ts
```

Aqui ficam coisas como:

* autenticação global
* interceptação de HTTP
* layout da aplicação
* serviços base

---

## shared

Contém **componentes reutilizáveis**.

Qualquer coisa que **pode ser usada em mais de uma feature** deve ficar aqui.

Exemplo:

```
shared
├─ components
│  ├─ button
│  ├─ modal
│  ├─ card
│  └─ loading-spinner
│
├─ models
│  ├─ band.model.ts
│  └─ event.model.ts
│
└─ utils
   └─ date.utils.ts
```

---

## features

Contém **as funcionalidades reais do sistema**.

Cada pasta representa uma **parte do domínio da aplicação**.

Exemplo:

```
features
├─ home
├─ auth
├─ dashboard
├─ bands
├─ events
├─ notifications
└─ profile
```

---

# Features do BandHub

## home

Página pública inicial da aplicação.

Exemplo de conteúdo:

* apresentação da plataforma
* botão de login
* botão de cadastro

---

## auth

Funcionalidades de autenticação.

Exemplos:

```
features/auth
├─ pages
│  ├─ login
│  └─ register
│
├─ services
│  └─ auth-api.service.ts
```

---

## dashboard

Página principal **do usuário autenticado**.

Aqui o usuário pode ver:

* bandas que segue
* próximos eventos
* novidades

---

## bands

Tudo relacionado às bandas.

Exemplo:

```
features/bands
├─ pages
│  ├─ band-list
│  ├─ band-details
│  └─ create-band
│
├─ components
│  ├─ band-card
│  └─ band-form
│
└─ services
   └─ bands-api.service.ts
```

---

## events

Eventos e shows das bandas.

Exemplo:

```
features/events
├─ pages
│  ├─ event-list
│  └─ event-details
│
├─ components
│  └─ event-card
│
└─ services
   └─ events-api.service.ts
```

---

## notifications

Sistema de notificações.

Exemplo:

```
features/notifications
├─ pages
│  └─ notifications
│
├─ components
│  └─ notification-item
│
└─ services
   └─ notifications-api.service.ts
```

---

## profile

Área do usuário.

Exemplo:

```
features/profile
├─ pages
│  ├─ profile
│  └─ settings
│
└─ services
   └─ profile-api.service.ts
```

---

# Criação de componentes

Neste projeto **não usamos componentes inline**.

Ou seja, **não usamos arquivos `.page.ts` com template embutido**.

Sempre utilizamos o padrão gerado pelo Angular CLI.

Cada componente terá:

```
component-name.component.ts
component-name.component.html
component-name.component.css
```

---

# Padrão para criação de componentes

Sempre usar o Angular CLI:

```
ng g c nome-do-componente
```

Exemplo:

```
ng g c features/bands/components/band-card
```

Isso irá gerar:

```
band-card.component.ts
band-card.component.html
band-card.component.css
band-card.component.spec.ts
```

---

# Padrão para criação de páginas

Páginas também são **componentes Angular normais**, apenas organizadas dentro da pasta `pages`.

Exemplo:

```
ng g c features/bands/pages/band-details
```

Estrutura gerada:

```
band-details
├─ band-details.component.ts
├─ band-details.component.html
├─ band-details.component.css
└─ band-details.component.spec.ts
```

---

# Convenção de nomes

Componentes:

```
band-card.component.ts
event-card.component.ts
notification-item.component.ts
```

Páginas:

```
band-list.component.ts
band-details.component.ts
login.component.ts
dashboard.component.ts
```

---

# Regras do projeto

## 1️⃣ Não usar template inline

Evitar:

```
template: `...`
```

Sempre usar:

```
templateUrl
styleUrls
```

---

## 2️⃣ Usar Angular CLI para gerar componentes

Sempre:

```
ng g c
```

Nunca criar arquivos manualmente.

---

## 3️⃣ Separar lógica por feature

Componentes relacionados a uma funcionalidade devem ficar **dentro da própria feature**.

---

## 4️⃣ Componentes reutilizáveis vão para shared

Se um componente pode ser usado em várias áreas da aplicação, ele deve ir para:

```
shared/components
```

---

# Exemplo completo de estrutura

```
src/app
├─ core
│  ├─ guards
│  ├─ interceptors
│  ├─ layout
│  └─ services
│
├─ shared
│  ├─ components
│  │  ├─ button
│  │  ├─ modal
│  │  └─ card
│  │
│  ├─ models
│  └─ utils
│
├─ features
│  ├─ home
│  ├─ auth
│  ├─ dashboard
│  ├─ bands
│  ├─ events
│  ├─ notifications
│  └─ profile
```

---

# Objetivo dessa arquitetura

Esta organização permite:

* código **mais organizado**
* **isolamento por funcionalidade**
* facilidade para novos desenvolvedores entrarem no projeto
* crescimento do sistema sem virar um monólito de componentes
* reutilização adequada de código

---

# Regra principal

Se algo pertence a uma funcionalidade específica → **fica na feature**.

Se algo pode ser reutilizado em várias partes → **vai para shared**.

---

# 🧪 Boas Práticas e Orientações Essenciais

* **Sempre utilize o CLI**: Utilize o comando do **Angular CLI** para a criação de componentes, garantindo assim que a geração dos arquivos estruturais (incluindo o arquivo `.spec.ts` para testes) obedeça os padrões internos adotados.
* **Reaproveitamento Constante**: Antes de desenvolver um recurso (como um botão, loading, input, etc.) do zero, avalie se a pasta `shared/components` já não acomoda o necessário.
* **Consistência visual e de código**: Ao ter dúvida em qual estrutura adotar, não hesite em estudar um componente já escrito (como as implementações iniciais em `features/dashboard`) ou re-leia as seções acima deste guia para refrescar a arquitetura ideal.

---
🤘 *Desenvolvido para criar pontes e conectar a paixão pela música à tecnologia!*
