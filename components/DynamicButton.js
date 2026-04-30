// Pour un bouton simple : <DynamicButton text="Mon bouton" />
// Pour un lien : <DynamicButton text="Aller sur Google" url="https://google.com" className="white" />

import React from 'react';
import Link from 'next/link';

// props: url (string), text (string), className (string optionnel)
function DynamicButton({ url, text, className = '', onClick }) {
  // Si url est fourni, on rend un lien, sinon un bouton simple
  if (url) {
    return (
      <Link href={url} legacyBehavior>
        <a className={className}>{text}</a>
      </Link>
    );
  }
  return <button className={className} onClick={onClick}>{text}</button>;
}

export default DynamicButton;
