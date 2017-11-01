pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
    struct ICO {
        string name;
        uint votes;
    }
    ICO[] public icos;

    function addIco(string _name) public returns(uint) {
        icos.length++;
        icos[icos.length-1].name = _name;
        icos[icos.length-1].votes = 0;
        return icos.length;
    }

    function getIcoCount() public constant returns(uint) {
        return icos.length;
    }

    function getIco(uint index) public constant returns(string, uint, uint) {
        return ( icos[index].name, icos[index].votes, index);
    }

    function voteForIco(uint icoId) public returns(uint) {
      icos[icoId].votes++;
      return icos[icoId].votes;
    }

}