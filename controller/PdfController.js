const base64Img = require('base64-img');

const {createPdf} = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = vfsFonts.pdfMake.vfs;

pdfMake.vfs = vfsFonts.pdfMake.vfs;


exports.generatePdf =async (req, res) => {
    try{
  
    const fname = "Example PDF";
  
    const FarmName = req.body?.farm_name;
    const FarmAddress = req.body?.farm_address;
    const CattleTAG = req.body?.animal_uuid;
    const CattleDOB = req.body?.animal_dob;
    const Breed = req.body?.breed_name;
    const SlaughterName = req.body?.name;
    const SlaughterAddress = req.body?.address;
    const OwnerName = req.body?.owner_name;
    const ButcherName = req.body?.Butchername;
    const ButcherID = req.body?.nic;
    const DistributorID = req.body?.distributor_uuid;
    const DistributorName = req.body?.Dname;
    const RetailorID = req.body?.retailor_uuid;
    const RetailorName = req.body?.Rname;


// const imageData = base64Img.base64Sync('Logo.png');

    var documentDefinition = {
        content: [
          // {
          //       image: `data:image/png;base64,${imageData}`,
          //       width: 200,
          //       alignment: 'center'
          //   },
            { text: '\nProduct Autheniticity Report  ', style: 'header', alignment: 'center' },
            { text: 'Reporte de inspección\n\n', style: 'subheader', alignment: 'center' },
            'El siguiente reporte tiene como objetivo describir los resultados encontrados a partir de la inspección en la fecha específica.',
            { text: 'Authenticity Report', style: 'subheader' },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    body: [
                        
                        ['Product ID:', { text: `${ fname }`, noWrap: true }],
                        ['Slaughter Date:', { text: `${ fname }`, noWrap: true }],
                        ['Expiry Date:', { text: `${ fname }`, noWrap: true }],
                        ['Product ID generated On:', { text: `${ fname }`, noWrap: true }],

                        ['Farm Name:', { text: `${ FarmName }`, noWrap: true }],
                        ['Farm Address:', { text: `${ FarmAddress }`, noWrap: true }],
                        ['Cattle Tag:', { text: `${ CattleTAG }`, noWrap: true }],
                        ['Cattle Date of birth:', { text: `${ CattleDOB }`, noWrap: true }],
                        ['Cattle Breed:', { text: `${ Breed }`, noWrap: true }],
                        
                        ['Slaughter House Name:', { text: `${ SlaughterName }`, noWrap: true }],
                        ['Slaughter House Address:', { text: `${ SlaughterAddress }`, noWrap: true }],
                        ['Owner:', { text: `${ OwnerName }`, noWrap: true }],
                        ['Butcher ID:', { text: `${ ButcherID }`, noWrap: true }],
                        ['Butcher Name:', { text: `${ ButcherName }`, noWrap: true }],
                        
                        ['Distributor ID:', { text: `${ DistributorID }`, noWrap: false }],
                        ['Distributor Name:', { text: `${ DistributorName }`, noWrap: true }],
                        ['Distributor Receiving time:', { text: `${ fname }`, noWrap: true }],
                        
                        ['Retailor ID:', { text: `${ RetailorID }`, noWrap: true }],
                        ['Retailor Name:', { text: `${ RetailorName }`, noWrap: true }],
                        ['Retailor Receiving time:', { text: `${ fname }`, noWrap: true }],
                        
                    ]
                }
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    };


    const pdfDoc = createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename="${fname}.pdf"`
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
        
        });}catch(err){
            console.log(err);
        }
};