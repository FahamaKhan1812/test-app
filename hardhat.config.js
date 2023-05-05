/**
 * @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = "d24c8db45a844cf054c3a02996631e6608bc6723e9f6ce56f0754c861aa98858";
const API_URL = "https://polygon-mumbai.g.alchemy.com/v2/wQervsrXuCr31pfJlVI9CUjh1zXElRWu";
// const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.4",
  //  defaultNetwork: "matic.mumbai",
   networks: {
      hardhat: {},
      mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
