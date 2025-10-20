import React from 'react';

export default function UtilisateurPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '1rem' }}>
        Espace Utilisateur
      </h1>
      <p style={{ color: '#555' }}>
        Ici tu pourras gérer tes informations, projets et préférences.
      </p>
    </main>
  );
}
