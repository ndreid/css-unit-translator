# css-unit-translator

Translates between CSS Units

## Installation

```sh
npm install css-unit-translator
```

## Usage

```js
import CSSUnitTranslator from 'css-unit-translator'

let translator = new CSSUnitTranslator()

translator.translate('10rem', 'px') //160px
translator.translate('3cm', 'in', 3) //1.181
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
