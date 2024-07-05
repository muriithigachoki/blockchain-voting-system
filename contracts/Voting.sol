// SPDX-License-Identifier: MIT
// License identifier to indicate that this code is licensed under the MIT License.

pragma solidity ^0.8.0;
// Specifies the Solidity version to be used for this contract.

contract Voting {
    // Defines a new contract named "Voting".

    struct Candidate {
        // Defines a struct (similar to a class) to represent a candidate.
        string name; // The candidate's name.
        uint256 votes; // The number of votes the candidate has received.
    }

    Candidate[] public presidentialCandidates;
    // An array to store all presidential candidates.

    mapping(string => Candidate[]) public governorCandidates;
    // A mapping to store governor candidates by county. The key is a county name, and the value is an array of candidates.

    mapping(string => mapping(string => Candidate[]))
        public parliamentCandidates;
    // A mapping to store parliament candidates by county and constituency.
    // The outer key is the county name, the inner key is the constituency name, and the value is an array of candidates.

    struct Voter {
        // Defines a struct to represent a voter.
        bool hasVotedPresidential; // Tracks whether the voter has voted for a presidential candidate.
        mapping(string => bool) hasVotedGovernor; // Tracks whether the voter has voted for a governor in each county.
        mapping(string => mapping(string => bool)) hasVotedParliament; // Tracks whether the voter has voted for a parliament member in each constituency within each county.
    }

    mapping(address => Voter) public voters;
    // A mapping to store voter information by their address. Each address maps to a Voter struct.

    // Events to emit when a vote is cast.
    event VoteForPresident(uint256 candidateIndex);
    event VoteForGovernor(string county, uint256 candidateIndex);
    event VoteForParliament(
        string county,
        string constituency,
        uint256 candidateIndex
    );
    event Debug(string message); // A debug event for logging messages.

    // Function to add a presidential candidate.
    function addPresidentialCandidate(string memory name) public {
        presidentialCandidates.push(Candidate(name, 0));
        // Adds a new candidate with the given name and 0 votes to the presidentialCandidates array.
        emit Debug("Presidential candidate added");
        // Emits a debug event indicating that a presidential candidate was added.
    }

    // Function to add a governor candidate.
    function addGovernorCandidate(
        string memory county,
        string memory name
    ) public {
        governorCandidates[county].push(Candidate(name, 0));
        // Adds a new candidate with the given name and 0 votes to the governorCandidates array for the specified county.
        emit Debug("Governor candidate added");
        // Emits a debug event indicating that a governor candidate was added.
    }

    // Function to add a parliament candidate.
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

    // Function to vote for a presidential candidate.
    function voteForPresident(uint256 candidateIndex) public {
        require(
            !voters[msg.sender].hasVotedPresidential,
            "Already voted for president"
        );
        // Ensures that the voter has not already voted for a presidential candidate.
        presidentialCandidates[candidateIndex].votes++;
        // Increments the vote count for the specified presidential candidate.
        voters[msg.sender].hasVotedPresidential = true;
        // Marks the voter as having voted for a presidential candidate.
        emit VoteForPresident(candidateIndex);
        // Emits an event indicating that a vote was cast for a presidential candidate.
    }

    // Function to vote for a governor candidate.
    function voteForGovernor(
        string memory county,
        uint256 candidateIndex
    ) public {
        require(
            !voters[msg.sender].hasVotedGovernor[county],
            "Already voted for governor in this county"
        );
        // Ensures that the voter has not already voted for a governor in the specified county.
        governorCandidates[county][candidateIndex].votes++;
        // Increments the vote count for the specified governor candidate in the specified county.
        voters[msg.sender].hasVotedGovernor[county] = true;
        // Marks the voter as having voted for a governor in the specified county.
        emit VoteForGovernor(county, candidateIndex);
        // Emits an event indicating that a vote was cast for a governor candidate.
    }

    // Function to vote for a parliament candidate.
    function voteForParliament(
        string memory county,
        string memory constituency,
        uint256 candidateIndex
    ) public {
        require(
            !voters[msg.sender].hasVotedParliament[county][constituency],
            "Already voted for parliament in this constituency"
        );
        // Ensures that the voter has not already voted for a parliament member in the specified constituency within the specified county.
        parliamentCandidates[county][constituency][candidateIndex].votes++;
        // Increments the vote count for the specified parliament candidate in the specified county and constituency.
        voters[msg.sender].hasVotedParliament[county][constituency] = true;
        // Marks the voter as having voted for a parliament member in the specified constituency within the specified county.
        emit VoteForParliament(county, constituency, candidateIndex);
        // Emits an event indicating that a vote was cast for a parliament candidate.
    }

    // New functions to get candidate index by name
    function getPresidentialCandidateIndex(
        string memory name
    ) public view returns (uint256) {
        for (uint256 i = 0; i < presidentialCandidates.length; i++) {
            if (
                keccak256(abi.encodePacked(presidentialCandidates[i].name)) ==
                keccak256(abi.encodePacked(name))
            ) {
                return i;
            }
        }
        revert("Candidate not found");
    }

    // Function to get the list of presidential candidates.
    function getPresidentialCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return presidentialCandidates;
        // Returns the array of presidential candidates.
    }

    // Function to get the list of governor candidates for a specified county.
    function getGovernorCandidates(
        string memory county
    ) public view returns (Candidate[] memory) {
        return governorCandidates[county];
        // Returns the array of governor candidates for the specified county.
    }

    // Function to get the list of parliament candidates for a specified county and constituency.
    function getParliamentCandidates(
        string memory county,
        string memory constituency
    ) public view returns (Candidate[] memory) {
        return parliamentCandidates[county][constituency];
        // Returns the array of parliament candidates for the specified county and constituency.
    }
}
