// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@thirdweb-dev/contracts/eip/interface/IERC20.sol";
import {Ownable} from "@thirdweb-dev/contracts/extension/Ownable.sol";
import {ReentrancyGuard} from "@thirdweb-dev/contracts/external-deps/openzeppelin/security/ReentrancyGuard.sol";

contract Contract is Ownable {
    // Required by thirdweb's Ownable contract
    function _canSetOwner() internal view virtual override returns (bool) {
        return msg.sender == owner();
    }

    // Structs
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startDate;
        bool active;
    }

    struct UserProfile {
        string name;
        string email;
        bool kycVerified;
        uint256 balance;
        uint256 creditScore;
        bool isFrozen;
    }

    // Mappings
    mapping(address => UserProfile) public userProfiles;
    mapping(address => Loan[]) public loans;
    mapping(address => mapping(address => uint256)) public deposits;
    mapping(address => uint256) public loanLimits;
    mapping(address => bool) public governanceVotes;
    mapping(uint256 => mapping(address => bool)) public votes;

    // Governance
    uint256 public proposalId;

    // Events
    event UserRegistered(address indexed user);
    event FundsDeposited(address indexed user, uint256 amount, address token);
    event FundsWithdrawn(address indexed user, uint256 amount, address token);
    event LoanIssued(address indexed user, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanRepaid(address indexed user, uint256 loanId);
    event TransactionFrozen(address indexed user);
    event GovernanceProposalCreated(address indexed proposer, uint256 proposalId);
    event GovernanceVoted(address indexed voter, uint256 proposalId, bool vote);

    // Modifiers
    modifier onlyActiveUser(address user) {
        require(!userProfiles[user].isFrozen, "User account is frozen");
        _;
    }

    // 1. User Management
    function registerUser(string memory name, string memory email) public {
        require(bytes(userProfiles[msg.sender].name).length == 0, "User already registered");

        userProfiles[msg.sender] = UserProfile({
            name: name,
            email: email,
            kycVerified: false,
            balance: 0,
            creditScore: 0,
            isFrozen: false
        });

        emit UserRegistered(msg.sender);
    }

    function verifyKYC(address user) public onlyOwner {
        userProfiles[user].kycVerified = true;
    }

    function updateProfile(string memory newName, string memory newEmail) public {
        UserProfile storage profile = userProfiles[msg.sender];
        require(profile.kycVerified, "KYC not verified");

        profile.name = newName;
        profile.email = newEmail;
    }

    function freezeAccount(address user) public onlyOwner {
        userProfiles[user].isFrozen = true;
        emit TransactionFrozen(user);
    }

    function unfreezeAccount(address user) public onlyOwner {
        userProfiles[user].isFrozen = false;
    }

    // 2. Wallet and Asset Management
    function depositFunds(address token, uint256 amount) public onlyActiveUser(msg.sender) {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender][token] = deposits[msg.sender][token] + amount;
        userProfiles[msg.sender].balance = userProfiles[msg.sender].balance + amount;

        emit FundsDeposited(msg.sender, amount, token);
    }

    function withdrawFunds(address token, uint256 amount) public onlyActiveUser(msg.sender) {
        require(deposits[msg.sender][token] >= amount, "Insufficient balance");

        deposits[msg.sender][token] = deposits[msg.sender][token] - amount;
        userProfiles[msg.sender].balance = userProfiles[msg.sender].balance - amount;
        IERC20(token).transfer(msg.sender, amount);

        emit FundsWithdrawn(msg.sender, amount, token);
    }

    // 3. Lending and Borrowing
    function lendFunds(address token, uint256 amount, uint256 interestRate, uint256 duration) public onlyActiveUser(msg.sender) {
        require(deposits[msg.sender][token] >= amount, "Insufficient balance to lend");

        Loan memory newLoan = Loan({
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            startDate: block.timestamp,
            active: true
        });

        loans[msg.sender].push(newLoan);
        userProfiles[msg.sender].balance = userProfiles[msg.sender].balance - amount;

        emit LoanIssued(msg.sender, amount, interestRate, duration);
    }

    function borrowFunds(address token, uint256 amount, uint256 interestRate, uint256 duration) public onlyActiveUser(msg.sender) {
        require(userProfiles[msg.sender].creditScore > 300, "Low credit score");
        require(amount <= loanLimits[msg.sender], "Loan exceeds limit");

        Loan memory newLoan = Loan({
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            startDate: block.timestamp,
            active: true
        });

        loans[msg.sender].push(newLoan);
        deposits[msg.sender][token] = deposits[msg.sender][token] + amount;
        userProfiles[msg.sender].balance = userProfiles[msg.sender].balance + amount;

        emit LoanIssued(msg.sender, amount, interestRate, duration);
    }

    function repayLoan(uint256 loanId) public onlyActiveUser(msg.sender) {
        Loan storage loan = loans[msg.sender][loanId];
        require(loan.active, "Loan is not active");

        uint256 repaymentAmount = loan.amount + (loan.amount * loan.interestRate / 100);

        require(deposits[msg.sender][address(0)] >= repaymentAmount, "Insufficient balance to repay loan");

        deposits[msg.sender][address(0)] = deposits[msg.sender][address(0)] - repaymentAmount;
        loan.active = false;

        emit LoanRepaid(msg.sender, loanId);
    }

    // 4. Governance
    function createProposal(string memory description) public onlyOwner {
        proposalId++;
        emit GovernanceProposalCreated(msg.sender, proposalId);
    }

    function voteOnProposal(uint256 _proposalId, bool vote) public {
        votes[_proposalId][msg.sender] = vote;
        emit GovernanceVoted(msg.sender, _proposalId, vote);
    }

    // 5. Interest and Yield Generation (Simplified)
    function calculateInterest(uint256 amount, uint256 interestRate, uint256 duration) internal pure returns (uint256) {
        return (amount * interestRate * duration) / 100 / 365;
    }
}
