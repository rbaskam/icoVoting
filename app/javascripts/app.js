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

let icos = {}

window.addIco = function(ico) {
  let icoName = $("#ico").val();
  try {
    $("#msg").html("ICO has been submitted. The ICO will display as soon as it is recorded on the blockchain. Please wait.")
    $("#ico").val("");

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Voting.deployed().then(function(contractInstance) {
      contractInstance.addIco(icoName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        $("#icoList > tbody").append("<tr><td>"+icoName+"</td><td>0</td></tr>");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.voteForIco = function(ico) {
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#ico").val("");

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Voting.deployed().then(function(contractInstance) {
      
      contractInstance.voteForIco(ico, {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        let div_id = 'ico-' + ico
        var oldValue = $("#" + div_id).html();
        var newValue = parseInt(oldValue) + parseInt(1);
        $("#" + div_id).html(newValue);
        $("#msg").html("");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  let icoCount = 0

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  }
  Voting.setProvider(web3.currentProvider)

  Voting.deployed().then(function (contractInstance) {
    contractInstance.getIcoCount.call().then(function (v) {
      icoCount = v['c'][0]
      
      for (var i = 0; i < icoCount; i++) {
        contractInstance.getIco.call(i).then(function (v) {
          $("#icoList > tbody").append("<tr><td>" + v[0] + "</td><td id='ico-" + v[2]['c'][0]  + "'>" + v[1]['c'][0] + "</td><td><a href='#' onclick='voteForIco(" + v[2]['c'][0]  + ")' class='btn btn-primary'>Vote</a></td></tr>")
        })
      }
    })
  })
})
