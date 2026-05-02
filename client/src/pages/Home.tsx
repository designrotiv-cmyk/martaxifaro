import { Phone, MessageCircle, Zap, Users, Clock, Sun, MapPin, ChevronDown, Calendar, User, Mail, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

/**
 * DESIGN PHILOSOPHY: Energético Tropical Vibrante
 * - Cores: Amarelo sol (#FFD700), Turquesa (#1DD1A1), Azul profundo (#003D82)
 * - Tipografia: Poppins Bold para headlines, Poppins Regular para body
 * - Estilo: Ilustrações coloridas, ondas animadas, formas orgânicas, movimento
 * - Foco: Transmitir liberdade, experiência, emoção - não apenas transporte
 * - Conversão: Botões de WhatsApp e chamada sempre visíveis e destacados
 * 
 * UPGRADE v3: Sistema de idiomas (Português e Inglês)
 * - Suporte completo para PT e EN
 * - Seletor de idiomas no header
 * - Preferência persistida em localStorage
 */

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  passengers: number;
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "ilha-culatra",
    date: "",
    passengers: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMessage = language === 'pt' 
    ? "Olá%20João!%20Gostaria%20de%20agendar%20um%20transfer%20para%20as%20ilhas%20da%20Ria%20Formosa."
    : "Hi%20João!%20I%20would%20like%20to%20book%20a%20transfer%20to%20the%20Ria%20Formosa%20islands.";
  const whatsappLink = `https://wa.me/351924400173?text=${whatsappMessage}`;
  const phoneNumber = "+351 924 400 173";

  const islands = [
    {
      name_pt: "Praia de Faro",
      name_en: "Faro Beach",
      price: 40,
      groupPrice: 7.5,
      description_pt: "Praia urbana com fácil acesso, ideal para banhistas e famílias.",
      description_en: "Urban beach with easy access, ideal for swimmers and families.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/PraiadeFaro_d0787ccc.jpeg",
    },
    {
      name_pt: "Ilha Deserta",
      name_en: "Deserta Island",
      price: 50,
      groupPrice: 10,
      description_pt: "Ilha selvagem e intocada, paraíso para quem procura isolamento.",
      description_en: "Wild and untouched island, paradise for those seeking isolation.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/IlhaDeserta_d2d132a9.jpeg",
    },
    {
      name_pt: "Ilha do Farol",
      name_en: "Farol Island",
      price: 50,
      groupPrice: 10,
      description_pt: "Famosa pelo farol histórico e vistas panorâmicas espetaculares.",
      description_en: "Famous for its historic lighthouse and spectacular panoramic views.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/IlhadoFarol_3b5238c3.jpeg",
    },
    {
      name_pt: "Ilha dos Hangares",
      name_en: "Hangares Island",
      price: 60,
      groupPrice: 12.50,
      description_pt: "Ilha tranquila com história militar, ideal para exploração.",
      description_en: "Quiet island with military history, ideal for exploration.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/IlhadosHangares_445d7b72.jpeg",
    },
    {
      name_pt: "Ilha da Culatra",
      name_en: "Culatra Island",
      price: 70,
      groupPrice: 12.50,
      description_pt: "Ilha piscatória autêntica com aldeias coloridas e vida local.",
      description_en: "Authentic fishing island with colorful villages and local life.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/IlhadaCulatra_a13a6325.jpeg",
    },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "passengers" ? parseInt(value) : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedIsland = islands.find(i => 
      (i.name_pt.toLowerCase().replace(/\s+/g, "-") === formData.destination || 
       i.name_en.toLowerCase().replace(/\s+/g, "-") === formData.destination)
    );
    const islandName = language === 'pt' ? selectedIsland?.name_pt : selectedIsland?.name_en;
    
    const message = language === 'pt'
      ? `Olá João! Gostaria de agendar um transfer:\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}\nDestino: ${islandName}\nData: ${formData.date}\nPassageiros: ${formData.passengers}`
      : `Hi João! I would like to book a transfer:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDestination: ${islandName}\nDate: ${formData.date}\nPassengers: ${formData.passengers}`;
    
    const whatsappUrl = `https://wa.me/351924400173?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        title={language === 'pt' ? "Enviar mensagem via WhatsApp" : "Send message via WhatsApp"}
      >
        <MessageCircle size={28} />
      </a>

      {/* Sticky Header with CTA */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-3"
            : "bg-gradient-to-b from-white to-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/manus-storage/LogoMTF_93259149.svg" alt="MarTaxi Faro" className="h-14 w-auto" />
          </div>
          <div className="flex gap-2 sm:gap-3 items-center">
            {/* Language Selector */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1 rounded font-semibold text-sm transition-all ${
                  language === 'pt'
                    ? 'bg-[#003D82] text-white'
                    : 'text-gray-600 hover:text-[#003D82]'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded font-semibold text-sm transition-all ${
                  language === 'en'
                    ? 'bg-[#003D82] text-white'
                    : 'text-gray-600 hover:text-[#003D82]'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="hidden sm:flex items-center gap-2 bg-[#003D82] hover:bg-[#002856] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              <Phone size={18} />
              {t('header.call')}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1DD1A1] hover:bg-[#16B896] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              <MessageCircle size={18} />
              {t('header.whatsapp')}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310419663026750890/HZpZWiAQ988M5z9rej8Ays/hero-boat-ria-formosa-ZZPj6mSzwTAjTbM2cLeEJt.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="text-[#FFD700] font-bold text-lg mb-2">{t('hero.tagline')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t('hero.title')}
              <br />
              <span className="text-[#FFD700]">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setShowBookingForm(true)}
                className="flex items-center justify-center gap-2 bg-[#1DD1A1] hover:bg-[#16B896] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:scale-105 duration-300"
              >
                <Calendar size={24} />
                {t('hero.bookNow')}
              </button>
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#003D82] px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:scale-105 duration-300 border-2 border-[#003D82]"
              >
                <Phone size={24} />
                {phoneNumber}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[#FFD700]" />
                {t('hero.badge1')}
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#FFD700]" />
                {t('hero.badge2')}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#FFD700]" />
                {t('hero.badge3')}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ marginTop: "-1px" }}
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="#F8F9FA"
        ></path>
      </svg>

      {/* About Section - João */}
      <section className="py-16 sm:py-24 bg-[#F8F9FA]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#003D82] mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {t('about.intro')}
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.mission')}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1DD1A1]/20 to-[#FFD700]/20 rounded-2xl p-8 border-l-4 border-[#1DD1A1]">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Zap size={32} className="text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#003D82] text-lg">{t('about.experience')}</h3>
                    <p className="text-gray-700">{t('about.experienceDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users size={32} className="text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#003D82] text-lg">{t('about.personalized')}</h3>
                    <p className="text-gray-700">{t('about.personalizedDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Sun size={32} className="text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#003D82] text-lg">{t('about.flexibility')}</h3>
                    <p className="text-gray-700">{t('about.flexibilityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ marginTop: "-1px" }}
      >
        <path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z"
          fill="#F8F9FA"
        ></path>
      </svg>

      {/* Pricing Section - Islands */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003D82] mb-4">
              {t('islands.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('islands.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((island, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#E0E0E0] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#1DD1A1]"
              >
                <img
                  src={island.image}
                  alt={language === 'pt' ? island.name_pt : island.name_en}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#003D82] mb-2">
                    {language === 'pt' ? island.name_pt : island.name_en}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {language === 'pt' ? island.description_pt : island.description_en}
                  </p>

                  <div className="bg-[#F8F9FA] rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-semibold">{t('islands.upTo5')}:</span>
                      <span className="text-2xl font-bold text-[#1DD1A1]">{island.price}€</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{t('islands.extraPassenger')}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{t('islands.groups')}:</span>
                      <span className="font-semibold text-[#003D82]">{island.groupPrice}€{t('islands.perPerson')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        destination: (language === 'pt' ? island.name_pt : island.name_en).toLowerCase().replace(/\s+/g, "-"),
                      }));
                      setShowBookingForm(true);
                    }}
                    className="w-full bg-[#1DD1A1] hover:bg-[#16B896] text-white py-3 rounded-lg font-bold transition-colors"
                  >
                    {t('islands.bookButton')} {language === 'pt' ? island.name_pt : island.name_en}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Ria Formosa Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#003D82] to-[#1DD1A1]">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('riaFormosa.title')}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
              {t('riaFormosa.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#003D82]">{t('booking.title')}</h3>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                  placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                  placeholder="+351 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.destination')} *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                >
                  {islands.map((island) => (
                    <option key={island.name_pt} value={(language === 'pt' ? island.name_pt : island.name_en).toLowerCase().replace(/\s+/g, "-")}>
                      {language === 'pt' ? island.name_pt : island.name_en} - {island.price}€
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.date')} *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003D82] mb-2">
                  {t('booking.passengers')} *
                </label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1DD1A1]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {language === 'pt' ? (num === 1 ? "Passageiro" : "Passageiros") : (num === 1 ? "Passenger" : "Passengers")}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1DD1A1] hover:bg-[#16B896] text-white py-3 rounded-lg font-bold transition-colors mt-6"
              >
                {t('booking.sendWhatsapp')}
              </button>

              <p className="text-xs text-gray-600 text-center">
                {language === 'pt' 
                  ? 'Será redirecionado para WhatsApp para confirmar sua reserva com João.'
                  : 'You will be redirected to WhatsApp to confirm your booking with João.'}
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003D82] mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setShowBookingForm(true)}
              className="flex items-center justify-center gap-2 bg-[#1DD1A1] hover:bg-[#16B896] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:scale-105 duration-300"
            >
              <Calendar size={24} />
              {t('cta.bookNow')}
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:scale-105 duration-300"
            >
              <MessageCircle size={24} />
              {t('cta.whatsapp')}
            </a>
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 bg-[#003D82] hover:bg-[#002856] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:scale-105 duration-300"
            >
              <Phone size={24} />
              {t('cta.call')}
            </a>
          </div>

          <p className="text-gray-600 text-sm">
            {t('cta.footer')}
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003D82] mb-4 text-center">
            {language === 'pt' ? 'Localização' : 'Location'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            {language === 'pt' 
              ? 'Encontre-nos em Portas do Mar, Faro'
              : 'Find us at Portas do Mar, Faro'}
          </p>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-[#E0E0E0]">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.456!2d-7.9365!3d37.0141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19c8b8b8b8b8b8d%3A0x1234567890abcdef!2sPortas%20do%20Mar%2C%20Faro!5e0!3m2!1spt!2spt!4v1234567890"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/search/Portas+do+Mar,+Faro/@37.0141,-7.9365,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1DD1A1] hover:bg-[#16B896] text-white px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg"
            >
              {language === 'pt' ? 'Obter Indicações' : 'Get Directions'}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003D82] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/manus-storage/LogoMTF_93259149.svg" alt="MarTaxi Faro" className="h-8 w-auto" />
              </div>
              <p className="text-white/80">
                {language === 'pt'
                  ? 'Táxi aquático privado para as ilhas da Ria Formosa. Operado por João, um experiente guia turístico.'
                  : 'Private water taxi to the Ria Formosa islands. Operated by João, an experienced tour guide.'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
              <p className="text-white/80 mb-2">
                <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="hover:text-[#FFD700] transition-colors">
                  {phoneNumber}
                </a>
              </p>
              <p className="text-white/80">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors">
                  WhatsApp
                </a>
              </p>
              <p className="text-white/80 text-sm mt-2">{t('footer.location')}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.islands')}</h3>
              <ul className="text-white/80 space-y-1">
                {islands.map((island) => (
                  <li key={island.name_pt}>{language === 'pt' ? island.name_pt : island.name_en}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2026 MarTaxi Faro - João. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
