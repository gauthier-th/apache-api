# Apache API
A simple Apache wrapper for Node.js.

# API Reference

## Initialization
You can itialize the API with a special Apache path:
```js
const apacheApi = require('apache-api')('/usr/share/apache2/');
```
Or with the default one (`/etc/apache2/`):
```js
const apacheApi = require('apache-api');
```

## Parser
Functions to parse and serialize an Apache configuration file.
```js
const { parser } = require('apache-api');
```

### parser.parse(content, [skipComments]):  `object`
Parse an Apache configuration file.
| Param | Type | Description |
| --- | --- | --- |
| content | `string` | Apache configuration file to parse |
| [skipComments] | `boolean` | Wether ignore comments. Default: `false` |

### parser.serialize(content, [ident], [extendedSpaces]):  `string`
Serialize an Apache configuration file.
| Param | Type | Description |
| --- | --- | --- |
| content | `object` | Configuration object to serialize |
| [ident] | `string` | Indent type. Default: two space |
| [extendedSpaces] | `boolean` | Add more line returns between instructions. Default: `false` |

## Actions
Show Apache status, start, stop, and restart Apache service with systemctl.
```js
const { actions } = require('apache-api');
```

### actions.start():  `Promise<any>`
Start Apache service.

### actions.stop():  `Promise<any>`
Stop Apache service.
### actions.restart():  `Promise<any>`
Restart Apache service.

### actions.status():  `Promise<string>`
Returns a promise with the Apache service status.

## Mods
```js
const { mods } = require('apache-api');
```

### mods.listAvailable():  `Promise<string[]>`
Show available Apache mods.

### mods.listEnabled():  `Promise<string[]>`
Show enabled Apache mods.

### mods.enable(mod):  `Promise<any>`
Enable an Apache mod.
| Param | Type | Description |
| --- | --- | --- |
| mod| `string` | Mod to enable |

### mods.disable(mod):  `Promise<any>`
Disable an Apache mod.
| Param | Type | Description |
| --- | --- | --- |
| mod| `string` | Mod to disable |

## Configs
```js
const { configs } = require('apache-api');
```

### configs.listAvailable([sites]):  `Promise<string[]>`
Show available Apache configs.
| Param | Type | Description |
| --- | --- | --- |
| sites | `boolean` | Wether to list sites folder |

### configs.listEnabled([sites]):  `Promise<string[]>`
Show enabled Apache configs.
| Param | Type | Description |
| --- | --- | --- |
| sites | `boolean` | Wether to list sites folder |

### configs.enable(config, [sites]):  `Promise<any>`
Enable an Apache config.
| Param | Type | Description |
| --- | --- | --- |
| config | `string` | Config to enable |
| sites | `boolean` | Wether to enable sites folder |

### configs.disable(config, [sites]):  `Promise<any>`
Disable an Apache config.
| Param | Type | Description |
| --- | --- | --- |
| config | `string` | Config to disable |
| sites | `boolean` | Wether to disable sites folder |

### configs.readConfig(config, [sites], [parseContent]):  <code>Promise<object&#124;string></code>
Read and parse (optional) a config.
| Param | Type | Description |
| --- | --- | --- |
| config | `string` | Config to read |
| sites | `boolean` | Wether to use sites folder |
| parseContent | `boolean` | Wether to parse content |

### configs.saveConfig(config, [sites], [fromParsed]):  `Promise<any>`
Parse (optional) and save a config.
| Param | Type | Description |
| --- | --- | --- |
| config | <code>object&#124;string</code> | Config to save |
| sites | `boolean` | Wether to use sites folder |
| fromParsed | `boolean` | Wether to parse content |
