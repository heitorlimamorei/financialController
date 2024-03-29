import React, { useEffect, useState } from "react";
import Input from "../input";
import Button from "../Button";
import router from "next/router";
import useSheets from "../../data/hook/useSheets";
import { trashIcon } from "../icons/Icones";
interface ManageSheetProps {
  toggleIsOpen: () => void;
}
function ManageSheetProps(props: ManageSheetProps) {
  const { toggleIsOpen } = props;
  const [name, setName] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [tiposDeGastos, setTiposDeGastos] = useState(["X"]);
  const [newSpent, setNewSpent] = useState("");
  const [canDelete, setCanDelete] = useState(false);
  const { sheet, updateSheet, deleteSheet } = useSheets();
  useEffect(() => {
    const {
      name: nameCurrent,
      totalValue: totalCurrent,
      tiposDeGastos: tiposCurrent,
    } = sheet.data;
    if (
      name !== undefined &&
      totalValue !== undefined &&
      tiposDeGastos !== undefined
    ) {
      setTotalValue(totalCurrent);
      setName(nameCurrent);
      setTiposDeGastos(tiposCurrent);
    }
  }, [sheet.data]);
  async function handleSubmit() {
    await updateSheet({
      name,
      totalValue,
      tiposDeGastos,
    });
    console.log(sheet);
    toggleIsOpen();
  }
  function filterByIndex(index: number) {
    const arrayClone = [...tiposDeGastos].filter((spent, i) => i !== index);
    setTiposDeGastos(arrayClone);
  }
  function addSpentIntoTheList() {
    const arrayClone = [...tiposDeGastos];
    arrayClone.push(newSpent);
    setTiposDeGastos(arrayClone);
    setNewSpent("");
  }
  async function handleDeleteSheet(){
    if(canDelete){
      if(sheet.session.canDelete){
        await deleteSheet();
        toggleIsOpen();
        router.push("/");
      }
    } else {
      toggleCanDelete();
    }
  }
  function toggleCanDelete(){
    setCanDelete(current => !canDelete)
  }
  return (
    <div>
      <div className="mb-1">
        <label className="block font-medium text-lg mb-1" htmlFor="name">
          Nome da planilha
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="mb-1">
        <label className="block font-medium text-lg mb-1" htmlFor="value">
          Valor total estimado
        </label>
        <Input
          ClassName=""
          type="number"
          id="value"
          name="value"
          value={totalValue}
          onChange={(ev) =>
            setTotalValue(ev.target.value >= 0 ? ev.target.value : 0)
          }
        />
      </div>
      <div className="mb-1">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Modifique os tipos de gastos
        </label>
        <ul className="max-h-[15rem] overflow-y-scroll scroll-m-0">
          {tiposDeGastos.map((tipo, i) => {
            return (
              <li className="flex  flex-row my-2 rounded-xl items-center transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[4.5px_4.5px_10px_#f6f7fb,_-4.5px_-4.5px_10px_#FFFFFF]
              dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]" key={tipo}>
                <h1 className="mx-4 w-[80%]">{tipo}</h1>
                <div className="w-full flex flex-row items-end justify-end">
                  <Button 
                  iconClassName="text-red-600"
                  ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
                  dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
                  shadow-[3px_3px_12px_#727578,-3px_-3px_12px_#ffffff] rounded-xl p-1 justify-self-end mr-5 my-1"
                  onClick={() => filterByIndex(i)}
                  icon={trashIcon(6)}>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex mt-1">
          <Input
            ClassName=""
            type="string"
            id="newSpent"
            name="newSpent"
            value={newSpent}
            onChange={(ev) => setNewSpent(ev.target.value)}
          />
          <button
            className="px-2 ml-1 py-3 rounded-xl bg-green-600 text-white h-[2.4rem] flex items-center"
            onClick={addSpentIntoTheList}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex mt-5 justify-between">
        <Button
          ClassName="px-2 rounded-md mr-3"
          onClick={handleSubmit}
          text={"Salvar alterações"}
          textClassName="px-2 mx-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        {sheet.session.canDelete ? ( <Button
          ClassName="px-2 rounded-md mr-3"
          onClick={handleDeleteSheet}
          text="Deletar tudo"
          textClassName={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252] ${!canDelete ? "cursor-not-allowed" : ""}`}
        ></Button>) : (<></>)}
        <Button
          ClassName="px-2 py-5 rounded-md"
          onClick={toggleIsOpen}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </div>
  );
}
export default React.memo(ManageSheetProps);
