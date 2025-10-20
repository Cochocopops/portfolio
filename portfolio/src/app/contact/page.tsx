export default function ContactPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '1rem' }}>Contact</h1>
      <p style={{ color: '#555', maxWidth: 600, textAlign: 'center' }}>
        Pour me contacter, envoie un email à <a href="mailto:example@example.com">example@example.com</a> ou utilise le formulaire (à implémenter).
      </p>
    </main>
  );
}
