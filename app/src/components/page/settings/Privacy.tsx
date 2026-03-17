import { useState } from "react";

const PrivacySettings = () => {
  const [privacidad, setPrivacidad] = useState({
    perfilPublico: false,
    mostrarEmail: false,
    analiticas: true,
  });
  return (
    <div className="space-y-6">
      <div className="p-5 bg-base border border-btn-border rounded-xl">
        <p className="text-font-light text-sm leading-relaxed">
          Tu privacidad es importante. Controla qué información compartes y cómo
          se utiliza en la plataforma.
        </p>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-btn-border">
        <div>
          <h4 className="text-font font-semibold mb-1">Perfil Público</h4>
          <p className="text-font-light text-sm">
            Permite que otros usuarios vean tu perfil
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={privacidad.perfilPublico}
            onChange={(e) =>
              setPrivacidad({
                ...privacidad,
                perfilPublico: e.target.checked,
              })
            }
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
          <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
        </label>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-btn-border">
        <div>
          <h4 className="text-font font-semibold mb-1">Mostrar Email</h4>
          <p className="text-font-light text-sm">
            Email visible en tu perfil público
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={privacidad.mostrarEmail}
            onChange={(e) =>
              setPrivacidad({
                ...privacidad,
                mostrarEmail: e.target.checked,
              })
            }
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
          <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
        </label>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-btn-border">
        <div>
          <h4 className="text-font font-semibold mb-1">Analíticas de Uso</h4>
          <p className="text-font-light text-sm">
            Ayúdanos a mejorar el producto
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={privacidad.analiticas}
            onChange={(e) =>
              setPrivacidad({
                ...privacidad,
                analiticas: e.target.checked,
              })
            }
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
          <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
        </label>
      </div>

      <div className="pt-4">
        <button className="px-6 py-3 text-font-light border border-btn-border rounded-lg hover:bg-base transition-all font-semibold">
          Descargar mis datos
        </button>
      </div>
    </div>
  );
};
export default PrivacySettings;
