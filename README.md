# Basic front-end architecture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Stages of creating a structure:

* installing an empty Angular project.
1) creating an empty repository (git init);
2) adding starter libraries (+ -): angular material, translation (ngx-translate core + http-loader);
3) creating a new branch (staging);
4) adding custom environments;
5) adding directives to assets: fonts, i18n, images;
6) adding scss file architecture + connection to angular.json;
7) creating a directory (shared): constants, services, interface, modals, pipes, interceptors;
8) creating a directory (shared-components): navbar, pdf-modal-dialog, progress-spinner, review-dialog;
9) creating the directive components: auth, landing;
10 changing files in the app directory

TODO:
1) fix CircularDependencies for components
2) fix allowedCommonJsDependencies for tslint
