const reader = require('xlsx')
const fs = require('fs');
// Reading our test file
const file = reader.readFile('./product.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   let count = 0
   temp.forEach((res, key) => {

      let jsondata = {
         "name": "#"+ count +" "+ res.Brand+ " " + res.Category,
         "description": "Icury 100 NFT collection",
         "symbol": "icury",
         "seller_fee_basis_points": 250,
         "image": count +".png",
         "attributes": [
            {
               "trait_type": "IcecatID",
               "value": res['IcecatID']
            },
            {
               "trait_type": "Brand",
               "value": res['Brand']
            },
            {
               "trait_type": "Product Code",
               "value": res['Product Code']
            },
            {
               "trait_type": "Category",
               "value":res['Category']
            },
            {
               "trait_type": "Time stamp",
               "value": res['Time stamp']
            },
            {
               "trait_type": "Permalink",
               "value": res['Permalink']
            }
         ],
         "external_url":"https://icecat.biz/p/vendorName/mpn/desc-325299.html",
         "properties": {
            "creators": [
               {
                     "address": "BX2f9gsc2P53AawBKbJMpYNevSD3aM1V7fN8F8JgB6rF",
                     "share": 100
               }
            ],
            "files": [
               {
                     "uri": count +".png",
                     "type": "image/png"
               }
            ]
         },
         "collection": {
   
         }
      }
      //data.push(jsondata)
      //data.push(jsondata.attributes)
      // include node fs module     
      // writeFile function with filename, content and callback function
      let newData = JSON.stringify(jsondata);
      fs.writeFile('./assets/'+count+".json", newData, function (err) {
      if (err) throw err;
         console.log('File is created successfully.');
      });
      count++
   })
}
  
// Printing data
console.log(data)