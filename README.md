Occas.io
========

Website for domain experts

## Overview

* Atomic design
* Adopted Webpack for module bundler

## Main Libraries

* react
* react-helmet
* react-router
* react-redux
* react-redux-router
* redux-saga
* nodejs

## Tasks

You can perform some original utility tasks.

| Command                                                | Description                                             |
|:-------------------------------------------------------|:--------------------------------------------------------|
| `$ ./tasks/make-component-skeleton <type> <component>` | Make dumb component. (detail: `--help`)                 |
| `$ ./tasks/make-container-skeleton <type> <component>` | Make smart component. (detail: `--help`)                |
| `$ ./tasks/update-component-exports`                   | Create an index corresponding to the current component. |



## Boilerplate structure

```bash
$ tree -I node_modules -L 2
.
├── flow-typed              # Flowtyped definition files (third party)
├── package.json            # Dependencies definition
├── server.js               # HMR Server
├── src                     # Sources
│   ├── actions            # Redux actions
│   ├── clients            # API management (axios, fetch, ...)
│   ├── components         # React presentational components (atoms, molecules, organisms, template, pages)
│   ├── constants          # Application config
│   ├── containers         # Redux container component
│   ├── declares           # Third party type definition files
│   ├── entry.js           # Entrypoint
│   ├── layouts            # Core layout component
│   ├── reducers           # Redux reducers
│   ├── routes.js          # Routing config
│   ├── sagas              # redux-saga
│   ├── store              # Redux store
│   ├── styles             # Core styles (`.css`)
│   └── types              # Original type definition files
├── static                  # Static files. It will be copied to dist`
├── styleguide              # Styleguide config & template files
├── styleguide.config.js    # Styleguidist configure
├── tasks                   # Some tasks
│   ├── constants          # Task config
│   ├── skeletons          # Skeleton templates
├── test
│   ├── fixtures
│   ├── reducers
│   ├── sagas
│   └── services
├── webpack.config.js
└── yarn.lock
```



## License

The code in this repo is licensed under the Apache 2.0 License.
See [LICENSE.txt](LICENSE.txt) for more info.