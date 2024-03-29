import useAppData from "../../data/hook/useAppData";
import BodyHome from "../home/BodyHome";
import CabecalhoHome from "../home/CabecalhoHome";

function Login() {
  const { tema, alternarTema } = useAppData();
  return (
    <div className={`${tema} w-full h-full dark:bg-[#232323] bg-[#E0E5EC]`}>
      <div className=" w-full transition-all duration-500 ease-linear dark:bg-[#232323] bg-[#E0E5EC] pb-[4.15rem]">
        <CabecalhoHome tema={tema} alternarTema={alternarTema} />
        <BodyHome />
      </div>
    </div>
  );
}

export default Login;
