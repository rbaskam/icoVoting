pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is ico name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of icos
  */
  
  bytes32[] public icoList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of icos who will be contesting in the election
  */
  function Voting(bytes32[] icoNames) {
    icoList = icoNames;
  }

  // This function returns the total votes a ico has received so far
  function totalVotesFor(bytes32 ico) returns (uint8) {
    if (validIco(ico) == false) throw;
    return votesReceived[ico];
  }

  // This function increments the vote count for the specified ico. This
  // is equivalent to casting a vote
  function voteForIco(bytes32 ico) {
    if (validIco(ico) == false) throw;
    votesReceived[ico] += 1;
  }

  // This function adds the specified ico. This
  // is equivalent to adding a ico
  function addIco(bytes32 ico) {
    if (validIcoAdd(ico) == false) throw;
    uint icoCount = icoList.length + 1;
    icoList[icoCount] = ico;
  }

  function validIcoAdd(bytes32 ico) returns (bool) {
    return true;
  }

  function validIco(bytes32 ico) returns (bool) {
    for(uint i = 0; i < icoList.length; i++) {
      if (icoList[i] == ico) {
        return true;
      }
    }
    return false;
  }
}