// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaUserCog,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
  FaRobot,
  FaBuilding,
} from "react-icons/fa"; 
import logo from "../assets/images/logo.jpg";

const Sidebar = ({ sidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Usuario");
  const [userRole, setUserRole] = useState("Invitado");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  React.useEffect(() => {
    if (!sidebarOpen) {
      setOpenMenu(null);
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserRole = localStorage.getItem("userRole");
    setUsername(storedUsername || "Usuario");
    setUserRole(storedUserRole || "Invitado");
  }, [location.pathname]);

  const menuItems = [
    { title: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/admin/dashboard" },
    {
      title: "Administración",
      icon: <FaUserCog />,
      key: "administracion",
      subItems: [
        { name: "Usuarios", path: "/admin/usuarios" },
        { name: "Roles", path: "/admin/roles" },
        { name: "Empleado", path: "/admin/empleados" },
        { name: "Cargos", path: "/admin/cargos" },
        { name: "Nominas", path: "/admin/nominas" },
      ],
    },
    {
      title: "Residencial",
      icon: <FaBuilding />,
      key: "residencial",
      subItems: [
        { name: "Propietario", path: "/admin/propietarios" },
        { name: "Inquilino", path: "/admin/inquilinos" },
        { name: "Familiar", path: "/admin/familiares" },
        { name: "Visitante", path: "/admin/visitantes" },
        { name: "Vehiculo", path: "/admin/vehiculos" },
        { name: "Unidad", path: "/admin/unidades" },
        { name: "Bloque", path: "/admin/bloques" },
        { name: "Mascotas", path: "/admin/mascotas" },
        { name: "Visitas", path: "/admin/visitas" },
        { name: "Incidentes", path: "/admin/incidentes" },
        { name: "Objetos Perdidos", path: "/admin/objetos-perdidos" },
      ],
    },
    {
      title: "Finanzas",
      icon: <FaMoneyBillWave />,
      key: "finanzas",
      subItems: [
        { name: "Contrato", path: "/admin/contratos" },
        { name: "Multa", path: "/admin/multas" },
        { name: "Reportes", path: "/admin/reportes" },
        { name: "Expensa", path: "/admin/expensas" },
        { name: "Servicios", path: "/admin/servicios" },
        { name: "Áreas Comunes", path: "/admin/areas-comunes" },
        { name: "Reservas", path: "/admin/reservas" },
      ],
    },
    {
      title: "Seguridad IA",
      icon: <FaRobot className="w-5 h-5" />,
      key: "seguridad-ia",
      subItems: [
        { name: "Reconocimiento facial", path: "/admin/reconocimiento-facial" },
        { name: "Reconocimiento vehicular", path: "/admin/reconocimiento-vehicular" },
        { name: "Enrolar persona", path: "/admin/enrolar-persona" },
        { name: "Detectar problemas", path: "/admin/detectar-problemas" },
      ],
    },
  ];

  const NavItem = ({ to, icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-3 flex items-center space-x-4 rounded-lg ${
          isActive
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : "text-gray-500 group"
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );

  return (
    <aside
      className={`bg-white h-screen flex flex-col border-r transition-all duration-500 ease-in-out ${
        sidebarOpen 
          ? "w-64 flex-shrink-0" 
          : "w-0 overflow-hidden"
      }`}
    >
      <div className="h-16 flex items-center justify-center px-4 border-b">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className={`h-12 w-auto transition-opacity duration-500 ease-in-out ${
            sidebarOpen ? "opacity-100 delay-100" : "opacity-0 delay-0"
          }`} />
        </Link>
      </div>

      <nav className={`flex-1 overflow-y-auto p-4 space-y-2 transition-opacity duration-500 ease-in-out ${
        sidebarOpen ? "opacity-100 delay-100" : "opacity-0 delay-0"
      }`} style={{ minWidth: sidebarOpen ? '256px' : '0px' }}>
        {menuItems.map((menu) => (
          <div key={menu.key}>
            {menu.subItems ? (
              <>
                <div
                  className="px-4 py-3 flex items-center justify-between space-x-4 rounded-lg text-gray-500 group cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleMenu(menu.key)}
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    {menu.icon}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{menu.title}</span>
                  </div>
                  {openMenu === menu.key ? (
                    <FaChevronDown className="text-xs flex-shrink-0" />
                  ) : (
                    <FaChevronRight className="text-xs flex-shrink-0" />
                  )}
                </div>
                {openMenu === menu.key && (
                  <ul className="ml-4 mt-2 space-y-1 transition-all duration-300 ease-in-out">
                    {menu.subItems.map((sub, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block p-2 rounded-md transition-colors duration-200 ${
                              isActive
                                ? "text-sky-600 bg-gray-100"
                                : "text-gray-500 hover:bg-gray-100"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavItem to={menu.path} icon={menu.icon}>
                {menu.title}
              </NavItem>
            )}
          </div>
        ))}
      </nav>

      <div className={`p-4 border-t transition-opacity duration-500 ease-in-out ${
        sidebarOpen ? "opacity-100 delay-100" : "opacity-0 delay-0"
      }`}>
        <div className="flex items-center mb-4 min-w-0">
          <FaUserCircle className="text-2xl text-gray-500 mr-3 flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-gray-800 truncate whitespace-nowrap">
              {username}
            </span>
            <span className="text-xs text-gray-400 capitalize truncate whitespace-nowrap">{userRole}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group w-full hover:bg-gray-100 min-w-0"
        >
          <FaSignOutAlt className="flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
