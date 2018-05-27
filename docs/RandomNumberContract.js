// RANDOM NUMBER GENERATOR
// The blockchain selets a random number between 0 and a maximum the user selects.

var RandomNumberContract = function() {
  LocalContractStorage.defineMapProperty(this, "hash_to_rnc") // Max, Number, Zero, Date
}

RandomNumberContract.prototype = {
  init: function() { },

  requestNumber: function (max, zero) {
    if(Blockchain.transaction.value != 0) {
        throw new Error("We don't accept any type of currency.");
    }
    if(isNaN(max) || max < 1) {
      throw new Error("max is not a number.");
    }

    var number = Math.floor(Math.random() * max);
    this.hash_to_rnc.put(Blockchain.transaction.hash, {max, number, zero, date: Date.now()});
  },

  getNumber: function (hash) {
    return this.hash_to_rnc.get(hash);
  },
}

module.exports = RandomNumberContract
