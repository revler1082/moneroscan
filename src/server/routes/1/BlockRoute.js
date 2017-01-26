var models = require('./data/models');
var express = require('express');
var router  = express.Router();
var config = require('../../config')[process.env.NODE_ENV];
var http = require('http');

router.get('/', function(req, res) {
  res.json({});
});

router.get('/:height', function(req, res) {
  // gonna fake it for now
  
  res.json({
      "id": "0", 
      "jsonrpc": "2.0", 
      "result": { 
        "blob": "…", 
        "block_header": { 
          "depth": 80694, 
          "difficulty": 815625611, 
          "hash": "e22cf75f39ae720e8b71b3d120a5ac03f0db50bba6379e2850975b4859190bc6", 
          "height": 912345,
          "major_version": 1, 
          "minor_version": 2, 
          "nonce": 1646, 
          "orphan_status": false, 
          "prev_hash": "b61c58b2e0be53fad5ef9d9731a55e8a81d972b8d90ed07c04fd37ca6403ff78", 
          "reward": 7388968946286, 
          "timestamp": 1452793716 
        },
        "json": {
          "major_version": 1,
          "minor_version": 2,
          "timestamp": 1452793716,
          "prev_id": "b61c58b2e0be53fad5ef9d9731a55e8a81d972b8d90ed07c04fd37ca6403ff78",
          "nonce": 1646,
          "miner_tx": {
            "version": 1, 
            "unlock_time": 912405, 
            "vin": [ { "gen": { "height": 912345 } } ],  
            "vout": [{ 
              "amount": 8968946286,
              "target": { "key": "378b043c1724c92c69d923d266fe86477d3a5ddd21145062e148c64c57677008" } 
            }, { 
              "amount": 80000000000,
              "target": { "key": "73733cbd6e6218bda671596462a4b062f95cfe5e1dbb5b990dacb30e827d02f2" } 
            }, { 
              "amount": 300000000000, 
              "target": { "key": "47a5dab669770da69a860acde21616a119818e1a489bb3c4b1b6b3c50547bc0c" } 
            }, { 
              "amount": 7000000000000, 
              "target": { "key": "1f7e4762b8b755e3e3c72b8610cc87b9bc25d1f0a87c0c816ebb952e4f8aff3d" } 
            }], 
            "extra": [ 1, 253, 10, 119, 137, 87, 244, 243, 16, 58, 131, 138, 253, 164, 136, 195, 205, 173, 242, 105, 123, 61, 52, 173, 113, 35, 66, 130, 178, 250, 217, 16, 14, 2, 8, 0, 0, 0, 11, 223, 194, 193, 108 ],  
            "signatures": [] 
          },
          "tx_hashes": []
        }
      },
      "status": "ok"
    });
return;  
  var postData = JSON.stringify({
    "jsonrpc":"2.0",
    "id":"0",
    "method":"getblock",
    "params": {
      "height" : req.params.height
    }
  });
  
  var options = {
    hostname: config.nodeHost,
    port: config.nodePort,
    path: config.jsonRpcPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  var b = '';
  var req = http.request(options, (nodeResponse) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      b += chunk;
    });
    res.on('end', () => {
      res.json(JSON.parse(b));
    });
  });
  
  req.on('error', (e) => {
    res.json({ error: e });
  });
  
  // write data to request body
  req.write(postData);
  req.end();
});

module.exports = router;
