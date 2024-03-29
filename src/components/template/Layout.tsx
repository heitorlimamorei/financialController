import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import useAppData from "../../data/hook/useAppData";
import ForcarAutenticacao from "../auth/ForcarAutenticacao";
interface TemplateProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export default function Template(props: TemplateProps) {
  const { tema } = useAppData();
  return (
    <ForcarAutenticacao>
      <div className={` ${tema} flex h-[100vh] w-[100%] `}>
        <div
          className={`flex flex-col w-full overflow-y-scroll bg-[#E0E5EC] dark:bg-[#232323] transition-all duration-500 ease-linear`}
        >
          <Cabecalho/>
          <Conteudo>{props.children}</Conteudo>
        </div>
      </div>
    </ForcarAutenticacao>
  );
}
