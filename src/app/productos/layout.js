"use client";

import FlashMessage from '../../components/FlashMessage';
import { useState} from 'react';

export default function ProductosLayout({ children }) {
  const [flashMessage, setFlashMessage] = useState(null);
  return (
    <div>
      <FlashMessage message = {flashMessage?.message} type = {flashMessage?.type} />
      
      <main>
        {children}
      </main>
    </div>
  );
}
