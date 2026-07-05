import React, { useState } from "react";
import { ArrowRight, Church, User, ShieldCheck } from "lucide-react";
import heroImg from "../../assets/hero.png";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Aqui conectaremos com nosso Axios dps!
  };

  return (
    <div className="login-container">
      {/* LADO ESQUERDO: BANNER */}
      <div className="login-banner" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="banner-header">
          <div className="logo-box">
            <Church size={24} className="text-white" />
          </div>
          <div>
            <h2>IASD Escalas</h2>
            <span>Gestão Eclesiástica</span>
          </div>
        </div>

        <div className="banner-body">
          <h1>Servir com ordem,<br />adorar com amor.</h1>
          <p>
            Plataforma de gestão de escalas para líderes, anciãos e membros da
            Igreja Adventista do Sétimo Dia. Organize os cultos, acompanhe os
            departamentos e edifique a comunidade.
          </p>

          <div className="stats-grid">
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
          </div>
        </div>

        <div className="banner-footer">
          <p>"Tudo, porém, seja feito com decência e ordem." — 1 Cor 14:40</p>
        </div>
      </div>

      {/* LADO DIREITO: FORMULÁRIO */}
      <div className="login-form-side">
        <div className="form-wrapper">
          <span className="badge">• Acesso à Plataforma</span>
          <h3>Entre na sua conta</h3>
          <p className="subtitle">Use suas credenciais ou entre com um dos perfis de demonstração.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="voce@igreja.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Entrar <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <span>OU ACESSO RÁPIDO</span>
          </div>

          <div className="quick-access">
            <button className="qa-card member">
              <div className="icon-wrapper">
                <User size={18} />
              </div>
              <div className="text">
                <span>Entrar como</span>
                <strong>Membro</strong>
              </div>
            </button>

            <button className="qa-card leader">
              <div className="icon-wrapper">
                <ShieldCheck size={18} />
              </div>
              <div className="text">
                <span>Entrar como</span>
                <strong>Líder</strong>
              </div>
            </button>
          </div>

          <p className="terms">
            Ao entrar você concorda com os termos de uso pastorais.
          </p>
        </div>
      </div>
    </div>
  );
}