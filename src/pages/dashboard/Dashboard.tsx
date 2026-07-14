import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { HighlightCard } from "../../components/HighlightCard/HighlightCard";
import { ScheduleColumn } from "../../components/ScheduleColumn/ScheduleColumn";
import "./Dashboard.scss";

export default function Dashboard () {
  const [role, setRole] = useState<"membro" | "admin">("membro");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = role === "admin";

  const mockColumns = [
    {
      title: "Sonoplastia",
      activeCount: 3,
      iconBgColor: "#2563eb",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Lucas Ferreira"], description: "Mesa de som + transmissão" },
        { date: "22/02/26", dayOfWeek: "Domingo", names: ["Bruno Vieira"] },
        { date: "25/02/26", dayOfWeek: "Quarta", names: ["Lucas Ferreira"] }
      ]
    },
    {
      title: "Recepção",
      activeCount: 3,
      iconBgColor: "#0ea5e9",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Ana Silva", "Maria Costa", "Beatriz Nunes", "Carla Oliveira"], description: "Equipe de boas-vindas na entrada principal" },
        { date: "22/02/26", dayOfWeek: "Domingo", names: ["Isabela Martins", "Rodrigo Barbosa"] },
        { date: "25/02/26", dayOfWeek: "Quarta", names: ["Marta Cunha", "Vinícius Reis"] }
      ]
    },
    {
      title: "Abertura Escola Sabatina",
      activeCount: 1,
      iconBgColor: "#4f46e5",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Pedro Almeida", "Fernanda Rocha"], description: "Abertura e cânticos iniciais" }
      ]
    },
    {
      title: "Pregação",
      activeCount: 3,
      iconBgColor: "#1e3a8a",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="14" rx="2" ry="2"></rect><line x1="6" y1="22" x2="18" y2="22"></line><line x1="12" y1="16" x2="12" y2="22"></line></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Pr. Daniel Ancião"], description: "Pregador do Dia — Tema: Fé que Move Montanhas" },
        { date: "22/02/26", dayOfWeek: "Domingo", names: ["Anc. Marcos Ribeiro"], description: "Culto Jovem — Evangelismo" },
        { date: "25/02/26", dayOfWeek: "Quarta", names: ["Anc. Sérgio Lopes"], description: "Meditação — Salmo 91" }
      ]
    },
    {
      title: "Louvor",
      activeCount: 3,
      iconBgColor: "#0284c7",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Juliana Santos (líder)", "Rafael Torres", "Camila Dias", "Thiago Melo"], description: "Ministério de Louvor Adoração" },
        { date: "22/02/26", dayOfWeek: "Domingo", names: ["Guilherme Sales (líder)", "Larissa Pinto"], description: "Louvor acústico" },
        { date: "25/02/26", dayOfWeek: "Quarta", names: ["Camila Dias (líder)", "Thiago Melo"], description: "Momento de oração e louvor" }
      ]
    },
    {
      title: "Diaconato",
      activeCount: 3,
      iconBgColor: "#1e293b",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      duties: [
        { date: "21/02/26", dayOfWeek: "Sábado", names: ["Diác. Rafael Mendes"], description: "Diácono da Semana — responsável nos 3 cultos" },
        { date: "22/02/26", dayOfWeek: "Domingo", names: ["Diác. Rafael Mendes"], description: "Diácono da Semana" },
        { date: "25/02/26", dayOfWeek: "Quarta", names: ["Diác. Rafael Mendes"], description: "Diácono da Semana" }
      ]
    }
  ];

  return (
    <div className="dashboard-page">
      <Header currentRole={role} onRoleChange={(newRole) => setRole(newRole)} />
      
      <main className="container-center dashboard-content">
        
        {/* Boas-Vindas*/}
        <section className="welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="section-badge">Escalas da Semana</span>
            {isAdmin ? (
              <>
                <h1>Olá, <span className="highlight-name">Pr. Daniel Ancião</span>.</h1>
                <p>Gerencie os departamentos, crie novas escalas e mantenha a ordem nos cultos.</p>
              </>
            ) : (
              <>
                <h1>Olá, <span className="highlight-name">João</span>.</h1>
                <p>Confira as escalas dos próximos cultos e encontre onde você foi escalado.</p>
              </>
            )}
          </div>

          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: "var(--brand-primary)", color: "#ffffff", border: "none", padding: "0.65rem 1.25rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nova Escala
            </button>
          )}
        </section>

        {/* Cards Superior */}
        <section className="highlights-grid">
          <HighlightCard 
            type="primary"
            badgeText="Ancião do Mês"
            title="Ancião Marcos Ribeiro"
            subtitle="Fevereiro de 2026"
            phone="(11) 98765-4321"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>}
          />
          <HighlightCard 
            type="surface"
            badgeText="Diácono da Semana"
            title="Diác. Rafael Mendes"
            subtitle="Semana 08 — 15 a 21 de Fev"
            phone="(11) 91234-5678"
            footerText="Responsável nos 3 cultos da semana"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>}
          />
        </section>

        {/* Barra de Filtros e Busca */}
        <section className="filter-bar">
          <div className="filter-groups">
            <span className="filter-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filtros
            </span>
            <div className="chips-container">
              <button className="chip active">Todos</button>
              <button className="chip">Sábado</button>
              <button className="chip">Domingo</button>
              <button className="chip">Quarta-feira</button>
            </div>
          </div>

          <div className="search-inputs">
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Buscar por nome do membro..." />
            </div>
            <div className="date-box">
              <input type="text" placeholder="dd/mm/aaaa" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
        </section>

        <span className="results-counter">16 escala(s) encontrada(s)</span>

        {/* Grid das colunas */}
        <section className="columns-grid">
          {mockColumns.map((col, index) => (
            <ScheduleColumn 
              key={index}
              title={col.title}
              activeCount={col.activeCount}
              icon={col.icon}
              iconBgColor={col.iconBgColor}
              duties={col.duties}
              isAdmin={isAdmin} 
              onAddClick={() => setIsModalOpen(true)}
            />
          ))}
        </section>
      </main>

      {/* Modal para demonstração */}
      {isModalOpen && (
        <div className="modal-backdrop" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "500px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Nova Escala</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer" }}>&times;</button>
            </div>
            
            {/* O formulário do modal */}
            <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>Data</label>
                  <input type="date" style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>Tipo de Culto</label>
                  <select style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                    <option>Sábado — Culto Divino</option>
                    <option>Domingo — Evangelismo</option>
                    <option>Quarta — Oração</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>Departamento</label>
                <select style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <option>Pregação</option>
                  <option>Sonoplastia</option>
                  <option>Louvor</option>
                  <option>Recepção</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>Membros Escalados</label>
                <input type="text" placeholder="Nome do membro" style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>Observação (opcional)</label>
                <textarea rows={3} placeholder="Ex: Tema da pregação, horário especial..." style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "none", fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                <button type="submit" style={{ padding: "0.55rem 1.25rem", borderRadius: "8px", backgroundColor: "var(--brand-primary)", color: "#white", border: "none", fontWeight: 600, cursor: "pointer" }}>Criar escala</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="dashboard-footer">
        <p>IASD Escalas • Servindo com ordem e amor • v1.0</p>
      </footer>
    </div>
  );
}