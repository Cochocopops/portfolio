"use client";
import React, { useState } from 'react';

export default function UtilisateurPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categories, setCategories] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      let imageBase64 = '';
      let imageExt = '';
      if (imageFile) {
        const buf = await imageFile.arrayBuffer();
        imageBase64 = `data:${imageFile.type};base64,${Buffer.from(buf).toString('base64')}`;
        const parts = imageFile.name.split('.');
        imageExt = parts[parts.length - 1];
      }
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, categories, imageBase64, imageExt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erreur');
      alert('Projet ajouté !');
      setTitle(''); setExcerpt(''); setCategories(''); setImageFile(null);
    } catch (err: any) {
      alert(err.message || 'Impossible d\'ajouter le projet');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexDirection: 'column',
      paddingTop: 'calc(var(--nav-h) + var(--gap))',
      paddingLeft: '3.5rem',
      paddingRight: '3.5rem',
      paddingBottom: '4rem'
    }}>
      <h1 style={{ color: 'black', fontSize: '2.2rem', marginBottom: '1rem' }}>
        Ajouter un projet
      </h1>
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        maxWidth: 1100
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="title">Titre</label>
          <input id="title" required value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px', borderRadius: 10, border: '1.5px solid #111' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="categories">Catégories (séparées par des virgules)</label>
          <input id="categories" value={categories} onChange={e => setCategories(e.target.value)} placeholder="BIOMATERIALS, CODE" style={{ padding: '10px', borderRadius: 10, border: '1.5px solid #111' }} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="excerpt">Description courte</label>
          <textarea id="excerpt" required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={5} style={{ padding: '10px', borderRadius: 10, border: '1.5px solid #111' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="image">Image principale</label>
          <input id="image" type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button disabled={loading} type="submit" style={{ borderRadius: 999, border: '1.5px solid #111', background: '#111', color: '#fff', padding: '10px 16px', cursor: 'pointer' }}>{loading ? 'Ajout…' : 'Ajouter le projet'}</button>
          <span style={{ color: '#666' }}>L’image sera stockée dans /public/uploads et visible dans Projects.</span>
        </div>
      </form>
    </main>
  );
}
