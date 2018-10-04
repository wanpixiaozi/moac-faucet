const bitcore = require("bitcore-lib");
const ethWallet = require("ethereumjs-wallet");
const ethTx = require("ethereumjs-tx");
const BigNumber = require("bignumber.js");
const Chain3 = require("chain3");

const seed = process.env.SEED || "abcde12345";

// initialize faucet wallet
const seedValue = Buffer.from(seed);
const hash = bitcore.crypto.Hash.sha256(seedValue);
const ethPK = ethWallet.fromPrivateKey(hash);
const faucetMOACAddress = ethPK.getAddressString();

// initalize chain3
const CHAIN_RPC_URL =
  process.env.ETH_RPC_URL ||
  "http://ethereum-1784ae1b379243ee.elb.us-east-1.amazonaws.com:8545";
const chain3 = new Chain3(new Chain3.providers.HttpProvider(CHAIN_RPC_URL));

const factor = new BigNumber(10).exponentiatedBy(18); // decimal for eth

module.exports.sendTx = async (amount, destination) => {
  try {
    const value = new BigNumber(amount).multipliedBy(factor);
    const nonce = await chain3.eth.getTransactionCount(faucetMOACAddress);
    const gasLimit = new BigNumber(200000);

    const txParams = {
      nonce: `0x${nonce.toString(16)}`,
      gasPrice: `0xBA43B7400`,
      gasLimit: `0x${gasLimit.toString(16)}`,
      to: destination,
      value: `0x${value.toString(16)}`,
      data: `0x0`
      //  chainId: 4
    };

    const tx = new ethTx(txParams);
    tx.sign(hash);
    const serializedTx = tx.serialize().toString("hex");

    const sendMoac = async serializedTx => {
      return new Promise(function(resolve, reject) {
        chain3.eth
          .sendSignedTransaction("0x" + serializedTx)
          .once("transactionHash", (e) => {
            resolve(e); // done
          });
      });
    };

    return await sendMoac(serializedTx);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports.address = faucetMOACAddress;

module.exports.getBalance = async address => {
  const result = await chain3.eth.getBalance(address);
  return result / factor;
};
