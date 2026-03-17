import { useState } from "react";

const NotificationsSettings = () => {
  const [notificaciones, setNotificaciones] = useState({
    email: true,
    push: false,
    sms: true,
    actualizaciones: true,
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-b border-btn-border">
        <div>
          <h4 className="text-font font-semibold mb-1">
            Notificaciones por Email
          </h4>
          <p className="text-font-light text-sm">
            Recibe actualizaciones en tu correo
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificaciones.email}
            onChange={(e) =>
              setNotificaciones({
                ...notificaciones,
                email: e.target.checked,
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
          <h4 className="text-font font-semibold mb-1">Notificaciones Push</h4>
          <p className="text-font-light text-sm">Alertas en tiempo real</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificaciones.push}
            onChange={(e) =>
              setNotificaciones({
                ...notificaciones,
                push: e.target.checked,
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
          <h4 className="text-font font-semibold mb-1">Mensajes SMS</h4>
          <p className="text-font-light text-sm">
            Avisos importantes por texto
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificaciones.sms}
            onChange={(e) =>
              setNotificaciones({
                ...notificaciones,
                sms: e.target.checked,
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
          <h4 className="text-font font-semibold mb-1">
            Actualizaciones del Sistema
          </h4>
          <p className="text-font-light text-sm">Novedades y mejoras</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificaciones.actualizaciones}
            onChange={(e) =>
              setNotificaciones({
                ...notificaciones,
                actualizaciones: e.target.checked,
              })
            }
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
          <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
        </label>
      </div>
    </div>
  );
};
export default NotificationsSettings;
