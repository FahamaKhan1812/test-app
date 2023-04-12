const { ethers, JsonRpcProvider } = require("ethers");
const abi = require("../../utils/contracts/product.abi.js");

// Contract Address 0xa043a232a1692bdccc7d0d132f719cc446838bac
const contractAddress = "0xa043a232a1692bdccc7d0d132f719cc446838bac";

const getDataFromBlockchain = async (req, res) => {
  let productId = req.params.id

  const ether = new JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/B3JfkysRdqmgLjwYq95KKwNzaQQU5bez",
  );
  const abiJson = JSON.parse(abi);
  const myNewCOnract = new ethers.Contract(contractAddress, abiJson, ether);
  try {
    const [productDetails, snEDate, retailorID, distributorID] =
      await myNewCOnract["retrieve"](productId);
    const productInfo = {
      "Product Details": productDetails !== "" ? productDetails : "Not Found",
      SnEDate: snEDate !== "" ? snEDate : "Not Found",
      RetailorID: retailorID !== "" ? retailorID : "Not Found",
      DistributorID: distributorID !== "" ? distributorID : "Not Found",
    };
    return res.status(200).json({
      success: true,
      message: [],
      productInfo,
    });
  } catch (err) {
    let errorMessage = err?.reason;
    errorMessage = errorMessage + "Invalid QR Code";
    return res.json({
      success: false,
      message:[errorMessage],
    });
  }
};

module.exports = {
  getDataFromBlockchain,
};
