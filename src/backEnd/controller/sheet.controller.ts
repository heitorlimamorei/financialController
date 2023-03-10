import sheetService from "../services/sheet.service";
interface sheetProps {
  id: string;
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
  name: string;
}
interface NewSheetProps {
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
  name: string;
}
function isValidSheetProps(sheet, newSheet = true) {
  if (newSheet) {
    if (
      (sheet.owner && sheet.tiposDeGastos,
      sheet.totalValue && sheet.type && sheet.name)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      (sheet.id && sheet.owner && sheet.tiposDeGastos,
      sheet.totalValue && sheet.type && sheet.name)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

async function createSheet(newSheet: NewSheetProps) {
  try {
    if (isValidSheetProps(newSheet, true)) {
      return await sheetService.createSheet({
        owner: newSheet.owner,
        tiposDeGastos: newSheet.tiposDeGastos,
        totalValue: newSheet.totalValue,
        type: newSheet.type,
        name: newSheet.name,
      });
    } else {
      throw new Error("Planilha fora de formato!");
    }
  } catch (err) {
    throw err;
  }
}
async function getById(sheetId: string, email: string) {
  if (sheetId && email) {
    return await sheetService.getSheetById(sheetId, email);
  } else {
    throw new Error(" SheetId or Email are missing!");
  }
}
async function deleteSheet(sheetId: string, email: string) {
  if (sheetId && email) {
    return await sheetService.deleteSheet(sheetId, email);
  } else {
    throw new Error(" SheetId or Email are missing!");
  }
}
async function updateSheet(sheet: sheetProps, email: string) {
  if (isValidSheetProps(sheet, false)) {
    return await sheetService.updateSheet(sheet, email);
  }
}
export default {
  createSheet,
  getById,
  deleteSheet,
  updateSheet,
};
