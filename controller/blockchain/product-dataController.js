const { ethers, JsonRpcProvider } = require("ethers");
const abi = require("../../utils/contracts/product.abi.js");

// Contract Address 0xa043a232a1692bdccc7d0d132f719cc446838bac
const contractAddress = "0xa043a232a1692bdccc7d0d132f719cc446838bac";

const getDataFromBlockchain = async (req, res) => {
  let productId = req.params.id;

  const ether = new JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/B3JfkysRdqmgLjwYq95KKwNzaQQU5bez",
  );
  const abiJson = JSON.parse(abi);
  const myNewContract = new ethers.Contract(contractAddress, abiJson, ether);
  try {
    const [productDetails, snEDate,recordCreationTime, retailorID,retailorReceiveTime, distributorID,distributorReceiveTime] =
      await myNewContract["retrieve"](productId);

    // Splitting the productDetails and SnE Date using ":" as limiter  and assigning it to respective variables.

    const [farmID = "", animalID = "", slaughterHouseID = "", butcherID = ""] = productDetails.split(":");
    const [slaughterDate = "", expiryDate = ""] = snEDate.split(":");
    
    //converting TimeStamps from uint256 to String
    const RCTimetemp = new Date(recordCreationTime * 1000); // Convert to milliseconds by multiplying with 1000
    const CreationTimeString=RCTimetemp.toString();
    
    const RRTimetemp = new Date(retailorReceiveTime * 1000); // Convert to milliseconds by multiplying with 1000
    const RetailorTimeString=RRTimetemp.toString();

    const DRTimetemp = new Date(distributorReceiveTime * 1000); // Convert to milliseconds by multiplying with 1000
    const DistributorTimeString=DRTimetemp.toString();


    const productInfo = {
      FarmID: farmID !== "" ? farmID : "Not Found",
      AnimalID: animalID !== "" ? animalID : "Not Found",
      SlaughterHouseID: slaughterHouseID !== "" ? slaughterHouseID : "Not Found",
      ButcherID: butcherID !== "" ? butcherID : "Not Found",
      CreationTimeString:CreationTimeString !== "" ? CreationTimeString:"Not Found",
      SlaughterDate: slaughterDate !== "" ? slaughterDate : "Not Found",
      ExpiryDate: expiryDate !== "" ? expiryDate : "Not Found",
      DistributorID: distributorID !== "" ? distributorID : "Not Found",
      DistributorTimeString: DistributorTimeString !== "" ? DistributorTimeString:"Not Found",
      RetailorID: retailorID !== "" ? retailorID : "Not Found",
      RetailorTimeString: RetailorTimeString !== "" ? RetailorTimeString:"Not Found",
    };
    return res.status(200).json({
      success: true,
      message: [],
      productInfo,
    });
  } catch (err) {
    let errorMessage = err?.reason;
    errorMessage = errorMessage + " Invalid QR Code";
    return res.json({
      success: false,
      message: [errorMessage],
    });
  }
};

module.exports = {
  getDataFromBlockchain,
};
