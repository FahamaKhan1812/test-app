const base64Img = require("base64-img");

const { createPdf } = require("pdfmake/build/pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = vfsFonts.pdfMake.vfs;

pdfMake.vfs = vfsFonts.pdfMake.vfs;

exports.generatePdf = async (req, res) => {
  try {
    const ProductCreationTime = req.body?.ProductCreationTime;
    const ProductID = req.body?.ProductID;

    const SlaughterDate = req.body?.SlaughterDate;
    const ExpiryDate = req.body?.ExpiryDate;

    const FarmName = req.body?.FarmName;
    const FarmAddress = req.body?.FarmAddress;

    const CattleTAG = req.body?.CattleTAG;
    const CattleDOB = req.body?.CattleDOB;

    const Breed = req.body?.breed_name;
    const ArrivalTime = req.body?.ArrivalTime;

    const CattleWeight = req.body?.CattleWeight;
    const CattleGender = req.body?.Gender;

    const Medication = req.body?.Medication;
    const InjuryStatus = req.body?.InjuryStatus;

    const HealthStatus = req.body?.HealthStatus;
    const SlaughterName = req.body?.SlaughterName;

    const SlaughterAddress = req.body?.SlaughterAddress;
    const OwnerName = req.body?.OwnerName;

    const ButcherName = req.body?.ButcherName;
    const ButcherNIC = req.body?.ButcherNIC;

    const DistributorReg = req.body?.DistributorReg;
    const DistributorName = req.body?.DistributorName;

    const DistributorTime = req.body?.DistributorTime;
    const RetailorReg = req.body?.RetailorReg;

    const RetailorName = req.body?.RetailorName;
    const RetailorTime = req.body?.RetailorTime;

    // const imageData = base64Img.base64Sync('Logo.png');

    var documentDefinition = {
      content: [
        // {
        //       image: `data:image/png;base64,${imageData}`,
        //       width: 200,
        //       alignment: 'center'
        //   },
        {
          text: "\nProduct Autheniticity Report  ",
          style: "header",
          alignment: "center",
        },
        // {
        //   text: "Reporte de inspección\n\n",
        //   style: "subheader",
        //   alignment: "center",
        // },
        "The content of this document provides all the necessary information to verify the authenticity of the product in question. It contains details on the product's origin, manufacturing process and other relevant information that can help determine the product's authenticity and provenance.",
        { text: "Authenticity Report", style: "subheader" },
        {
          style: "tableExample",
          table: {
            widths: ["40%", "60%"],
            body: [
              ["Product ID:", { text: `${ProductID}`, noWrap: false }],
              ["Slaughter Date:", { text: `${SlaughterDate}`, noWrap: false }],

              ["Expiry Date:", { text: `${ExpiryDate}`, noWrap: false }],
              [
                "Product ID generated On:",
                { text: `${ProductCreationTime}`, noWrap: false },
              ],

              ["Farm Name:", { text: `${FarmName}`, noWrap: false }],
              ["Farm Address:", { text: `${FarmAddress}`, noWrap: false }],

              ["Cattle Tag:", { text: `${CattleTAG}`, noWrap: false }],
              [
                "Cattle Date of birth:",
                { text: `${CattleDOB}`, noWrap: false },
              ],

              ["Cattle Arrived On:", { text: `${ArrivalTime}`, noWrap: false }],
              ["Cattle Weight:", { text: `${CattleWeight}`, noWrap: false }],

              ["Cattle Gender:", { text: `${CattleGender}`, noWrap: false }],
              ["Cattle Medication:", { text: `${Medication}`, noWrap: false }],

              ["Cattle Injury:", { text: `${InjuryStatus}`, noWrap: false }],
              ["Cattle Health:", { text: `${HealthStatus}`, noWrap: false }],

              ["Cattle Breed:", { text: `${Breed}`, noWrap: false }],
              [
                "Slaughter House Name:",
                { text: `${SlaughterName}`, noWrap: false },
              ],

              [
                "Slaughter House Address:",
                { text: `${SlaughterAddress}`, noWrap: false },
              ],
              ["Owner:", { text: `${OwnerName}`, noWrap: false }],

              ["Butcher ID:", { text: `${ButcherNIC}`, noWrap: false }],
              ["Butcher Name:", { text: `${ButcherName}`, noWrap: false }],

              ["Distributor ID:", { text: `${DistributorReg}`, noWrap: false }],
              [
                "Distributor Name:",
                { text: `${DistributorName}`, noWrap: false },
              ],

              [
                "Distributor Receiving time:",
                { text: `${DistributorTime}`, noWrap: false },
              ],
              ["Retailor ID:", { text: `${RetailorReg}`, noWrap: false }],

              ["Retailor Name:", { text: `${RetailorName}`, noWrap: false }],
              [
                "Retailor Receiving time:",
                { text: `${RetailorTime}`, noWrap: false },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };

    const pdfDoc = createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment;filename="${ProductID}.pdf"`,
      });

      const download = Buffer.from(data.toString("utf-8"), "base64");
      res.end(download);
    });
  } catch (err) {}
};
