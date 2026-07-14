import { useState, useEffect } from "react";
import { useAuth, api } from "../../contexts/AuthContext";
import { Header } from "../../components/Header/Header";
import { HighlightCard } from "../../components/HighlightCard/HighlightCard";
import { ScheduleColumn } from "../../components/ScheduleColumn/ScheduleColumn";
import "./Dashboard.scss";

interface Duty {
  id: string;
  data: string;
  tipo_culto: "SABADO" | "DOMINGO" | "QUARTA";
  departamento: string;
  membros_escalados: string[];
  observacao?: string;
  criador?: { nome: string };
}

export default function Dashboard() {
  const { user } = useAuth();
  const [escalas, setEscalas] = useState<Duty[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCulto, setFilterCulto] = useState<string>("");
  const [searchMembro, setSearchMembro] = useState<string>("");

  const isAdmin = user?.role === "ADMIN_LEADER";

  const [formData, setFormData] = useState({
    data: "",
    tipo_culto: "SABADO",
    departamento: "PREGACAO",
    membros: "",
    observacao: ""
  });

  const fetchEscalas = async () => {
    try {
      const params: any = {};
      if (filterCulto) params.tipo_culto = filterCulto;
      if (searchMembro) params.membro = searchMembro;

      const response = await api.get("/escalas", { params });
      setEscalas(response.data);
    } catch (err) {
      console.error("Erro ao buscar escalas:", err);
    }
  };

  useEffect(() => {
    fetchEscalas();
  }, [filterCulto, searchMembro]);

  const handleCreateEscala = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateSelected = new Date(formData.data);
      dateSelected.setMinutes(dateSelected.getMinutes() + dateSelected.getTimezoneOffset());

      const payload = {
        data: dateSelected.toISOString(), 
        tipo_culto: formData.tipo_culto,
        departamento: formData.departamento,
        membros_escalados: formData.membros.split(",").map(m => m.trim()).filter(Boolean),
        observacao: formData.observacao || undefined
      };

      await api.post("/escalas", payload);
      setIsModalOpen(false);
      
      setFormData({
        data: "",
        tipo_culto: "SABADO",
        departamento: "PREGACAO",
        membros: "",
        observacao: ""
      });

      fetchEscalas(); 
    } catch (err) {
      alert("Erro ao criar escala. Verifique as informações.");
    }
  };

  const handleDeleteEscala = async (id: string) => {
    if (window.confirm("Deseja realmente excluir esta escala?")) {
      try {
        await api.delete(`/escalas/${id}`);
        fetchEscalas();
      } catch (err) {
        alert("Erro ao excluir escala.");
      }
    }
  };

  const getDepartmentDuties = (dept: string) => {
    return escalas
      .filter((escala) => escala.departamento.toUpperCase() === dept.toUpperCase())
      .map((escala) => {
        const dateObj = new Date(escala.data);
        const formattedDate = dateObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });

        return {
          id: escala.id,
          date: formattedDate,
          dayOfWeek: escala.tipo_culto === "SABADO" ? "Sábado" : escala.tipo_culto === "DOMINGO" ? "Domingo" : "Quarta",
          names: escala.membros_escalados,
          description: escala.observacao
        };
      });
  };

  const columnsConfig = [
    {
      title: "Sonoplastia",
      deptKey: "SONOPLASTIA",
      iconBgColor: "#2563eb",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
    },
    {
      title: "Recepção",
      deptKey: "RECEPCAO",
      iconBgColor: "#0ea5e9",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    {
      title: "Abertura Escola Sabatina",
      deptKey: "ESCOLA_SABATINA",
      iconBgColor: "#4f46e5",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    },
    {
      title: "Pregação",
      deptKey: "PREGACAO",
      iconBgColor: "#1e3a8a",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="14" rx="2" ry="2"></rect><line x1="6" y1="22" x2="18" y2="22"></line><line x1="12" y1="16" x2="12" y2="22"></line></svg>
    },
    {
      title: "Louvor",
      deptKey: "LOUVOR",
      iconBgColor: "#0284c7",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
    },
    {
      title: "Diaconato",
      deptKey: "DIACONATO",
      iconBgColor: "#1e293b",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    }
  ];

  return (
    <div className="dashboard-page">
      <Header />
      
      <main className="container-center dashboard-content">
        <section className="welcome-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="section-badge">Escalas da Semana</span>
            <h1>Olá, <span className="highlight-name">{user?.nome || "Membro"}</span>.</h1>
            <p>{isAdmin ? "Gerencie os departamentos, crie novas escalas e mantenha a ordem nos cultos." : "Confira as escalas dos próximos cultos e encontre onde você foi escalado."}</p>
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
            subtitle="Semana 08"
            phone="(11) 91234-5678"
            footerText="Responsável nos cultos da semana"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>}
          />
        </section>

        <section className="filter-bar">
          <div className="filter-groups">
            <span className="filter-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filtros
            </span>
            <div className="chips-container">
              <button className={`chip ${filterCulto === "" ? "active" : ""}`} onClick={() => setFilterCulto("")}>Todos</button>
              <button className={`chip ${filterCulto === "SABADO" ? "active" : ""}`} onClick={() => setFilterCulto("SABADO")}>Sábado</button>
              <button className={`chip ${filterCulto === "DOMINGO" ? "active" : ""}`} onClick={() => setFilterCulto("DOMINGO")}>Domingo</button>
              <button className={`chip ${filterCulto === "QUARTA" ? "active" : ""}`} onClick={() => setFilterCulto("QUARTA")}>Quarta-feira</button>
            </div>
          </div>

          <div className="search-inputs">
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Buscar por nome do membro..." 
                value={searchMembro}
                onChange={(e) => setSearchMembro(e.target.value)}
              />
            </div>
          </div>
        </section>

        <span className="results-counter">{escalas.length} escala(s) encontrada(s)</span>

        <section className="columns-grid">
          {columnsConfig.map((col, index) => {
            const departmentDuties = getDepartmentDuties(col.deptKey);
            return (
              <ScheduleColumn 
                key={index}
                title={col.title}
                activeCount={departmentDuties.length}
                icon={col.icon}
                iconBgColor={col.iconBgColor}
                duties={departmentDuties}
                isAdmin={isAdmin} 
                onAddClick={() => {
                  setFormData(prev => ({ ...prev, departamento: col.deptKey }));
                  setIsModalOpen(true);
                }}
                onDeleteClick={(duty: any) => handleDeleteEscala(duty.id)} 
              />
            );
          })}
        </section>
      </main>

      {/* Modal de Cadastro */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Escala</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <form className="modal-form" onSubmit={handleCreateEscala}>
              <div className="form-row">
                <div className="form-group">
                  <label>Data</label>
                  <input 
                    type="date" 
                    required
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="modal-input"
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Culto</label>
                  <select 
                    value={formData.tipo_culto}
                    onChange={(e) => setFormData({ ...formData, tipo_culto: e.target.value })}
                    className="modal-input"
                  >
                    <option value="SABADO">Sábado</option>
                    <option value="DOMINGO">Domingo</option>
                    <option value="QUARTA">Quarta-feira</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Departamento</label>
                <select 
                  value={formData.departamento}
                  onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                  className="modal-input"
                >
                  <option value="PREGACAO">Pregação</option>
                  <option value="SONOPLASTIA">Sonoplastia</option>
                  <option value="LOUVOR">Louvor</option>
                  <option value="RECEPCAO">Recepção</option>
                  <option value="ESCOLA_SABATINA">Abertura Escola Sabatina</option>
                  <option value="DIACONATO">Diaconato</option>
                </select>
              </div>

              <div className="form-group">
                <label>Membros Escalados (separe por vírgula)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: João Silva, Maria Souza" 
                  value={formData.membros}
                  onChange={(e) => setFormData({ ...formData, membros: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Observação (opcional)</label>
                <textarea 
                  rows={3} 
                  placeholder="Ex: Tema da pregação, horário especial..." 
                  value={formData.observacao}
                  onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-submit">Criar escala</button>
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