# Confit client
##  Install
```bash
npm install --save confit-client
```

## Usage
```js
confit = require('confit-client')
```
Load a public configuration from alias:
```js
confit.load({
  repoId: 'dsjdjlasjdla',
  alias: 'test.site.com-fe'
}).then(configuration => {
  console.log(configuration);
});
```
Load a private configuration from path:
```js
confit.load({
  repoId: 'dsjdjlasjdla',
  repoSecret : 'kasjdjasdkl',
  path: 'test/be.json'
}).then(configuration => {
  console.log(configuration);
});
```
### Instance
It is also possible to create a reusable instance with your defaults to load multiple files:
```js
const confit = require('confit-client')

const instance = confit.create({
  repoId : 'dsjdjlasjdla', 
  repoSecret : 'kasjdjasdkl'
});

confit.load({
  path: 'globals.json'
}).then(globals => {
  console.log(globals);
});

confit.load({
  alias: 'be-conf'
}).then(configuration => {
  console.log(configuration);
});
```