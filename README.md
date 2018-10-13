# moac-faucet

An Moac faucet with a express frontend. Works on any network you configure (and fund the faucet account of course).

* v1.1.4 Update wording.
* v1.1.2 Remove useless code.
* v1.1.0 Add sendto account validation and amount positive check, show hash after send coins.
  Show trans hash at screen when done.
* v1.0.0 First available version.

# prerequisites

- A running Moac node with RPC-JSON enabled.

# installing

```
npm install moac-faucet
```

Modify the config file ```config.json```

```
{
  "vnodeDatadir": "D:\\nuwa-vnode1.0.2.win\\moacnode",
  "vnodeRpcAddr": "http://localhost:8545",
  "testnetExplorerUrl": "http://testnet.moac.io:3000/tx/",
  "PORT": 3000,
  "fromAddress": "0x83D6bCcD4a08082F0a46A73BF3d1e314147eC94E",
  "password": "123456",
  "maxSend": 20
}
```

Start your faucet:

```
node app.js
```
## Explorer support
google & firefox are supported, Internet Explorer is not supported

## HTTP Return / error codes

* ```200``` : Request OK
* ```500``` : Internal faucet error











