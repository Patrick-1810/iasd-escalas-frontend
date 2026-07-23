import { useState, useEffect } from "react";
import { ArrowRight, User, ShieldCheck } from "lucide-react";
import { Input } from "../../components/Input/Input";
import { QuickAccessCard } from "../../components/QuickAccessCard/QuickAccessCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import adventistLogo from "../../assets/adventistSymbol.svg"; 
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IASD Escalas";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard"); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciais inválidas. Verifique seu e-mail e senha.");
    }
  };

  const handleMemberAccess = () => {
    loginAsGuest();
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      {/* LADO ESQUERDO: BANNER (ASIDE) */}
      <aside className="login-banner">
        <header className="banner-header">
          <div className="logo-box">
            <img 
              src={adventistLogo} 
              alt="Logo IASD" 
              style={{ width: "28px", height: "28px", objectFit: "contain" }} 
            />
          </div>
          <div>
            <h2>IASD Escalas</h2>
            <span>Gestão Eclesiástica</span>
          </div>
        </header>

        <article className="banner-body">
          <h1>Servir com ordem,<br />adorar com amor.</h1>
          <p>
            Plataforma de gestão de escalas para líderes, anciãos e membros da
            Igreja Adventista do Sétimo Dia. Organize os cultos, acompanhe os
            departamentos e edifique a comunidade.
          </p>

          <section className="stats-grid" aria-label="Estatísticas da plataforma">
            <div className="stat-item">
              <strong>6</strong>
              <span>Departamentos</span>
            </div>
            <div className="stat-item">
              <strong>3</strong>
              <span>Cultos semanais</span>
            </div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Responsivo</span>
            </div>
          </section>
        </article>

        <footer className="banner-footer">
          <cite>"Tudo, porém, seja feito com decência e ordem." — 1 Cor 14:40</cite>
        </footer>
      </aside>

      {/* LADO DIREITO: FORMULÁRIO */}
      <main className="login-form-side">
        <div className="form-wrapper">
          <span className="badge" role="status">• Acesso à Plataforma</span>
          <h3>Entre na sua conta</h3>
          <p className="subtitle">Membros possuem acesso livre. Líderes entram com e-mail e senha.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="E-mail do Líder"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-submit">
              Entrar como Líder <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <span>OU ACESSO RÁPIDO</span>
          </div>

          <section className="quick-access" aria-label="Acesso rápido por perfil">
            <QuickAccessCard
              variant="member"
              title="Acesso Membro"
              icon={<User size={18} />}
              onClick={handleMemberAccess}
            />

            <QuickAccessCard
              variant="leader"
              title="Área do Líder"
              icon={<ShieldCheck size={18} />}
              onClick={() => {
                document.getElementById("email")?.focus();
              }}
            />
          </section>

          <footer className="terms">
            <p>Apenas líderes autorizados possuem credenciais de alteração.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}