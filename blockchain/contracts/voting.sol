// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 votes;
    }

    Candidate[] public presidentialCandidates;
    mapping(string => Candidate[]) public governorCandidates;
    mapping(string => mapping(string => Candidate[])) public parliamentCandidates;

    event VoteForPresident(uint256 candidateIndex);
    event VoteForGovernor(string county, uint256 candidateIndex);
    event VoteForParliament(string county, string constituency, uint256 candidateIndex);

    event VoterRegistered(address voter);

    struct Voter {
        uint256 id;
        string name;
        string county;
        string constituency;
        bool isRegistered;
        bool hasVotedPresidential;
        mapping(string => bool) hasVotedGovernor;
        mapping(string => mapping(string => bool)) hasVotedParliament;
    }

    // Struct to store retrievable voter information
    struct VoterInfo {
        uint256 id;
        string name;
        string county;
        string constituency;
        bool isRegistered;
        bool hasVotedPresidential;
    }

    mapping(address => Voter) public voters;
    address[] public voterAddresses;

    // Function to add a presidential candidate.
    function addPresidentialCandidate(string memory name) public {
        presidentialCandidates.push(Candidate(name, 0));
        emit Debug("Presidential candidate added");
    }
    event Debug(string message);

    function getPresidentialCandidates() public view returns (Candidate[] memory) {
        return presidentialCandidates;
    }

    function addGovernorCandidate(string memory county, string memory name) public {
        governorCandidates[county].push(Candidate(name, 0));
        emit Debug("Governor candidate added");
    }

    function getGovernorCandidates(string memory county) public view returns (Candidate[] memory) {
        return governorCandidates[county];
    }

    function addParliamentCandidate(string memory county, string memory constituency, string memory name) public {
        parliamentCandidates[county][constituency].push(Candidate(name, 0));
        emit Debug("Parliament candidate added");
    }

    function voteForPresident(uint256 candidateIndex) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].hasVotedPresidential, "Already voted for president");

        presidentialCandidates[candidateIndex].votes++;
        voters[msg.sender].hasVotedPresidential = true;

        emit VoteForPresident(candidateIndex);
    }

    function registerVoter(
        uint256 id,
        string memory name,
        string memory county,
        string memory constituency
    ) public {
        require(!voters[msg.sender].isRegistered, "Voter is already registered");

        Voter storage voter = voters[msg.sender];
        voter.id = id;
        voter.name = name;
        voter.county = county;
        voter.constituency = constituency;
        voter.isRegistered = true;

        voterAddresses.push(msg.sender); // Store the address of the registered voter

        emit VoterRegistered(msg.sender);
    }

    function getParliamentCandidates(string memory county, string memory constituency) public view returns (Candidate[] memory) {
        return parliamentCandidates[county][constituency];
    }

    function voteForGovernor(string memory county, uint256 candidateIndex) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].hasVotedGovernor[county], "Already voted for governor in this county");

        governorCandidates[county][candidateIndex].votes++;
        voters[msg.sender].hasVotedGovernor[county] = true;

        emit VoteForGovernor(county, candidateIndex);
    }

    function voteForParliament(string memory county, string memory constituency, uint256 candidateIndex) public {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(
            !voters[msg.sender].hasVotedParliament[county][constituency],
            "Already voted for parliament in this constituency"
        );

        parliamentCandidates[county][constituency][candidateIndex].votes++;
        voters[msg.sender].hasVotedParliament[county][constituency] = true;

        emit VoteForParliament(county, constituency, candidateIndex);
    }

    // Function to get all registered voters.
    function getAllVoters() public view returns (VoterInfo[] memory) {
        VoterInfo[] memory allVoters = new VoterInfo[](voterAddresses.length);

        for (uint256 i = 0; i < voterAddresses.length; i++) {
            Voter storage voter = voters[voterAddresses[i]];
            allVoters[i] = VoterInfo(
                voter.id,
                voter.name,
                voter.county,
                voter.constituency,
                voter.isRegistered,
                voter.hasVotedPresidential
            );
        }

        return allVoters;
    }
}
