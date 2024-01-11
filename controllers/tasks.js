const { ethers } = require('ethers');
const TestTokenABI = require('../AbiInfo.json');
require('dotenv').config(); // Load environment variables from .env file

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);

const testTokenAddress = process.env.CONTRACT_ADDRESS; // Replace with your deployed contract address
const testTokenContract = new ethers.Contract(testTokenAddress, TestTokenABI.abi, provider);

const getBalance = async (req, res) => {
  const walletAddress = req.query.address;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    const balance = await testTokenContract.balanceOf(walletAddress);
    
    // Get the token decimals from the contract
    const decimals = await testTokenContract.decimals();
    
    // Convert balance to actual number of tokens
    const numberOfTokens = ethers.utils.formatUnits(balance, decimals);
    
    res.json({ balance: numberOfTokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getBalance
}
