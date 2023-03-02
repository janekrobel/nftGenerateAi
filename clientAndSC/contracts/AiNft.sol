// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ERC721.sol";
import"./Ownable.sol";
import "./Counters.sol"; 

contract AiNft is Ownable,ERC721{
    using Counters for Counters.Counter;

    Counters.Counter public nextID;
    uint mintPrice = 0 ether;

    mapping (address => uint256) nftCountToOwner;
    mapping (uint256 => address) idToOwner;
    mapping (uint => address) approvals;

    event Mint(address _owner, uint _tokenId);

    function mint() external payable{
        require(msg.value == mintPrice);
        nftCountToOwner[msg.sender] += 1;
        idToOwner[nextID._value] = msg.sender;
        emit Mint(msg.sender,nextID._value);
        nextID.increment();
    }

    function getOwnedNFTIds(address _owner) public view returns (uint256[] memory) {
        uint256 balance = nftCountToOwner[_owner];
        uint256[] memory nftIds = new uint256[](balance);
        uint256 counter = 0;
        for (uint256 i = 0; i < nextID._value; i++) {
            if(idToOwner[i] == _owner){
                nftIds[counter] = i;
                counter++;
            }
        }
        return nftIds;
    }

    function withdraw() external onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }

    function balanceOf(address _owner) external view returns (uint256){
        return nftCountToOwner[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        return idToOwner[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable{
        require(msg.sender == _from || approvals[_tokenId] == msg.sender);
        require(idToOwner[_tokenId] == _from);
        idToOwner[_tokenId] = _to;
        nftCountToOwner[_from] -=1;
        nftCountToOwner[_to] +=1;
        emit Transfer(_from,_to,_tokenId);
    }
    
    function approve(address _approved, uint256 _tokenId) external payable {
        require(msg.sender == idToOwner[_tokenId]);
        approvals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function getApproved(uint256 _tokenId) external view returns (address){
        return approvals[_tokenId];
    }
    
    function isApprovedForAll(address _owner, address _operator) external view returns (bool){
        uint256[] memory list = getOwnedNFTIds(_owner);
        for(uint i=0;i<nftCountToOwner[_owner];i+=1){
            if(approvals[list[i]] != _operator){
                return false;
            }
        }
        return true;
    }

    function setApprovalForAll(address _operator, bool _approved) external{
        uint256[] memory list = getOwnedNFTIds(msg.sender);
        if(_approved){
            for(uint i=0;i<nftCountToOwner[msg.sender];i+=1){
                approvals[list[i]] = _operator;
            }
        } else {
            for(uint i=0;i<nftCountToOwner[msg.sender];i+=1){
                approvals[list[i]] = msg.sender;
            }
        }
        emit ApprovalForAll(msg.sender,_operator,_approved);
        
    }
}
