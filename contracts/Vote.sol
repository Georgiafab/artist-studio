// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Vote {
    // 投票议题结构
    struct Proposal {
        string name; // 议题名称
        uint256 voteCount; // 票数
    }

    // 投票议题数组
    Proposal[] public proposals;

    // 存储每个地址对每个议题的投票情况
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    // 创建新的投票议题
    function createProposal(string memory _name) public {
        proposals.push(Proposal({name: _name, voteCount: 0}));
    }

    // 对指定议题进行投票
    function vote(uint256 _proposalIndex) public {
        require(_proposalIndex < proposals.length, "Invalid proposal index");
        require(
            !hasVoted[msg.sender][_proposalIndex],
            "You have already voted for this proposal"
        );

        proposals[_proposalIndex].voteCount++;
        hasVoted[msg.sender][_proposalIndex] = true;
    }

    // 获取指定议题的名称和票数
    function getProposal(
        uint256 _proposalIndex
    ) public view returns (string memory, uint256) {
        require(_proposalIndex < proposals.length, "Invalid proposal index");
        return (
            proposals[_proposalIndex].name,
            proposals[_proposalIndex].voteCount
        );
    }

    // 获取议题数量
    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }
}
