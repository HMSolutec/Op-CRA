# Op-CRA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Architecture choices

### State Management
  
  Almost all state management is done through [ngRx's Signal Store](https://ngrx.io/guide/signals/signal-store), a store was created for each model that can be queried from the API, the goal is to be able to easily tell which type of data is being loaded and wheter or not there was an error.
  For input, output and model management only signals are used to prepare for a migration to zoneless Angular

### API Calls Management

  API calls are done through [Axios](https://www.npmjs.com/package/axios), an instance containing the baseUrl and other parameters like interceptors... can be found at `src/api/index.ts`.
  For each data type that is queryable through the API an "endpoint" must be created, it's an abstract class contained inside the `endpoint` directory where each static method represents an API call.
  All API calls must be done through endpoints.

  Side note: If the need for local storage or caching arises, it might useful to create repositories to handle different data sources.

### Data Management

  Data management must be done by creating first a `model` which is an interface representing a raw JSON object received from the API. This interface must then be passed to a `DTO` class through a factory method called `fromJSON` to obtain an object that's easier to work with. For example your DTO could be used to convert unix timestamp to `Moment` instances.

### Date Management

  [MomentJS](https://momentjs.com) is used to manipulate dates and times. Try to use it as much as possible as it makes manipulating and formatting data much easier down the line.

### Styling

  [TailwindCss](https://tailwindcss.com) is used for styling. the keyword `@apply` can be used inside CSS files to apply tailwindcss utility classes.
