import { useState } from "react";
import MainButton from "../../atom/buttons/Main";
import SecondaryButton from "../../atom/buttons/Secondary";
import Input from "../../atom/Input";

const AccountSettings = () => {
  const dangerZone = [
    {
      title: "Cerrar Sesión",
      desc: "No afectará los datos de la cuenta, pero se deberá volver a ingresar para seguir operando",
      icon: "power-off",
      btn: "Cerrar Sesión",
    },
    {
      title: "Borrar Datos de la Cuenta",
      desc: "La eliminación de los datos será permanente, pero se mantedrá intacta la cuenta",
      icon: "trash",
      btn: "Borrar Datos",
    },
    {
      title: "Borrar la Cuenta",
      desc: "Una vez borrada la cuenta tendrás un mes para recuperarla.",
      icon: "trash",
      btn: "Borrar Cuenta",
    },
  ];

  const [account, setAccount] = useState([
    {
      label: "Nombre completo",
      value: "Usuario Demo",
    },
    {
      label: "Email",
      value: "demo@vento.com",
    },
    {
      label: "Cargo",
      value: "Testing",
    },
  ]);

  return (
    <div className="space-y-6">
      {account.map(({ label, value }, index) => (
        <Input
          key={label}
          label={label}
          value={value}
          onChange={(newValue) =>
            setAccount((prev) =>
              prev.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      value: newValue,
                    }
                  : item,
              ),
            )
          }
        />
      ))}
      <div className="flex gap-4">
        <MainButton text="Guardar" />
        <SecondaryButton text="Cancelar" />
      </div>
      <hr className="border-t border-btn-border" />
      <h2 className="text-3xl font-bold text-font mb-2">Zona de Peligro</h2>
      <p className="text-font-light">
        Se encuentran acciones con efectos críticos o permanentes
      </p>
      {dangerZone.map(({ title, desc, icon, btn }, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between md:items-center"
        >
          <div className="flex flex-col">
            <h3 className="text-font font-semibold">{title}</h3>
            <p className="text-font-light">{desc}</p>
          </div>
          <SecondaryButton key={index} icon={icon} text={btn} danger />
        </div>
      ))}
    </div>
  );
};
export default AccountSettings;
