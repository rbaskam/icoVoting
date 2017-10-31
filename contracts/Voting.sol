pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {

    struct Ico {
        string name;
        uint votes;
    }

    uint numIcos;
    mapping (uint => Ico) icos;

    Ico[] public proposals;

    function addIco(string name) returns (uint icoID) {
        icoID = numIcos++; // icoID is return variable
        // Creates new struct and saves in storage. We leave out the mapping type.
        icos[icoID] = Ico(name, 0);
    }

    function voteForIco(uint icoID) {
        Ico storage c = icos[icoID];
        // Creates a new temporary memory struct, initialised with the given values
        // and copies it over to storage.
        // Note that you can also use Voter(msg.sender, msg.value) to initialise.
        c.votes++;
    }

    function getIcoCount() public constant returns(uint) {
        return proposals.length;
    }

    function getIco(uint index) public constant returns(string, uint) {
        return (proposals[index].name, proposals[index].votes);
    }
}