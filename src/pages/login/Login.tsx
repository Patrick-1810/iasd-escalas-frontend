import React, { useState } from "react";
import { ArrowRight, Church, User, ShieldCheck } from "lucide-react";
import { Input } from "../../components/Input/Input";
import { QuickAccessCard } from "../../components/QuickAccessCard/QuickAccessCard";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      {/* LADO ESQUERDO: BANNER (ASIDE) */}
      <aside 
        className="login-banner" 
      >
        <header className="banner-header">
          <div className="logo-box">
            <Church size={24} className="text-white" />
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
            Igreja Adventistado Sétimo Dia. Organize os cultos, acompanhe os
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
          <p className="subtitle">Use suas credenciais ou entre com um dos perfis de demonstração.</p>

          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="E-mail"
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
              Entrar <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <span>OU ACESSO RÁPIDO</span>
          </div>

          <section className="quick-access" aria-label="Acesso rápido demonstrativo">
            <QuickAccessCard
              variant="member"
              title="Membro"
              icon={<User size={18} />}
              onClick={() => console.log("Acesso rápido: Membro")}
            />

            <QuickAccessCard
              variant="leader"
              title="Líder"
              icon={<ShieldCheck size={18} />}
              onClick={() => console.log("Acesso rápido: Líder")}
            />
          </section>

          <footer className="terms">
            <p>Ao entrar você concorda com os termos de uso e privacidade.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}