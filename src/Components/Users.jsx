import React, { useState, useMemo } from 'react';
import UserCard from './UserCard';
import userImg from '../assets/user.png';
import usersData from '../data/usersData';

function Users({ currentUser }) {
  const [users, setUsers] = useState(() => {
    // prefer persisted users in localStorage (updated by toggles), fallback to bundled usersData
    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const list = master.map((u) => ({ id: u.id, name: u.fullName, role: u.role, blocked: u.blocked }));
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  });
  const [page, setPage] = useState(1);

  const perPage = 6;
  const totalPages = Math.ceil(users.length / perPage);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return users.slice(start, start + perPage);
  }, [users, page]);

  const toggleBlock = (id) => {
    // only admins can block/unblock
    if (!currentUser || currentUser.role !== 'Administrador') {
      alert('No eres admin');
      return;
    }

    // prevent blocking protected admin (e.g., Jazmin id 6) or last admin
    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const target = master.find((m) => m.id === id);
    if (!target) {
      alert('Usuario no existe');
      return;
    }

    // count admins
    const adminCount = master.filter((m) => m.role === 'Administrador').length;
    if (target.role === 'Administrador' && adminCount <= 1) {
      alert('No se puede quitar el último administrador');
      return;
    }

    // toggle in local state and persist to master
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, blocked: !x.blocked } : x)));
    // update master array and persist
    const updatedMaster = master.map((m) => (m.id === id ? { ...m, blocked: !m.blocked } : m));
    localStorage.setItem('usersData', JSON.stringify(updatedMaster));
    const newTarget = updatedMaster.find((m) => m.id === id);
    if (newTarget.blocked) {
      alert('Cuenta bloqueada');
    } else {
      alert('Cuenta desbloqueada');
    }
  };
  const toggleAdmin = (id) => {
    // only admins can change roles
    if (!currentUser || currentUser.role !== 'Administrador') {
      alert('No eres admin');
      return;
    }
    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const target = master.find((m) => m.id === id);
    if (!target) { alert('Usuario no existe'); return; }
    const adminCount = master.filter((m) => m.role === 'Administrador').length;
    // prevent removing last admin
    if (target.role === 'Administrador' && adminCount <= 1) {
      alert('No se puede quitar el último administrador');
      return;
    }
    // toggle in local state and persist
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role: x.role === 'Administrador' ? 'Usuario' : 'Administrador' } : x)));
    const updatedMaster = master.map((m) => (m.id === id ? { ...m, role: m.role === 'Administrador' ? 'Usuario' : 'Administrador' } : m));
    localStorage.setItem('usersData', JSON.stringify(updatedMaster));
    alert('Rol actualizado');
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
    gap: '24px',
  };

  const paginationStyle = {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  };

  return (
    <>
      <h2>Usuarios</h2>
      <div style={gridStyle}>
        {pagedUsers.map((u) => (
          <UserCard
            key={u.id}
            {...u}
            img={userImg}
            onToggleBlock={() => toggleBlock(u.id)}
            onToggleAdmin={() => toggleAdmin(u.id)}
            disableAdmin={u.id === 6}
            disableBlock={u.id === 6}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div style={paginationStyle}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: '6px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: page === i + 1 ? '#28a745' : '#fff',
                color: page === i + 1 ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default Users;
