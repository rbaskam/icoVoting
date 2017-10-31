pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
    struct User {
        string name;
        uint votes;
    }
    User[] public users;

    function addIco(string _name) public returns(uint) {
        users.length++;
        users[users.length-1].name = _name;
        users[users.length-1].votes = 0;
        return users.length;
    }

    function getIcoCount() public constant returns(uint) {
        return users.length;
    }

    function getIco(uint index) public constant returns(string, uint) {
        return ( users[index].name, users[index].votes);
    }

    function voteForIco(uint icoId) public returns(uint) {
      users[icoId].votes++;
      return users[icoId].votes;
    }

}