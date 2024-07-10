// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {
    // Defines a new contract named "Voting".

    struct Candidate {
        // Defines a struct (similar to a class) to represent a candidate.
        string name; // The candidate's name.
        uint256 votes; // The number of votes the candidate has received.
    }

    Candidate[] public presidentialCandidates;
    mapping(string => Candidate[]) public governorCandidates;
    mapping(string => mapping(string => Candidate[]))
        public parliamentCandidates;

    event VoteForPresident(uint256 candidateIndex);
    event VoteForGovernor(string county, uint256 candidateIndex);
    event VoteForParliament(
        string county,
        string constituency,
        uint256 candidateIndex
    );

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

    mapping(address => Voter) public voters;

    // Function to add a presidential candidate.
    function addPresidentialCandidate(string memory name) public {
        presidentialCandidates.push(Candidate(name, 0));
        emit Debug("Presidential candidate added");
    }
    event Debug(string message);

    function getPresidentialCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return presidentialCandidates;
        // Returns the array of presidential candidates.
    }

    function addGovernorCandidate(
        string memory county,
        string memory name
    ) public {
        governorCandidates[county].push(Candidate(name, 0));
        // Adds a new candidate with the given name and 0 votes to the governorCandidates array for the specified county.
        emit Debug("Governor candidate added");
        // Emits a debug event indicating that a governor candidate was added.
    }

    function getGovernorCandidates(
        string memory county
    ) public view returns (Candidate[] memory) {
        return governorCandidates[county];
        // Returns the array of governor candidates for the specified county.
    }

    function addParliamentCandidate(
        string memory county,
        string memory constituency,
        string memory name
    ) public {
        parliamentCandidates[county][constituency].push(Candidate(name, 0));
        // Adds a new candidate with the given name and 0 votes to the parliamentCandidates array for the specified county and constituency.
        emit Debug("Parliament candidate added");
        // Emits a debug event indicating that a parliament candidate was added.
    }

    function voteForPresident(uint256 candidateIndex) public {
        require(
            !voters[msg.sender].hasVotedPresidential,
            "Already voted for president"
        );
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
        require(
            !voters[msg.sender].isRegistered,
            "Voter is already registered"
        );
        Voter storage voter = voters[msg.sender];
        voter.id = id;
        voter.name = name;
        voter.county = county;
        voter.constituency = constituency;
        voter.isRegistered = true;
        emit VoterRegistered(msg.sender);
    }

    function getParliamentCandidates(
        string memory county,
        string memory constituency
    ) public view returns (Candidate[] memory) {
        return parliamentCandidates[county][constituency];
    }
}
