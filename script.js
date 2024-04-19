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
const contractABI = [/* Paste your contract ABI here */];
const contractAddress = '0x...'; // Replace with your contract's address

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
