import { Link } from "react-router-dom";

function Error() {

  return (
    <>
      <h2>404: Seite nicht gefunden!</h2>
      <Link to={'/'}><b>Gehe zurück zum Start</b></Link>
    </>
  );
}

export default Error;
