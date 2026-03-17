const IntegrationsSettings = () => {
  return (
    <div className="space-y-4">
      <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              G
            </div>
            <div>
              <h4 className="text-font font-semibold">Google Workspace</h4>
              <p className="text-font-light text-sm">Gmail, Drive, Calendar</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
            Conectar
          </button>
        </div>
      </div>

      <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              S
            </div>
            <div>
              <h4 className="text-font font-semibold">Slack</h4>
              <p className="text-font-light text-sm">
                Conectado • Canal: #proyectos
              </p>
            </div>
          </div>
          <button className="px-5 py-2 border-2 border-btn-border text-font-light font-semibold rounded-lg hover:bg-base transition-all">
            Desconectar
          </button>
        </div>
      </div>

      <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              T
            </div>
            <div>
              <h4 className="text-font font-semibold">Trello</h4>
              <p className="text-font-light text-sm">
                Gestión de tareas y tableros
              </p>
            </div>
          </div>
          <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
            Conectar
          </button>
        </div>
      </div>

      <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              F
            </div>
            <div>
              <h4 className="text-font font-semibold">Figma</h4>
              <p className="text-font-light text-sm">Diseño colaborativo</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
            Conectar
          </button>
        </div>
      </div>
    </div>
  );
};
export default IntegrationsSettings;
