import { memo } from "react";
import useSheets from "../../data/hook/useSheets";
import generatePDFReport from "../../utils/report";
import Button from "../Button";
import { chartIcon, ClockIcon, ConfigIcon, dowloadIcon, filterIcon, IconeAjustes, plusIcon } from "../icons/Icones";
interface ControllBarProps {
  handleToggle: () => void;
  handleToggleManageProps: () => void;
  setIsOpen4: (current: boolean) => void;
  toogleChart: () => void;
  toogleFeed: () => void;
}
function ControllBar(props: ControllBarProps) {
  const { sheet, sumAllItems, getStats: getStatistics } = useSheets();
  const { handleToggle, handleToggleManageProps, setIsOpen4 } = props;
  return (
    <div className="flex flex-1 w-full mt-3">
      <div className="flex w-full justify-end">
        <Button
            ClassName="mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-[15%] h-[3rem] md:w-[3%]"
            onClick={props.toogleChart}
            icon={chartIcon(3)}
            iconClassName="dark:text-[#00F0FF] text-[#0085FF]"
          ></Button>
        {sheet.session.canEditItems ? (
          <Button
            ClassName="md:p-2 mt-1 rounded-lg ml-2 dark:text-white w-[15%] h-[3rem] md:w-[3%]"
            onClick={handleToggle}
            classChildren="dark:text-[#00F0FF] text-[#0085FF]"
            // text="Criar Gasto"
            // textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
          >
            <p>{plusIcon(8)}</p>
          </Button>
        ) : (
          <></>
        )}
        {sheet.session.canManageSheetProps && (
          <Button
            ClassName="mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-[15%] h-[3rem] md:w-[3%]"
            onClick={handleToggleManageProps}
            icon={ConfigIcon(8)}
            iconClassName="dark:text-[#00F0FF] text-[#0085FF]"
          ></Button>
        )}
        {sheet.session.authenticated && (
          <Button
            ClassName="px-2 py-1 mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-[15%] h-[3rem] md:w-[3%]"
            onClick={() => setIsOpen4(true)}
            // text="Filtros"
            // textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
            classChildren="dark:text-[#00F0FF] text-[#0085FF]"
            iconClassName="dark:text-[#00F0FF] text-[#0085FF]"
          >
            <p>{filterIcon(8)}</p>
          </Button>
        )}
        <Button
            ClassName="mt-1 rounded-lg ml-2 flex justify-center dark:text-white w-[15%] h-[3rem] md:w-[3%]"
            onClick={props.toogleFeed}
            icon={ClockIcon(8)}
            iconClassName="dark:text-[#00F0FF] text-[#0085FF]"
          ></Button>
      </div>
    </div>
  );
}
export default memo(ControllBar);
