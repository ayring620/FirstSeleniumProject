const XLSX = require('xlsx');

const parseExcel = (fileName, sheetName) => {
    const excelData = XLSX.readFile(fileName);
    return XLSX.utils.sheet_to_json(excelData.Sheets[sheetName]);
};

parseExcel("../data/verify-login-data.xls", "Data").forEach(element =>{
    console.log(element);
});




