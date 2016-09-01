# seconds2timecode

Convert time in seconds to a formatted timecode string.

## Install

```shell
npm install seconds2timecode
```

## Useage

```javascript
var seconds2timecode = require('seconds2timecode');
console.log(seconds2timecode(19))
// 00:00:19

console.log(seconds2timecode(19, 1))
// 0:19

console.log(seconds2timecode(19, 2))
// 00:19

```