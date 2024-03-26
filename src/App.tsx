import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import "@/styles/globals.scss";
import { useTranslation } from 'react-i18next';


function App() {
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    let lang = window.localStorage.getItem('language') || 'es';
    i18n.changeLanguage(lang);
  })
  
  return (
    <div>
      <h1>{t('test')}</h1>
    </div>
  )
}

export default App
