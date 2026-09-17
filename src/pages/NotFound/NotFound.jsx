import { Link } from "react-router";
import { Ghost } from "lucide-react";
import Header from "../../components/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="page" style={{ textAlign: "center", paddingTop: 80 }}>
        <Ghost size={40} style={{ margin: "0 auto 16px", color: "var(--accent)" }} />
        <h1 className="page-title">Página não encontrada</h1>
        <p className="page-subtitle" style={{ margin: "0 auto 24px" }}>
          Esse título saiu de cartaz. Volte para a página inicial.
        </p>
        <Link to="/" className="chip chip--active" style={{ display: "inline-block" }}>
          Voltar para Em alta
        </Link>
      </div>
    </>
  );
}

export default NotFound
