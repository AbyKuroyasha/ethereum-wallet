// script.js

// Initialize Web3.js
let web3;

// Check if Web3 is injected by the browser (MetaMask)
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
} else {
    // Fallback to localhost provider if no injected Web3 instance is found
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// ABI and address of your deployed smart contract
const contractABI = [
                     	{
                     		"anonymous": false,
                     		"inputs": [
                     			{
                     				"indexed": true,
                     				"internalType": "address",
                     				"name": "_owner",
                     				"type": "address"
                     			},
                     			{
                     				"indexed": true,
                     				"internalType": "address",
                     				"name": "_spender",
                     				"type": "address"
                     			},
                     			{
                     				"indexed": false,
                     				"internalType": "uint256",
                     				"name": "_value",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "Approval",
                     		"type": "event"
                     	},
                     	{
                     		"anonymous": false,
                     		"inputs": [
                     			{
                     				"indexed": true,
                     				"internalType": "address",
                     				"name": "_from",
                     				"type": "address"
                     			},
                     			{
                     				"indexed": false,
                     				"internalType": "uint256",
                     				"name": "_value",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "Deposit",
                     		"type": "event"
                     	},
                     	{
                     		"anonymous": false,
                     		"inputs": [
                     			{
                     				"indexed": true,
                     				"internalType": "address",
                     				"name": "_from",
                     				"type": "address"
                     			},
                     			{
                     				"indexed": true,
                     				"internalType": "address",
                     				"name": "_to",
                     				"type": "address"
                     			},
                     			{
                     				"indexed": false,
                     				"internalType": "uint256",
                     				"name": "_value",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "Transfer",
                     		"type": "event"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "address",
                     				"name": "",
                     				"type": "address"
                     			},
                     			{
                     				"internalType": "address",
                     				"name": "",
                     				"type": "address"
                     			}
                     		],
                     		"name": "allowed",
                     		"outputs": [
                     			{
                     				"internalType": "uint256",
                     				"name": "",
                     				"type": "uint256"
                     			}
                     		],
                     		"stateMutability": "view",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "address",
                     				"name": "_spender",
                     				"type": "address"
                     			},
                     			{
                     				"internalType": "uint256",
                     				"name": "_amount",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "approve",
                     		"outputs": [],
                     		"stateMutability": "nonpayable",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "address",
                     				"name": "",
                     				"type": "address"
                     			}
                     		],
                     		"name": "balances",
                     		"outputs": [
                     			{
                     				"internalType": "uint256",
                     				"name": "",
                     				"type": "uint256"
                     			}
                     		],
                     		"stateMutability": "view",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [],
                     		"name": "deposit",
                     		"outputs": [],
                     		"stateMutability": "payable",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "address",
                     				"name": "_to",
                     				"type": "address"
                     			},
                     			{
                     				"internalType": "uint256",
                     				"name": "_amount",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "transfer",
                     		"outputs": [],
                     		"stateMutability": "nonpayable",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "address",
                     				"name": "_from",
                     				"type": "address"
                     			},
                     			{
                     				"internalType": "address",
                     				"name": "_to",
                     				"type": "address"
                     			},
                     			{
                     				"internalType": "uint256",
                     				"name": "_amount",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "transferFrom",
                     		"outputs": [],
                     		"stateMutability": "nonpayable",
                     		"type": "function"
                     	},
                     	{
                     		"inputs": [
                     			{
                     				"internalType": "uint256",
                     				"name": "_amount",
                     				"type": "uint256"
                     			}
                     		],
                     		"name": "withdraw",
                     		"outputs": [],
                     		"stateMutability": "nonpayable",
                     		"type": "function"
                     	}
                     ];
const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Replace with your contract's address

// Instantiate the contract
const simpleWalletContract = new web3.eth.Contract(contractABI, contractAddress);

// Update UI with balance
web3.eth.getAccounts().then(function(accounts) {
    const account = accounts[0];
    web3.eth.getBalance(account).then(function(balance) {
        const etherBalance = web3.utils.fromWei(balance, 'ether');
        document.getElementById('balance').textContent = etherBalance;
    });
});

// Function to deposit Ether
function deposit() {
    const amount = parseFloat(prompt("Enter amount to deposit:"));
    web3.eth.getAccounts().then(function(accounts) {
        const account = accounts[0];
        simpleWalletContract.methods.deposit().send({ value: web3.utils.toWei(amount.toString(), 'ether'), from: account })
            .on('transactionHash', function(hash){
                console.log(hash);
                // Update UI or show loading spinner
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log(confirmationNumber);
                // Update UI or show success message
            })
            .on('error', function(error){
                console.error(error);
                // Display error message to the user
            });
    });
}

// Function to withdraw Ether
function withdraw() {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    web3.eth.getAccounts().then(function(accounts) {
        const account = accounts[0];
        simpleWalletContract.methods.withdraw(web3.utils.toWei(amount.toString(), 'ether')).send({ from: account })
            .on('transactionHash', function(hash){
                console.log(hash);
                // Update UI or show loading spinner
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log(confirmationNumber);
                // Update UI or show success message
            })
            .on('error', function(error){
                console.error(error);
                // Display error message to the user
            });
    });
}

// Function to send Ether
function send() {
    const recipient = prompt("Enter recipient's address:");
    const amount = parseFloat(prompt("Enter amount to send:"));
    web3.eth.getAccounts().then(function(accounts) {
        const account = accounts[0];
        simpleWalletContract.methods.transfer(recipient, web3.utils.toWei(amount.toString(), 'ether')).send({ from: account })
            .on('transactionHash', function(hash){
                console.log(hash);
                // Update UI or show loading spinner
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log(confirmationNumber);
                // Update UI or show success message
            })
            .on('error', function(error){
                console.error(error);
                // Display error message to the user
            });
    });
}

// Function to add address to address book
function addToAddressBook() {
    const newAddress = document.getElementById('new-address').value;
    // Add new address to the address book
    // Update UI to display the new address
}
