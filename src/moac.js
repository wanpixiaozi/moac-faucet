const BigNumber = require("bignumber.js");
const keythereum = require("keythereum");

var datadir = "D:\\nuwa-vnode1.0.2.win\\moacnode";  //moacnode目录，根据实际修改,改为读取config.json

var Chain3 = require('chain3');
var chain3 = new Chain3(new Chain3.providers.HttpProvider('http://localhost:8545'));

var fromAddress = "0x83D6bCcD4a08082F0a46A73BF3d1e314147eC94E"
var password = "123456";  // 账号密码，根据实际修改
var keyObject = keythereum.importFromFile(fromAddress, datadir);
var fromSecret = keythereum.recover(password, keyObject);        //输出私钥
console.log(fromSecret.toString("hex"));


const factor = new BigNumber(10).exponentiatedBy(18); // decimal for moac

module.exports.sendTx = async (amount, toAddress) => {
  var mc = chain3.mc;

  var txcount = chain3.mc.getTransactionCount(fromAddress);
  console.log("Get tx account", txcount);

  var gasPrice = 25000000000;
  var gasLimit = 100000;
  var value = chain3.toSha(amount, 'mc');
  var gasTotal = gasPrice * gasLimit + Number(value);
  console.log(gasPrice, gasLimit, value, chain3.fromSha(gasTotal, 'mc'));

  var rawTx = {
    from: fromAddress,
    to: toAddress,
    nonce: chain3.intToHex(txcount),
    gasPrice: chain3.intToHex(gasPrice),
    gasLimit: chain3.intToHex(gasLimit),
    value: chain3.intToHex(value),
    shardingFlag: 0,
    chainId: chain3.version.network
  };

  var signedTx = chain3.signTransaction(rawTx, fromSecret);

  const sendMoac = async signedTx => {
    chain3.mc.sendRawTransaction(signedTx, function (err, hash) {
      if (!err) {
        console.log("succeed: ", hash);
      } else {
        console.log("error:", err.message);
      }
    });
  };

  return await sendMoac(signedTx);
};

module.exports.address = fromAddress;

module.exports.getBalance = async address => {
  const result = await chain3.mc.getBalance(address);
  return result / factor;
};
