const { ethers ,utils } = require('ethers');
const { AlchemyProvider } = require('@ethersproject/providers');

// interact.js
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/wQervsrXuCr31pfJlVI9CUjh1zXElRWu"
API_KEY = "wQervsrXuCr31pfJlVI9CUjh1zXElRWu"
PRIVATE_KEY = "d24c8db45a844cf054c3a02996631e6608bc6723e9f6ce56f0754c861aa98858"
CONTRACT_ADDRESS = "0x4a970d9b0BACC89e37fdA90364F0a761804C98C2"

// For Hardhat 
const contract = require("../../utils/contracts/artifacts/contracts/meat.sol/Meat.json");

exports.retrieveDataBlockchain= async (req,res) => {

        try {
          const netObj = {name: 'maticmum',
            chainId: 80001  // hardwired
          }
            const provider = new AlchemyProvider(netObj, API_KEY);
            let productId = req.params.id;

            const signer = new ethers.Wallet(PRIVATE_KEY, provider);
            const MeatContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
            const BlockINFo =await MeatContract.retrieve(productId);
            
            const [productDetails, snEDate,recordCreationTime, retailorID,retailorReceiveTime, distributorID,distributorReceiveTime] = BlockINFo;
            const [farmID = "", animalID = "", slaughterHouseID = "", butcherID = ""] = productDetails.split(":");
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
                SlaughterHouseID: slaughterHouseID !== "" ? slaughterHouseID : "Not Found",
                ButcherID: butcherID !== "" ? butcherID : "Not Found",
                creationTime:creationTime !== "" ? creationTime:"Not Found",
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
    

          
exports.createProduct= async(req,res)=> {
    const ID=req.body?.ProductID;
    const Details=req.body?.ProductDetails;
    const Dates=req.body?.SnEDate;
    try {
        const netObj = {name: 'maticmum',
          chainId: 80001  // hardwired
        }
          const provider = new AlchemyProvider(netObj, API_KEY);
          const signer = new ethers.Wallet(PRIVATE_KEY, provider);
          const MeatContract = new ethers.Contract(CONTRACT_ADDRESS,contract.abi, signer);
          console.log("here");
          const createTx = await MeatContract.create("test1","Details", "Dates",{gasPrice: 100000000, gasLimit: 10000000});
          console.log("there");
          const CreateRep = await createTx.wait();
          console.log("create() function executed successfully with ID test1")
          console.log(CreateRep);
          const Output ={"ID":ID,"Details":Details,"Dates":Dates};
        console.log(Output);

        return res.status(200).json({
            success: true,
            message: [],
            Output,
          });
        } catch (err) {
            console.log(err);
          let errorMessage = err?.reason;
          return res.status(400).json({
            success: false,
            message: [err,errorMessage],
          });
        }
      };
  //   updatedistributorinBlockchain(){};
//   updatedistributorinBlockchain(){};

    async function main() {
      try {
        const netObj = {
          name: 'maticmum',
          chainId: 80001  // hardwired
        }
        const provider = new ethers.providers.AlchemyProvider(netObj, API_KEY);
        
        const new_network = await provider.getNetwork();
        console.log("Connected to network:", new_network.name);
            
            const signer = new ethers.Wallet(PRIVATE_KEY, provider);
            
            // Contract
            const MeatContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
    
          // Call the create() function
          // const createTx = await MeatContract.create("64500cbec5dc2082386dd57c","63d2a2a98a0027d2d7e51de7:63d2ed0515f1ab6980906e89:63d3040cacba6534e1222af4:644f78290a63f85f9ed43047", "2023-05-02:2023-09-02", { gasLimit: 300000 });
          // const CreateRep = await createTx.wait();
          // console.log("create() function executed successfully with ID 64500cbec5dc2082386dd57c", CreateRep);
      
          // // Call the updateDistributor() function
          // const updateDistributorTx = await MeatContract.UpdateDistributor("64500cbec5dc2082386dd57c", "63c1d7a9027da84b46f15286");
          // const DistributorRep =  await updateDistributorTx.wait();
          // console.log("UpdateDistributor() function executed successfully ",DistributorRep);
          // console.log("Update Distributor of Product ID 64500cbec5dc2082386dd57c with 63c1d7a9027da84b46f15286");
          
      
          // // Call the updateRetailor() function
          // const updateRetailorTx = await MeatContract.UpdateRetailor("64500cbec5dc2082386dd57c", "63c1da687a1519b2b0117de7");
          // const RetailorRep = await updateRetailorTx.wait();
          // console.log("UpdateRetailor() function executed successfully ",RetailorRep);
          // console.log("Update Retailor of Product ID 64500cbec5dc2082386dd57c with 63c1da687a1519b2b0117de7");
          
          // Call the retrieve() function
        } catch (error) {
          console.error(error);
        }
      };