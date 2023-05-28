const { AlchemyProvider } = require("@ethersproject/providers");
const { ethers } = require("ethers");

API_URL =
  "https://polygon-mumbai.g.alchemy.com/v2/wQervsrXuCr31pfJlVI9CUjh1zXElRWu";
API_KEY = "wQervsrXuCr31pfJlVI9CUjh1zXElRWu";
PRIVATE_KEY =
  "d24c8db45a844cf054c3a02996631e6608bc6723e9f6ce56f0754c861aa98858";
CONTRACT_ADDRESS = "0x4a970d9b0BACC89e37fdA90364F0a761804C98C2";

// For Hardhat
const contract = require("../../utils/contracts/artifacts/contracts/meat.sol/Meat.json");

// For Mobile users only to scan QR Code For Prduct details
exports.retrieveDataBlockchain = async (req, res) => {
  try {
    const netObj = {
      name: "maticmum",
      chainId: 80001, // hardwired
    };
    const provider = new AlchemyProvider(netObj, API_KEY);
    let productId = req.params.id;

    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const MeatContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contract.abi,
      signer,
    );
    const BlockINFo = await MeatContract.retrieve(productId);

    const [
      productDetails,
      snEDate,
      recordCreationTime,
      retailorID,
      retailorReceiveTime,
      distributorID,
      distributorReceiveTime,
    ] = BlockINFo;
    if (recordCreationTime == 0) {
      throw new Error("Invalid QR code");
    }    
    const [farmID = "", animalID = "", slaughterHouseID = "", butcherID = ""] =
      productDetails.split(":");
    const [slaughterDate = "", expiryDate = ""] = snEDate.split(":");
    const creationTimeMillis = Number(recordCreationTime) * 1000;
    const creationTime = new Date(creationTimeMillis);

    const DRTimetemp = Number(distributorReceiveTime) * 1000;
    const DistributorTimeString = new Date(DRTimetemp);

    const retailorReceiveTimetemp = Number(retailorReceiveTime) * 1000;
    const RetailorTimeString = new Date(retailorReceiveTimetemp);

    const productInfo = {
      FarmID: farmID !== "" ? farmID : "Not Found",
      AnimalID: animalID !== "" ? animalID : "Not Found",
      SlaughterHouseID:
        slaughterHouseID !== "" ? slaughterHouseID : "Not Found",
      ButcherID: butcherID !== "" ? butcherID : "Not Found",
      creationTime: creationTime !== "" ? creationTime : "Not Found",
      SlaughterDate: slaughterDate !== "" ? slaughterDate : "Not Found",
      ExpiryDate: expiryDate !== "" ? expiryDate : "Not Found",
      DistributorID: distributorID !== "" ? distributorID : "Not Found",
      DistributorTimeString:
        DistributorTimeString !== "" ? DistributorTimeString : "Not Found",
      RetailorID: retailorID !== "" ? retailorID : "Not Found",
      RetailorTimeString:
        RetailorTimeString !== "" ? RetailorTimeString : "Not Found",
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
      message: errorMessage,
    });
  }
};

exports.createProduct = async (req, res) => {
  const ID = req.body?.ProductID;
  const Details = req.body?.ProductDetails;
  const Dates = req.body?.SnEDate;
  try {
    const network = "maticmum";
    const provider = new ethers.providers.AlchemyProvider(network, API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const MeatContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contract.abi,
      signer,
    );
    const createTx = await MeatContract.create(ID, Details, Dates, {
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
      gasLimit: 10000000,
    });
    await createTx.wait();
    const Output = { ID, Details, Dates };
    return res.status(200).json({
      success: true,
      message: [],
      data: Output,
    });
  } catch (err) {
    let errorMessage = err?.reason;
    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: err,
    });
  }
};

exports.updatedistributorinBlockchain = async (req, res) => {
  const ID = req.body?.ProductID;
  const DistributorID = req.body?.distributorid;
  try {
    const network = "maticmum";
    const provider = new ethers.providers.AlchemyProvider(network, API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const MeatContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contract.abi,
      signer,
    );

    const updateDistributorTx = await MeatContract.UpdateDistributor(
      ID,
      DistributorID,
      {
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
        gasLimit: 10000000,
      },
    );
    await updateDistributorTx.wait();

    const Output = { ID, DistributorID };
    return res.status(200).json({
      success: true,
      message: [],
      data: Output,
    });
  } catch (err) {
    let errorMessage = err?.reason;
    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: err,
    });
  }
};

exports.updateretailorinBlockchain = async (req, res) => {
  const ID = req.body?.ProductID;
  const RetailorID = req.body?.retailorid;
  try {
    const network = "maticmum";
    const provider = new ethers.providers.AlchemyProvider(network, API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const MeatContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contract.abi,
      signer,
    );

    const updateRetailorTx = await MeatContract.UpdateRetailor(ID, RetailorID, {
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
      gasLimit: 10000000,
    });
    await updateRetailorTx.wait();

    const Output = { ID, RetailorID };
    return res.status(200).json({
      success: true,
      message: [],
      data: Output,
    });
  } catch (err) {
    let errorMessage = err?.reason;
    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: err,
    });
  }
};
