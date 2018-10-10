# moac-faucet

An Moac faucet with a express frontend. Works on any network you configure (and fund the faucet account of course).

* v1.1.1 Remove useless code.
* v1.1.0 Add sendto account validation and amount positive check, show hash after send coins.
  Show trans hash at screen when done.
* v1.0.0 First available version.

# prerequisites

- A running Moac node with RPC-JSON enabled.

# installing

```
npm install moac-faucet
```

## Configuring the faucet API

Create a lightwallet ```wallet.json```

```
node mkwallet.js test > wallet.json
```

You can change `test` to whatever the password is that you want to encrypt your wallet with.

Modify the config file ```config.json```

```
{
  "vnodeDatadir": "D:\\nuwa-vnode1.0.2.win\\moacnode",
  "vnodeRpcAddr": "http://localhost:8545",
  "PORT": 3000,
  "fromAddress": "0x83D6bCcD4a08082F0a46A73BF3d1e314147eC94E",
  "password": "123456",
  "maxSend": 10
}
```

Start your faucet:

```
node app.js
```

## HTTP Return / error codes

* ```200``` : Request OK
* ```500``` : Internal faucet error











