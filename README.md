# noi
Network of interests

## Install
```bash
npm i noi --save
```

## Usage
```javascript
const {
    Network,
    User
} = require('@magicfun1241/noi');

const net = new Network({
    sport: 'number',
    design: 'number',
    programing: 'number'
});

net.add(new User({
    sport: 1,
    design: 5,
    programing: 5
}), 'alice');

net.add(new User({
    sport: 3,
    design: 5,
    programing: 1
}), 'bob');

console.log(net.compare('alice', 'bob'));
```

## License
MIT