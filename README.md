# basic_frontend
Basic front-end architecture (Angular 10)

Stages of creating a structure:

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
