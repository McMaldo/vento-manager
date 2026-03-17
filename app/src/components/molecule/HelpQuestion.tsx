import DetailsButton from "../atom/buttons/Details";

const HelpQuestion = () => {
  return (
    <div className="p-5 bg-base border border-btn-border rounded-xl">
      <h4 className="text-font font-bold mb-2 text-sm">¿Necesitas ayuda?</h4>
      <p className="text-font-light text-xs mb-3">
        Visita nuestro centro de ayuda para más información
      </p>
      <DetailsButton href="/ayuda" label="Ver Documentación" />
    </div>
  );
};
export default HelpQuestion;
