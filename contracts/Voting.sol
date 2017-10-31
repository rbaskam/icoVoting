pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is ico name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  // mapping (bytes32 => uint8) public icoList;

 string public icoListNames;

  struct IcoList {
        string name;
        uint8 votes;
    }
    IcoList[] public icos;

  
   

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract
  */
  // function Voting() {}

  // This function returns the list of icos
  function getIcoItem(uint index) returns(uint, string) {
        return (icos[index].votes, icos[index].name);
    }

  // This function returns the list of icos
  function getIcoCount() returns(uint) {
  
    for (uint i = 0; i < 10; i++) {
      string icoName = icos[i].name;
      uint8 icoVotes = icos[i].votes;
       icoListNames = icoListNames . (icoName.icoVotes+',');
    }

    return icoListNames.length;
  }

  // This function adds the specified ico. This
  // is equivalent to adding a ico
  function addIco(string _icoName) {
    var icoLength = icos.length++;
    icos[icoLength].votes = 0;
    icos[icoLength].name = _icoName;
  }
}