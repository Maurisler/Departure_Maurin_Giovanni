import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Error() {
  const { t } = useTranslation();

  return (
    <>
      <h2>404: Seite nicht gefunden!</h2>
      <Link to={'/'}><b>Gehe zurück zum Start</b></Link>
    </>
  );
}

export default Error;
