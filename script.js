// Connect to Ethereum network
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    alert("Please install MetaMask to use this website.");
}

// Contract address and ABI
const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Replace with your contract address
const contractABI = [
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
                    				"internalType": "uint256",
                    				"name": "amount",
                    				"type": "uint256"
                    			}
                    		],
                    		"name": "withdraw",
                    		"outputs": [],
                    		"stateMutability": "nonpayable",
                    		"type": "function"
                    	}
                    ];

// Instantiate contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Get user account and balance
web3.eth.getAccounts().then(accounts => {
    const account = accounts[0];
    document.getElementById('account').innerText = account;

    web3.eth.getBalance(account).then(balance => {
        document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether');
    });
});

// Send Ether function
function sendEther() {
    const amount = prompt("Enter amount of Ether to send:");
    const recipient = prompt("Enter recipient address:");

    if (!amount || !recipient) return;

    web3.eth.sendTransaction({
        from: web3.currentProvider.selectedAddress,
        to: recipient,
        value: web3.utils.toWei(amount, 'ether')
    }).then(() => {
        alert("Transaction sent successfully!");
        // Update balance after transaction
        web3.eth.getBalance(web3.currentProvider.selectedAddress).then(balance => {
            document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether');
        });
    }).catch(error => {
        alert("Transaction failed: " + error.message);
    });
}
