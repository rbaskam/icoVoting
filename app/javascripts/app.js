// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

let icos = {"Rama": "ico-1", "Nick": "ico-2", "Jose": "ico-3"}

window.addIco = function(ico) {
  let icoName = $("#ico").val();
  try {
    $("#msg").html("ICO has been submitted. The ICO will dispaly as soon as it is recorded on the blockchain. Please wait.")
    $("#ico").val("");

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Voting.deployed().then(function(contractInstance) {
      contractInstance.addIco(icoName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        let div_id = icos[icoName];
        return contractInstance.totalVotesFor.call(icoName).then(function(v) {
          $("#" + div_id).html(v.toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.voteForIco = function(ico) {
  let icoName = $("#ico").val();
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#ico").val("");

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Voting.deployed().then(function(contractInstance) {
      contractInstance.voteForIco(icoName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        let div_id = icos[icoName];
        return contractInstance.totalVotesFor.call(icoName).then(function(v) {
          $("#" + div_id).html(v.toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  }

  Voting.setProvider(web3.currentProvider);
  let icoNames = Object.keys(icos);
  for (var i = 0; i < icoNames.length; i++) {
    let name = icoNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + icos[name]).html(v.toString());
      });
    })
  }
});