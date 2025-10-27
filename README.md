# 🌍 Eko Front

Este proyecto es una aplicación web construida con **Angular** y desplegada en **Netlify** o usando **Docker**.

### Arquitectura de modulos orientada a servicios (MVVM). 

> [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## 📦 Tecnologías utilizadas
- [Angular 20 (sin ZoneJs)](https://angular.dev/) - Framework frontend
- [Docker](https://www.docker.com/) - Contenerización
- [Nginx](https://nginx.org/) - Servidor web para producción
- [Node.js 22.20.0](https://nodejs.org/) - Entorno de construcción

---

## 🌐 App Desplegada
Despliegue realizado en netlify
* [Inicio](https://ekos-front.netlify.app)


## 🚀 Instalación local

Clonar el repositorio:
```bash
git clone https://github.com/Drakoxw/ekos-front.git
cd ekos-front
```

Instalar dependencias e iniciar app
```sh
npm install
npm start
```

> [http://localhost:4200](http://localhost:4200) en el navegador

## 🐳 Construcción con Docker

#### Compose
Crear el contenedor e iniciarlo
```sh
docker-compose up --build -d    
```

#### Manual

Crear el contenedor e iniciarlo
```sh
docker build -t front-opa-app .
```
```sh
docker run -p 4000:80 front-opa-app
```
> Abre el navegador: [http://127.0.0.1:4000](http://127.0.0.1:4000)


## Correr pruebas unitarias
```bash
ng test
```

## Correr pruebas end-to-end 

```bash
ng e2e
```

Show Report (e2e)
```bash
npx playwright show-report
```

## 🧠 Preguntas Técnicas

> 1. ¿Cómo estructurarías una aplicación Angular grande para mantenerla escalable y mantenible?

Organizar el proyecto por dominios o features (modules/feature-name), utilizando modulos independientes, lazy loading, componentes standalone y servicios bien encapsulados. Además, mantendria una carpeta shared para componentes, utils, pipes, etc reutilizables y una core para servicios o datos globales.

> 2. ¿Qué ventajas aporta NgRx frente a un manejo de estado tradicional?

NgRx ofrece un flujo de datos controlado basado en principios de Redux, facilitando el debugging, la trazabilidad de acciones y la sincronización del estado global. Mejora la escalabilidad al centralizar la lógica y simplifica las pruebas unitarias.

> 3. ¿Qué prácticas aplicarías para optimizar el rendimiento de una aplicación Angular?

Usaría Angular 20, eliminar el zoneJs, lazy loading de módulos, trackBy en listas, referrer y signals para gestión eficiente del estado local. También reduciría dependencias/libreria pesadas o innecesarias y si es necesario activaria precompilación avanzada de angular.

> 4. ¿Cómo integrarías el proceso de CI/CD en un proyecto Angular?

Configurar docker para pipelines (GitHub Actions, GitLab CI, Kubernetes, Jenkis) para ejecutar pruebas, análisis de estáticos (ESLint, sonarQube), compilación de producción y despliegue automático. Garantizando calidad continua y entrega ágil de valor.


## 👤 Autor

### Wilmar RM (Drako)

* 📧 drakowdev@gmail.com
* 🌐 [linkedin](https://www.linkedin.com/in/wilmar-roncancio-mendez-b344761bb/)
* 📱[+57 310 801 83888](https://wa.me/573108018388)
