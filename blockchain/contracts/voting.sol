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
        string image;
    }

    mapping(uint256 => User) public users; // Mapping to store users by ID
    mapping(string => bool) private usernames; // Mapping to store usernames for uniqueness check
    mapping(address => uint256) public addressToUserId; // Mapping to store user ID by address
    uint256[] public userIds; // Array to store user IDs
    Candidate[] public presidentialCandidates;
    mapping(string => Candidate[]) public governorCandidates;
    mapping(string => mapping(string => Candidate[]))
        public parliamentCandidates;
    mapping(address => bool) public loggedIn; // Mapping to keep track of logged in users
    mapping(address => bytes32) public loginTokens;

    event UserCreated(uint256 userId, string username, string email);
    event UserLoggedIn(
        uint256 userId,
        address userAddress,
        string username,
        string email,
        string county,
        string constituency,
        bool isRegistered,
        bytes32 token
    );
    event VoteForPresident(uint256 candidateIndex);
    event VoteForGovernor(string county, uint256 candidateIndex);
    event VoteForParliament(
        string county,
        string constituency,
        uint256 candidateIndex
    );
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

        userIds.push(userId);
        addressToUserId[msg.sender] = userId;

        emit UserCreated(userId, _username, _email);
    }

    function getAllUsers()
        public
        view
        returns (
            uint256[] memory userIdsArray,
            address[] memory userAddresses,
            string[] memory usernamesArray,
            string[] memory emails,
            string[] memory counties,
            string[] memory constituencies,
            bool[] memory isRegistered
        )
    {
        uint256 length = userIds.length;
        userIdsArray = new uint256[](length);
        userAddresses = new address[](length);
        usernamesArray = new string[](length);
        emails = new string[](length);
        counties = new string[](length);
        constituencies = new string[](length);
        isRegistered = new bool[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 userId = userIds[i];
            User storage user = users[userId];
            userIdsArray[i] = user.userId;
            userAddresses[i] = user.userAddress;
            usernamesArray[i] = user.username;
            emails[i] = user.email;
            counties[i] = user.county;
            constituencies[i] = user.constituency;
            isRegistered[i] = user.isRegistered;
        }
    }

    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }

    function loginUser(
        string memory _username,
        string memory _password
    )
        public
        returns (
            uint256 userId,
            address userAddress,
            string memory username,
            string memory email,
            string memory county,
            string memory constituency,
            bool isRegistered,
            bytes32 token
        )
    {
        uint256 currentUserId = addressToUserId[msg.sender];
        User storage user = users[currentUserId];

        require(user.isRegistered, "User is not registered");
        require(
            user.passwordHash == keccak256(abi.encodePacked(_password)),
            "Invalid password"
        );

        loggedIn[msg.sender] = true;

        // Generate a login token
        token = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        loginTokens[msg.sender] = token;

        emit UserLoggedIn(
            user.userId,
            user.userAddress,
            user.username,
            user.email,
            user.county,
            user.constituency,
            user.isRegistered,
            token
        );

        return (
            user.userId,
            user.userAddress,
            user.username,
            user.email,
            user.county,
            user.constituency,
            user.isRegistered,
            token
        );
    }

    function setAdmin(uint256 userId, bool _isAdmin) public {
        require(users[userId].isRegistered, "User not found");
        users[userId].isAdmin = _isAdmin;
    }

    function addPresidentialCandidate(
        string memory name,
        string memory image
    ) public {
        presidentialCandidates.push(Candidate(name, 0, image));
        emit Debug("Presidential candidate added");
    }

    function addGovernorCandidate(
        string memory county,
        string memory name,
        string memory image
    ) public {
        governorCandidates[county].push(Candidate(name, 0, image));
        emit Debug("Governor candidate added");
    }

    function addParliamentCandidate(
        string memory county,
        string memory constituency,
        string memory name,
        string memory image
    ) public {
        parliamentCandidates[county][constituency].push(
            Candidate(name, 0, image)
        );
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

    function getGovernorCandidates(
        string memory county
    ) public view returns (Candidate[] memory) {
        return governorCandidates[county];
    }

    function getParliamentCandidates(
        string memory county,
        string memory constituency
    ) public view returns (Candidate[] memory) {
        return parliamentCandidates[county][constituency];
    }

    function voteForGovernor(
        string memory county,
        uint256 userId,
        uint256 candidateIndex
    ) public {
        require(users[userId].isRegistered, "Voter is not registered");
        require(
            !users[userId].hasVotedGovernor[county],
            "Already voted for governor in this county"
        );

        governorCandidates[county][candidateIndex].votes++;
        users[userId].hasVotedGovernor[county] = true;

        emit VoteForGovernor(county, candidateIndex);
    }

    function voteForParliament(
        string memory county,
        string memory constituency,
        uint256 userId,
        uint256 candidateIndex
    ) public {
        require(users[userId].isRegistered, "Voter is not registered");
        require(
            !users[userId].hasVotedParliament[county][constituency],
            "Already voted for parliament in this constituency"
        );

        parliamentCandidates[county][constituency][candidateIndex].votes++;
        users[userId].hasVotedParliament[county][constituency] = true;

        emit VoteForParliament(county, constituency, candidateIndex);
    }
}
