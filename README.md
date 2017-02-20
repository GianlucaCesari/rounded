Rounded
===========

An angular command-line tool to square things up!

## Table of Contents

  1. [Documentation](#documentation)
    1. [Installation](#installation)
    2. [Examples](#examples)
  2. [License](#license)


## Goal and Philosophy

**`Rounded`** is a command line interface for generating [angularJs](https://angularjs.org/) (1.x) controllers from your terminal.

## [Documentation](#documentation)
<a name="documentation"></a>

### Installation
<a name="installation"></a>

``` shell
npm install -g rounded
```

```shell
rounded g <controllerName> [dependencies]
```

<a name="examples"></a>
### Examples (Run it and see it)
``` shell
rounded generate MainController
rounded g MainController \$location \$http
# etc...
```

## License
<a name="license"></a>

Copyright (c) 2017 Gianluca Cesari (twitter: [@giaangices](https://twitter.com/giaangices))
Licensed under the MIT license.
