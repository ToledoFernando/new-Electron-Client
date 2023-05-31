import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Typewriter from "typewriter-effect";
import iconCopy from "../../../public/copy.svg";
import "./Home.scss";

function Home() {
  const title = useRef<HTMLDivElement>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("toledof764@gmail.com");
    toast.success("Email Copiado");
  };
  // useEffect(() => {
  //   if (title.current) {
  //     Typewriter(title.current, {
  //       strings: ["Bienvenido a ElectronPlayer v2.0"],
  //       autoStart: true,
  //       loop: false,
  //     });
  //   }
  // }, []);
  return (
    <div className="AppHome">
      <div className="AppHome__title">
        {/* <div onClick={() => toast("My first toast")} ref={title} /> */}
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("Bienvenido a ElectronPlayer v2.0").start();
          }}
          options={{
            strings: ["Bienvenido a ElectronPlayer v2.0"],
            loop: false,
            delay: 50,
          }}
        />
      </div>
      <div className="AppHome__description">
        <div>
          <p>Listas de cambios en verciones</p>
          <ul>
            <div>
              <h3>v2.0.0 - 12-Junio-2023 {"(actual)"}</h3>
              <li>- Se agrego funcionalidad de reproduccion en la nube -</li>
              <li>- Cambios Total de estilo de la aplicacion</li>
              <li>
                - Se agrego boton "Reportar" par informar algun problema sobre
                alguna musica
              </li>
            </div>
            <div>
              <h3>v1.1.0 - 28 -Marzo-2023</h3>
              <li>- Se agrego Funcionar en segundo plano - 28-Marzo-2023</li>
            </div>
            <div>
              <h3>v1.0.6 - 17-Marzo-2023</h3>
              <li>- Optimizacion al cargar las musicas - 17-Marzo-2023</li>
            </div>
            <div>
              <h3>v1.0.0 - 04-Marzo-2023</h3>
              <li>- Lanzamiento de ElectronPlayer - 04-Marzo-2023</li>
            </div>
          </ul>
        </div>
      </div>
      <div className="footer_description">
        <div className="footer_description_Soporte">
          <p>
            Contacto/Soporte: toledof764@gmail.com{" "}
            <span onClick={copyEmail}>
              <img src={iconCopy} width={15} height={15} />
            </span>
          </p>
        </div>
        <div className="web_oficial">
          <p>
            Para ver mas detalle de los cambios de esta nueva vercion puedes
            revisar la web oficial dando{" "}
            <button onClick={window.openWebOficial}>Click Aqui</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
