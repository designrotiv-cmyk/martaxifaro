import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  pt: {
    // Header & Navigation
    'header.call': 'Ligar',
    'header.whatsapp': 'WhatsApp',

    // Hero Section
    'hero.tagline': 'Bem-vindo a bordo!',
    'hero.title': 'Explore a Ria Formosa',
    'hero.titleHighlight': 'com Mar Taxi Faro',
    'hero.subtitle': 'Táxi aquático privado para as ilhas. Rapidez, flexibilidade e conforto garantidos. Sem filas, sem horários fixos. Apenas você, o mar e a liberdade.',
    'hero.bookNow': 'Agendar Agora',
    'hero.badge1': 'Operador experiente',
    'hero.badge2': 'Serviço personalizado',
    'hero.badge3': 'Horários flexiveis',

    // About Section
    'about.title': 'Conheça João',
    'about.intro': 'Sou o João, um experiente guia turístico da Ria Formosa em Faro. Com anos de experiência e paixão pelo mar, ofereço serviços de táxi privados e em grupo, garantindo a experiência de viagem perfeita para as suas necessidades.',
    'about.description': 'Conheço cada canto destas ilhas mágicas. Cada viagem é uma oportunidade para criar memórias inesquecíveis e descobrir a beleza autêntica da Ria Formosa.',
    'about.mission': 'Meu objetivo é oferecer transporte rápido, confortável e seguro, sem complicações. Você merece uma experiência pessoal, não um serviço corporativo.',
    'about.experience': 'Experiência',
    'about.experienceDesc': 'Guia turístico experiente com profundo conhecimento da Ria Formosa',
    'about.personalized': 'Personalizado',
    'about.personalizedDesc': 'Atendimento direto e pessoal para cada cliente',
    'about.flexibility': 'Flexibilidade',
    'about.flexibilityDesc': 'Horários e roteiros adaptados às suas preferências',

    // Islands Section
    'islands.title': 'Nossas Ilhas e Preços',
    'islands.subtitle': 'Escolha o seu destino. Preços para até 5 passageiros. Grupos a partir de 10 pessoas com desconto especial.',
    'islands.upTo5': 'Até 5 pessoas',
    'islands.groups': 'Grupos (10+)',
    'islands.perPerson': '/pessoa',
    'islands.extraPassenger': '+5€ por passageiro extra',
    'islands.bookButton': 'Agendar',

    // Island Names & Descriptions
    'island.praiaFaro': 'Praia de Faro',
    'island.praiaFaroDesc': 'Praia urbana com fácil acesso, ideal para banhistas e famílias.',
    'island.deserta': 'Ilha Deserta',
    'island.desertaDesc': 'Ilha selvagem e intocada, paraíso para quem procura isolamento.',
    'island.farol': 'Ilha do Farol',
    'island.farolDesc': 'Famosa pelo farol histórico e vistas panorâmicas espetaculares.',
    'island.hangares': 'Ilha dos Hangares',
    'island.hangaresDesc': 'Ilha tranquila com história militar, ideal para exploração.',
    'island.culatra': 'Ilha da Culatra',
    'island.culatraDesc': 'Ilha piscatória autêntica com aldeias coloridas e vida local.',

    // Ria Formosa Section
    'riaFormosa.title': 'A Ria Formosa',
    'riaFormosa.description': 'A Ria Formosa é um sistema lagunar de grandes dimensões que se estende ao longo de 60 km da costa sotavento do Algarve e ocupa cerca de 18.000 hectares. É a mais importante zona húmida do sul de Portugal.\n\nA paisagem em que se misturam os azuis da ria, do mar e do céu, é deslumbrante. Inclui uma grande variedade de habitats: ilhas-barreira, sapais, bancos de areia, dunas, salinas. O que propicia uma enorme diversidade de fauna e de flora.\n\nQuem gosta de sol e mar, encontra nas ilhas da Ria Formosa verdadeiros paraísos com extensos areais pouco frequentados. Visite-nos... Estamos à sua espera!',

    // Final CTA Section
    'cta.title': 'Pronto para a sua aventura?',
    'cta.subtitle': 'Não espere mais. Agende agora mesmo ou contacte João diretamente. Resposta em minutos, viagem em horas.',
    'cta.bookNow': 'Agendar Agora',
    'cta.whatsapp': 'Contactar via WhatsApp',
    'cta.call': 'Ligar: +351 924 400 173',
    'cta.footer': 'Horários Flexíveis • Resposta rápida • Serviço personalizado',

    // Booking Modal
    'booking.title': 'Agendar Viagem',
    'booking.destination': 'Destino',
    'booking.selectDestination': 'Selecione um destino',
    'booking.date': 'Data',
    'booking.passengers': 'Número de Passageiros',
    'booking.name': 'Nome',
    'booking.email': 'Email',
    'booking.phone': 'Telefone',
    'booking.notes': 'Observações (opcional)',
    'booking.sendWhatsapp': 'Enviar via WhatsApp',
    'booking.cancel': 'Cancelar',

    // Footer
    'footer.location': 'Portas do Mar, Faro',
    'footer.phone': '+351 924 400 173',
    'footer.islands': 'Ilhas',
    'footer.about': 'Sobre',
    'footer.contact': 'Contacto',
  },
  en: {
    // Header & Navigation
    'header.call': 'Call',
    'header.whatsapp': 'WhatsApp',

    // Hero Section
    'hero.tagline': 'Welcome aboard!',
    'hero.title': 'Explore Ria Formosa',
    'hero.titleHighlight': 'with Mar Taxi Faro',
    'hero.subtitle': 'Private water taxi to the islands. Speed, flexibility and comfort guaranteed. No queues, no fixed schedules. Just you, the sea and freedom.',
    'hero.bookNow': 'Book Now',
    'hero.badge1': 'Experienced operator',
    'hero.badge2': 'Personalized service',
    'hero.badge3': 'Available 24/7',

    // About Section
    'about.title': 'Meet João',
    'about.intro': 'I\'m João, an experienced tour guide of Ria Formosa in Faro. With years of experience and passion for the sea, I offer private and group water taxi services, ensuring the perfect travel experience for your needs.',
    'about.description': 'I know every corner of these magical islands. Each journey is an opportunity to create unforgettable memories and discover the authentic beauty of Ria Formosa.',
    'about.mission': 'My goal is to provide fast, comfortable and safe transport, without complications. You deserve a personal experience, not a corporate service.',
    'about.experience': 'Experience',
    'about.experienceDesc': 'Experienced tour guide with deep knowledge of Ria Formosa',
    'about.personalized': 'Personalized',
    'about.personalizedDesc': 'Direct and personal attention for each client',
    'about.flexibility': 'Flexibility',
    'about.flexibilityDesc': 'Schedules and itineraries adapted to your preferences',

    // Islands Section
    'islands.title': 'Our Islands & Prices',
    'islands.subtitle': 'Choose your destination. Prices for up to 5 passengers. Groups from 10 people with special discount.',
    'islands.upTo5': 'Up to 5 people',
    'islands.groups': 'Groups (10+)',
    'islands.perPerson': '/person',
    'islands.extraPassenger': '+5€ per extra passenger',
    'islands.bookButton': 'Book',

    // Island Names & Descriptions
    'island.praiaFaro': 'Faro Beach',
    'island.praiaFaroDesc': 'Urban beach with easy access, ideal for swimmers and families.',
    'island.deserta': 'Deserta Island',
    'island.desertaDesc': 'Wild and untouched island, paradise for those seeking isolation.',
    'island.farol': 'Farol Island',
    'island.farolDesc': 'Famous for its historic lighthouse and spectacular panoramic views.',
    'island.hangares': 'Hangares Island',
    'island.hangaresDesc': 'Quiet island with military history, ideal for exploration.',
    'island.culatra': 'Culatra Island',
    'island.culatraDesc': 'Authentic fishing island with colorful villages and local life.',

    // Ria Formosa Section
    'riaFormosa.title': 'Ria Formosa',
    'riaFormosa.description': 'Ria Formosa is a large lagoon system that extends for 60 km along the leeward coast of the Algarve and covers about 18,000 hectares. It is the most important wetland zone in southern Portugal.\n\nThe landscape where the blues of the lagoon, sea and sky blend is stunning. It includes a great variety of habitats: barrier islands, salt marshes, sandbanks, dunes, salt pans. This provides enormous diversity of fauna and flora.\n\nThose who love sun and sea will find true paradises in the islands of Ria Formosa with extensive and rarely visited sandy areas. Visit us... We are waiting for you!',

    // Final CTA Section
    'cta.title': 'Ready for your adventure?',
    'cta.subtitle': 'Don\'t wait any longer. Book now or contact João directly. Response in minutes, trip in hours.',
    'cta.bookNow': 'Book Now',
    'cta.whatsapp': 'Contact via WhatsApp',
    'cta.call': 'Call: +351 924 400 173',
    'cta.footer': 'Flexible Hours • Quick response • Personalized service',

    // Booking Modal
    'booking.title': 'Book Your Trip',
    'booking.destination': 'Destination',
    'booking.selectDestination': 'Select a destination',
    'booking.date': 'Date',
    'booking.passengers': 'Number of Passengers',
    'booking.name': 'Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.notes': 'Notes (optional)',
    'booking.sendWhatsapp': 'Send via WhatsApp',
    'booking.cancel': 'Cancel',

    // Footer
    'footer.location': 'Portas do Mar, Faro',
    'footer.phone': '+351 924 400 173',
    'footer.islands': 'Islands',
    'footer.about': 'About',
    'footer.contact': 'Contact',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLanguageState(saved);
    } else {
      // Check browser language
      const browserLang = navigator.language.startsWith('en') ? 'en' : 'pt';
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
