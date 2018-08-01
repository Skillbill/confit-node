# Confit client
##  Install
Using npm:
```bash
npm install --save confit-client
```
Using cdn:
```html
<script src="https://unpkg.com/confit-client/dist/confit-client.iife.min.js"></script>
<script>
  // now a Confit object is accessible:
  Confit.load({...}).then(...);
</script>
```
## Usage
```js
Confit = require('confit-client')
```
Load a public configuration from alias:
```js
Confit.load({
  repoId: '178474a9-360e-4299-a2e1-e8ae284ce909',
  alias: 'test.site.com-fe'
}).then(configuration => {
  console.log(configuration);
});
```
Load a private configuration from path:
```js
Confit.load({
  repoId: '178474a9-360e-4299-a2e1-e8ae284ce909',
  repoSecret : 'f18d2da0-5a38-4b2f-8a05-c021cfe48821',
  path: 'test/be.json'
}).then(configuration => {
  console.log(configuration);
});
```
### Instance
It is also possible to create a reusable instance with your defaults to load multiple files:
```js
const Confit = require('confit-client')

const confit = Confit.create({
  repoId : '178474a9-360e-4299-a2e1-e8ae284ce909', 
  repoSecret : 'f18d2da0-5a38-4b2f-8a05-c021cfe48821'
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
