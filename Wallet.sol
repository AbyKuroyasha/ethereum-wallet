// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
    event Deposit(address indexed _from, uint _value);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Transfer(address(this), msg.sender, _amount);
    }

    function transfer(address _to, uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
    }

    function approve(address _spender, uint _amount) public {
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
    }

    function transferFrom(address _from, address _to, uint _amount) public {
        require(balances[_from] >= _amount, "Insufficient balance");
        require(allowed[_from][msg.sender] >= _amount, "Allowance exceeded");
        balances[_from] -= _amount;
        balances[_to] += _amount;
        allowed[_from][msg.sender] -= _amount;
        emit Transfer(_from, _to, _amount);
    }
}
