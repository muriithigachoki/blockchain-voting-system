// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract voting {
    uint256 public userCount = 0;
    uint256 public nextUserId = 1;

    struct User {
        uint256 userId;
        address userAddress;
        string username;
        string email;
        string county;
        string constituency;
        bool isRegistered;
        bool hasVotedPresidential;
        mapping(string => bool) hasVotedGovernor;
        mapping(string => mapping(string => bool)) hasVotedParliament;
        bytes32 passwordHash;
        bool isAdmin;
    }

    struct Candidate {
        string name;
        uint256 votes;
    }

    mapping(uint256 => User) public users; // Mapping to store users by ID
    mapping(string => bool) private usernames; // Mapping to store usernames for uniqueness check
    mapping(address => uint256) public addressToUserId; // Mapping to store user ID by address
    uint256[] public userIds; // Array to store user IDs
    Candidate[] public presidentialCandidates;
    mapping(string => Candidate[]) public governorCandidates;
    mapping(string => mapping(string => Candidate[]))
        public parliamentCandidates;

    event UserCreated(uint256 userId, string username, string email);
    event UserLoggedIn(string username);
    event VoteForPresident(uint256 candidateIndex);
    event VoteForGovernor(string county, uint256 candidateIndex);
    event VoteForParliament(string county, string constituency, uint256 candidateIndex);
    event Debug(string message);

    function createUser(
        string memory _username,
        string memory _email,
        string memory _password,
        string memory _county,
        string memory _constituency
    ) public {
        uint256 userId = nextUserId++;

        users[userId].userId = userId;
        users[userId].userAddress = msg.sender;
        users[userId].username = _username;
        users[userId].email = _email;
        users[userId].county = _county;
        users[userId].constituency = _constituency;
        users[userId].isRegistered = true;
        users[userId].hasVotedPresidential = false;
        users[userId].passwordHash = keccak256(abi.encodePacked(_password));
        users[userId].isAdmin = false;

        userIds.push(userId); // Store the user ID in the array
        addressToUserId[msg.sender] = userId; // Map the address to the user ID

        emit UserCreated(userId, _username, _email);
    }

    function getUserById(uint256 userId) public view returns (
        uint256, address, string memory, string memory, string memory, string memory, 
        bool, bool, bytes32, bool
    ) {
        require(userId > 0 && userId <= userCount, "User ID does not exist");
        User storage user = users[userId];
        return (
            user.userId,
            user.userAddress,
            user.username,
            user.email,
            user.county,
            user.constituency,
            user.isRegistered,
            user.hasVotedPresidential,
            user.passwordHash,
            user.isAdmin
        );
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }

    function loginUser(string memory _username, string memory _password)
        public
        view
        returns (bool)
    {
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        for (uint256 i = 0; i < userIds.length; i++) {
            User storage user = users[userIds[i]];
            if (
                compareStrings(user.username, _username) &&
                user.passwordHash == passwordHash
            ) {
                return true;
            }
        }
        revert("User not found or incorrect password.");
    }

    function setAdmin(uint256 userId, bool _isAdmin) public {
        require(users[userId].isRegistered, "User not found");
        users[userId].isAdmin = _isAdmin;
    }

    function addPresidentialCandidate(string memory name) public {
        presidentialCandidates.push(Candidate(name, 0));
        emit Debug("Presidential candidate added");
    }

    function addGovernorCandidate(string memory county, string memory name) public {
        governorCandidates[county].push(Candidate(name, 0));
        emit Debug("Governor candidate added");
    }

    function addParliamentCandidate(string memory county, string memory constituency, string memory name) public {
        parliamentCandidates[county][constituency].push(Candidate(name, 0));
        emit Debug("Parliament candidate added");
    }

    function getPresidentialCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return presidentialCandidates;
    }

    function voteForPresident(uint256 userId, uint256 candidateIndex) public {
        require(users[userId].isRegistered, "Voter is not registered");
        require(
            !users[userId].hasVotedPresidential,
            "Already voted for president"
        );

        presidentialCandidates[candidateIndex].votes++;
        users[userId].hasVotedPresidential = true;

        emit VoteForPresident(candidateIndex);
    }

    function getGovernorCandidates(string memory county) public view returns (Candidate[] memory) {
        return governorCandidates[county];
    }

    function getParliamentCandidates(string memory county, string memory constituency) public view returns (Candidate[] memory) {
        return parliamentCandidates[county][constituency];
    }


    function voteForGovernor(string memory county, uint256 userId, uint256 candidateIndex) public {
        require(users[userId].isRegistered, "Voter is not registered");
        require(!users[userId].hasVotedGovernor[county], "Already voted for governor in this county");

        governorCandidates[county][candidateIndex].votes++;
        users[userId].hasVotedGovernor[county] = true;

        emit VoteForGovernor(county, candidateIndex);
    }

    function voteForParliament(string memory county, string memory constituency, uint256 userId, uint256 candidateIndex) public {
        require(users[userId].isRegistered, "Voter is not registered");
        require(!users[userId].hasVotedParliament[county][constituency],
            "Already voted for parliament in this constituency"
        );

        parliamentCandidates[county][constituency][candidateIndex].votes++;
        users[userId].hasVotedParliament[county][constituency] = true;

        emit VoteForParliament(county, constituency, candidateIndex);
    }
}
