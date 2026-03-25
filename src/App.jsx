import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, MapPin, Phone, Mail, ChevronDown, Heart, Calendar, Users, DollarSign, Image as ImageIcon } from 'lucide-react';

// --- STYLES ---
// Using Tailwind CSS (assumed available in environment)
const theme = {
  primary: 'text-stone-800',
  secondary: 'text-stone-500',
  accent: 'text-rose-700',
  bgLight: 'bg-stone-50',
  border: 'border-stone-200',
  fontSerif: 'font-serif', // Assuming a serif font is available for elegant headings
};

// --- DATA ---
const teamMembers = [
  { role: 'Founder', name: 'Nguyễn Văn A', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'Wedding Planner', name: 'Trần Thị B', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'Wedding Coordinator', name: 'Lê Văn C', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'Designer', name: 'Phạm Thị D', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'Sales & Marketing', name: 'Hoàng Văn E', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
];

const portfolio = [
  { id: 1, couple: 'Minh & Anh', concept: 'Rustic Garden', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800' },
  { id: 2, couple: 'Hoàng & Linh', concept: 'Classic Elegance', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800' },
  { id: 3, couple: 'Tuấn & Ngọc', concept: 'Modern Minimalist', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800' },
];

const testimonials = [
  { couple: 'Minh & Anh', quote: 'LG đã biến giấc mơ ngày cưới của chúng mình thành hiện thực. Mọi thứ quá hoàn hảo!' },
  { couple: 'Hoàng & Linh', quote: 'Sự chuyên nghiệp và tận tâm của team Coordinator thật sự làm gia đình hai bên rất an tâm.' },
];

const blogPosts = [
  { id: 1, title: 'Xu hướng trang trí tiệc cưới mùa Thu 2026', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600', date: '10/10/2026' },
  { id: 2, title: 'Tại sao bạn cần một Wedding Coordinator?', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600', date: '05/10/2026' },
];

// --- COMPONENTS ---

// Tích hợp Component Hiệu ứng Scroll Animation (Fade In & Slide Up)
const FadeIn = ({ children, delay = 0, direction = 'up', className = '', blur = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Kích hoạt khi phần tử lộ ra 10%
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const baseStyle = "transition-all duration-1000 ease-out";
  const blurClass = blur && !isVisible ? "blur-md" : "blur-0";
  
  let hiddenTranslate = "translate-y-12";
  if (direction === 'left') hiddenTranslate = "-translate-x-12";
  if (direction === 'right') hiddenTranslate = "translate-x-12";
  if (direction === 'none') hiddenTranslate = "translate-y-0";

  return (
    <div 
      ref={domRef} 
      className={`${baseStyle} ${blurClass} ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${hiddenTranslate}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Header = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Homepage', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Service', id: 'service' },
    { name: 'Our Couples', id: 'couples' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact Us', id: 'contact' },
  ];

  // Header background logic based on page and scroll
  const isHome = currentPage === 'home';
  const headerBg = isScrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent';
  const textColor = isScrolled || !isHome ? 'text-stone-800' : 'text-white drop-shadow-md';
  const logoColor = isScrolled || !isHome ? 'text-stone-900' : 'text-white drop-shadow-lg';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className={`text-3xl ${theme.fontSerif} font-bold tracking-widest cursor-pointer ${logoColor}`} onClick={() => setCurrentPage('home')}>
            LG.
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`${textColor} hover:${theme.accent} transition-colors uppercase text-xs tracking-wider font-semibold ${currentPage === item.id && !isHome ? 'border-b-2 border-stone-800' : ''}`}
              >
                {item.name}
              </button>
            ))}
            <div className={`flex items-center space-x-2 border-l border-stone-300 pl-6 ${textColor} text-xs font-semibold`}>
              <span className="cursor-pointer hover:text-rose-700">ENG</span>
              <span>/</span>
              <span className="cursor-pointer font-bold text-rose-700">VIE</span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={textColor}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 border-t border-stone-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-stone-800 font-medium border-b border-stone-50 uppercase text-sm tracking-wider`}
              >
                {item.name}
              </button>
            ))}
             <div className="px-3 py-4 flex space-x-4 text-stone-800 text-sm font-medium">
                <span className="cursor-pointer">ENG</span>
                <span>/</span>
                <span className="cursor-pointer font-bold text-rose-700">VIE</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-stone-300 py-16 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      <div>
        <h3 className={`text-2xl text-white ${theme.fontSerif} mb-6 tracking-widest`}>LG.</h3>
        <p className="text-sm leading-relaxed mb-6 italic">
          "A fairy tale comes true."<br/>Khu vườn tình yêu ngát xanh và là nơi tập hợp những nhà kiến tạo hạnh phúc.
        </p>
      </div>
      <div>
        <h4 className="text-white uppercase tracking-wider text-sm font-semibold mb-6">Thông tin liên hệ</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start justify-center md:justify-start">
            <MapPin size={18} className="mr-3 mt-0.5 flex-shrink-0" />
            <span>123 Đường Tình Yêu, Phường Hạnh Phúc, Quận 1, TP. HCM</span>
          </li>
          <li className="flex items-center justify-center md:justify-start">
            <Phone size={18} className="mr-3 flex-shrink-0" />
            <span>0909 123 456</span>
          </li>
          <li className="flex items-center justify-center md:justify-start">
            <Mail size={18} className="mr-3 flex-shrink-0" />
            <span>hello@vuonyeu-lg.com</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white uppercase tracking-wider text-sm font-semibold mb-6">Kết nối với chúng mình</h4>
        <div className="flex justify-center md:justify-start space-x-6">
          <a href="#" className="hover:text-white transition-colors p-2 rounded-full border border-stone-700 hover:border-white">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors p-2 rounded-full border border-stone-700 hover:border-white">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-800 text-xs text-center text-stone-500">
      © {new Date().getFullYear()} LG Vườn Yêu. All rights reserved.
    </div>
  </footer>
);

// --- PAGE COMPONENTS ---

const Home = ({ setCurrentPage }) => (
  <div className="w-full bg-white">
    {/* Hero Section */}
    <div className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
        poster="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-and-walking-in-the-park-42616-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <FadeIn delay={200} direction="none" blur={true}>
          <h1 className={`text-6xl md:text-8xl lg:text-9xl text-white ${theme.fontSerif} mb-6 drop-shadow-2xl tracking-wide`}>
            Vườn Yêu
          </h1>
        </FadeIn>
        <FadeIn delay={600} direction="up">
          <p className="text-xl md:text-2xl text-stone-100 font-light mb-12 tracking-widest max-w-2xl drop-shadow-md">
            KHỞI ĐẦU VIÊN MÃN CỦA MỘT HÀNH TRÌNH HẠNH PHÚC
          </p>
        </FadeIn>
        <FadeIn delay={1000} direction="up">
          <button 
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/50 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-stone-900 transition-all duration-500 hover:scale-105"
          >
            Bắt đầu câu chuyện
          </button>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown size={32} strokeWidth={1} />
      </div>
    </div>

    {/* Introduction Snapshot */}
    <div className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <Heart size={32} strokeWidth={1} className="text-rose-300 mx-auto mb-8 animate-pulse" />
        </FadeIn>
        <FadeIn delay={200}>
          <h2 className={`text-3xl md:text-5xl ${theme.fontSerif} ${theme.primary} mb-8`}>Chào mừng bạn đến với LG</h2>
        </FadeIn>
        <FadeIn delay={400}>
          <p className="text-stone-600 font-light leading-relaxed text-lg md:text-xl mb-12">
            Một khu vườn tình yêu ngát xanh và là nơi tập hợp những nhà kiến tạo hạnh phúc với khởi đầu từ niềm đam mê về sự duy mỹ và nguồn cảm hứng vô tận với tự nhiên. LG mong muốn mang đến cái nhìn tổng quan về quá trình thực hiện ngày cưới trọn vẹn, để ngày đại hôn mãi là sự kiện đáng nhớ trong đời.
          </p>
        </FadeIn>
        <FadeIn delay={600}>
          <button 
            onClick={() => setCurrentPage('about')}
            className="text-stone-800 uppercase tracking-widest text-sm border-b border-stone-800 pb-2 hover:text-rose-700 hover:border-rose-700 transition-colors inline-flex items-center group"
          >
            Khám phá câu chuyện của chúng mình
            <span className="ml-2 transform transition-transform group-hover:translate-x-2">→</span>
          </button>
        </FadeIn>
      </div>
    </div>

    {/* Services Highlight */}
    <div className={`py-24 md:py-32 ${theme.bgLight} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl ${theme.fontSerif} ${theme.primary} mb-6`}>Dịch Vụ Của LG</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-stone-500 font-light text-lg tracking-wide">Đồng hành cùng bạn trên mọi chặng đường kiến tạo ngày vui.</p>
          </FadeIn>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Wedding Consultant', desc: 'Gói tư vấn và hướng dẫn chuẩn bị trước ngày cưới, phác họa tổng quan và thiết lập ngân sách.' },
            { title: 'Wedding Coordinator', desc: 'Gói lên kịch bản và điều phối chương trình Lễ Gia tiên & Tiệc cưới vận hành chuyên nghiệp.' },
            { title: 'Wedding Planning', desc: 'Dịch vụ lập kế hoạch chuẩn bị và tổ chức ngày đại hỷ trọn gói từ A đến Z cho các cặp đôi.' }
          ].map((srv, idx) => (
            <FadeIn key={idx} delay={idx * 200}>
              <div className="bg-white p-12 border border-stone-100 text-center hover:shadow-xl transition-all duration-500 group h-full flex flex-col justify-center">
                <h3 className={`text-2xl ${theme.fontSerif} ${theme.primary} mb-6 group-hover:text-rose-700 transition-colors duration-300`}>{srv.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed mb-8 flex-grow">{srv.desc}</p>
                <div className="w-12 h-[1px] bg-stone-300 mx-auto group-hover:bg-rose-700 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={600}>
          <div className="text-center mt-20">
            <button 
              onClick={() => setCurrentPage('service')}
              className="px-10 py-4 bg-stone-900 text-white uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors inline-block hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              Xem chi tiết các gói dịch vụ
            </button>
          </div>
        </FadeIn>
      </div>
    </div>

    {/* Featured Couples / Portfolio */}
    <div className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl ${theme.fontSerif} ${theme.primary} mb-6`}>Những Chặng Đường Hạnh Phúc</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-stone-500 font-light text-lg tracking-wide">Cùng nhìn lại những khoảnh khắc tuyệt đẹp tại Vườn Yêu.</p>
          </FadeIn>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {portfolio.slice(0, 3).map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 200}>
              <div className="group overflow-hidden relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500" onClick={() => setCurrentPage('couples')}>
                <img src={item.img} alt={item.couple} className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-12 text-white">
                  <span className={`text-4xl ${theme.fontSerif} mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>{item.couple}</span>
                  <span className="text-xs uppercase tracking-widest border-b border-white pb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{item.concept}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={600}>
          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage('couples')}
              className="text-stone-800 uppercase tracking-widest text-sm border-b border-stone-800 pb-2 hover:text-rose-700 hover:border-rose-700 transition-colors group"
            >
              Xem thêm các concept khác
              <span className="ml-2 transform transition-transform group-hover:translate-x-2 inline-block">→</span>
            </button>
          </div>
        </FadeIn>
      </div>
    </div>

    {/* --- NEW SECTION 1: Styling & Aesthetic (Thẩm mỹ & Trang trí) --- */}
    <div className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
      {/* Decorative Background Abstract Shapes (Blobs) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-10 w-96 h-96 bg-stone-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="lg:w-1/2">
            <FadeIn direction="left">
              <span className="text-rose-700 text-xs font-bold uppercase tracking-widest mb-4 block">Thẩm mỹ & Trang trí</span>
              <h2 className={`text-4xl md:text-5xl ${theme.fontSerif} ${theme.primary} mb-8 leading-tight`}>
                Hơi thở của tự nhiên trong từng góc nhỏ
              </h2>
              <p className="text-stone-600 font-light leading-relaxed text-lg mb-10">
                Mỗi tiệc cưới tại LG đều được thiết kế mang đậm dấu ấn cá nhân. Chúng mình yêu thích việc kết hợp các vật liệu mộc mạc, ánh sáng mềm mại và cấu trúc hoa nghệ thuật để tạo ra những không gian không chỉ đẹp để ngắm nhìn, mà còn "chạm" được vào cảm xúc sâu thẳm.
              </p>
              <button 
                onClick={() => setCurrentPage('service')}
                className="text-stone-800 uppercase tracking-widest text-sm border-b border-stone-800 pb-2 hover:text-rose-700 hover:border-rose-700 transition-colors group"
              >
                Khám phá phong cách
                <span className="ml-2 transform transition-transform group-hover:translate-x-2 inline-block">→</span>
              </button>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 relative">
            <FadeIn direction="right" delay={200}>
              <div className="relative z-10 w-4/5 ml-auto">
                 <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600" alt="Wedding detail" className="w-full aspect-[4/5] object-cover rounded-tl-[120px] rounded-br-[120px] shadow-2xl" />
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={500}>
               <div className="absolute -bottom-16 -left-8 w-3/5 z-20 hover:scale-105 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=400" alt="Wedding flowers" className="w-full aspect-square object-cover rounded-full border-[12px] border-stone-50 shadow-xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>

    {/* --- NEW SECTION 2: Our Journey/Process (Hành trình chuẩn bị) --- */}
    <div className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-28">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl ${theme.fontSerif} ${theme.primary} mb-6`}>Hành Trình Kiến Tạo</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-stone-500 font-light text-lg tracking-wide">3 bước để biến giấc mơ ngày cưới thành hiện thực cùng Vườn Yêu.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-10 w-[calc(100%-80px)] h-[1px] border-t border-dashed border-stone-300 -z-0"></div>
          
          {[
            { step: '01', title: 'Lắng Nghe & Thấu Hiểu', desc: 'Gặp gỡ, chia sẻ câu chuyện tình yêu và phác thảo những mong muốn đầu tiên về ngày trọng đại.' },
            { step: '02', title: 'Thiết Kế & Lên Kế Hoạch', desc: 'Xây dựng concept độc bản, lựa chọn nhà cung cấp và lên to-do list chi tiết cho từng hạng mục.' },
            { step: '03', title: 'Hiện Thực Hóa', desc: 'Điều phối trơn tru mọi hoạt động trong ngày cưới, đảm bảo bạn chỉ cần trọn vẹn tận hưởng niềm vui.' }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 300} direction="up" className="relative group z-10">
              <div className="bg-white p-10 pt-16 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center rounded-tr-[60px] rounded-bl-[60px] group-hover:-translate-y-4 h-full relative mt-10">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-stone-900 text-white rounded-full flex items-center justify-center text-2xl font-serif italic border-8 border-white group-hover:bg-rose-700 transition-colors duration-500 shadow-md">
                  {item.step}
                </div>
                <h3 className={`text-2xl ${theme.fontSerif} ${theme.primary} mb-4 mt-4`}>{item.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>

    {/* --- NEW SECTION 3: Highlight Testimonial (Lời Yêu Thương) --- */}
    <div className="py-24 md:py-40 bg-stone-900 relative overflow-hidden text-center flex items-center justify-center min-h-[70vh]">
      {/* Dark elegant background concentric shapes */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-stone-800 rounded-full opacity-50 scale-150 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-stone-700 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[1px] border-stone-600 rounded-full opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-rose-900/60 mb-8 text-8xl font-serif leading-none h-12">"</div>
          <p className="text-2xl md:text-4xl text-stone-200 font-light leading-relaxed italic mb-12 px-4 md:px-12 drop-shadow-md">
            Hơn cả một đơn vị tổ chức, LG như những người bạn đồng hành, tỉ mỉ chăm chút cho từng chi tiết nhỏ nhất. Ngày cưới của chúng mình đã diễn ra trọn vẹn và đầy ắp tiếng cười.
          </p>
          <div className="w-16 h-[1px] bg-stone-600 mx-auto mb-8"></div>
          <h5 className={`text-xl font-bold ${theme.fontSerif} text-white mb-2 tracking-wide`}>Hoàng & Linh</h5>
          <span className="text-xs text-stone-400 uppercase tracking-widest">Classic Elegance Concept</span>
        </FadeIn>
      </div>
    </div>

  </div>
);

const About = () => (
  <div className={`pt-32 pb-24 ${theme.bgLight} min-h-screen overflow-hidden`}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Welcome Letter */}
      <div className="text-center mb-32">
        <FadeIn>
          <h2 className={`text-5xl md:text-6xl ${theme.fontSerif} ${theme.primary} mb-16 relative inline-block`}>
            Welcome Letter
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-rose-300"></span>
          </h2>
        </FadeIn>
        <div className="space-y-8 text-stone-600 leading-relaxed text-lg font-light text-justify md:text-center">
          <FadeIn delay={200}><p>Xin chào,<br/>Chào mừng bạn đến với LG!</p></FadeIn>
          <FadeIn delay={300}><p>Mời bạn cùng lắng nghe những câu chuyện đậm chất “Vườn Yêu” sắp được bày tỏ ngay sau đây. Hy vọng chút dư vị ngọt ngào của khu vườn tình yêu sẽ trở thành cơn gió xuân thanh lành, tưới mát trái tim chúng ta.</p></FadeIn>
          <FadeIn delay={400}><p>Với LG, “kết hôn” là từ ngữ mang nhiều ý nghĩa đa dạng và riêng biệt, nhưng lại có điểm chung với một mùa hoa hạnh phúc. Thời khắc đôi uyên ương đồng lòng chọn đi cùng nhau trên hành trình hôn nhân, cũng chính là lúc trái ngọt của tình yêu đôi lứa tiếp tục được ươm mầm, và nhân rộng yêu thương.</p></FadeIn>
          <FadeIn delay={500}><p>Chúng mình luôn tin ngày cưới càng vẹn tròn, kỉ niệm sẽ càng khắc sâu; cảm xúc càng bền lâu, mối gắn kết cũng càng trở nên thắm thiết.</p></FadeIn>
          <FadeIn delay={600}><p>LG mong muốn mang đến cái nhìn tổng quan về quá trình thực hiện ngày cưới trọn vẹn cho các cặp đôi, để ngày đại hôn mãi là sự kiện đáng nhớ trong đời, là khởi đầu viên mãn của một hành trình hạnh phúc.</p></FadeIn>
          <FadeIn delay={700}><p className="font-medium italic mt-12 text-stone-800">Bây giờ, mời bạn cùng ngồi xuống đây, thưởng thức ít trà thơm cùng bánh ngọt, và bắt đầu câu chuyện tại “Vườn Yêu” của chúng mình, bạn nhé.</p></FadeIn>
        </div>
      </div>

      <FadeIn><hr className="border-stone-200 mb-32"/></FadeIn>

      {/* About Us details */}
      <div className="mb-32">
         <FadeIn>
           <h2 className={`text-4xl md:text-5xl text-center ${theme.fontSerif} ${theme.primary} mb-16`}>Về Chúng Mình</h2>
         </FadeIn>
         <div className="space-y-8 text-stone-600 leading-relaxed text-lg font-light text-justify">
            <FadeIn delay={200}><p><strong>LG - một khu vườn tình yêu ngát xanh</strong> và là nơi tập hợp những nhà kiến tạo hạnh phúc với khởi đầu từ niềm đam mê về sự duy mỹ và nguồn cảm hứng vô tận với tự nhiên.</p></FadeIn>
            <FadeIn delay={300}><p>Chất lượng không phải ngẫu nhiên mà có, nó luôn là kết quả của những nỗ lực khôn ngoan. Là đơn vị tổ chức, trang trí tiệc cưới từ năm 2013 trong phân khúc dịch vụ cao cấp, LG đã xây dựng được nguồn nội lực vững chắc và hoàn thành sứ mệnh thực hiện giấc mơ ngày cưới cho các cặp đôi trên khắp đất nước. Sự sang trọng, tinh tế, thời thượng đi cùng cảm giác nhẹ nhàng, dễ chịu là phong cách tiệc cưới mà LG luôn định hướng và chú trọng tìm kiếm sự đồng điệu với khách hàng.</p></FadeIn>
            <FadeIn delay={400}><p>Mỗi một wedding planner nhà “Vườn Yêu” đều được trang bị vốn kiến thức và kĩ năng chuyên môn nhất định, cùng sự đúc kết trong tư duy thẩm mỹ và bắt nhịp xu hướng; tất cả những điều này tạo nên thế mạnh của LG trong việc xây dựng trải nghiệm cho khách hàng. Song song đó, sự chỉn chu, đầu tư về mặt hình ảnh và phong thái chuyên nghiệp của đội ngũ nhân sự đã giúp chúng mình trở thành đơn vị tiên phong trong việc xây dựng phong cách thương hiệu.</p></FadeIn>
            <FadeIn delay={500}><p>Hãy để LG được cùng các cặp đôi chắp cánh cho những thăng hoa của tình yêu, của niềm hạnh phúc thật trọn vẹn.</p></FadeIn>
            <FadeIn delay={600}><p className="text-center text-2xl font-serif italic text-rose-700 mt-12 tracking-wide">“A fairy tale comes true.” - LG</p></FadeIn>
         </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-32">
        <FadeIn direction="left">
          <div className="bg-white p-12 shadow-sm border border-stone-100 h-full hover:shadow-lg transition-shadow duration-500">
            <h3 className={`text-3xl ${theme.fontSerif} ${theme.primary} mb-8 text-center`}>Our Mission</h3>
            <p className="text-stone-600 font-light leading-relaxed text-justify">
              LG bắt đầu con đường của mình với sứ mệnh thực hiện giấc mơ ngày cưới cho các cặp đôi đến từ nhiều nơi trên khắp thế giới. Chúng mình chọn cách xây dựng một không gian mang đầy tính duy mỹ được cộng hưởng bởi tất cả những yếu tố hữu hình và vô hình; đồng thời khơi gợi sự quan tâm đến giá trị cá nhân của khách hàng, giúp họ nhận biết, thể hiện và phát triển giá trị bản thân thông qua diện mạo ngày đại hỷ; từ đó tạo nên những trải nghiệm độc đáo xuyên suốt hành trình cưới.
            </p>
          </div>
        </FadeIn>
        <FadeIn direction="right">
          <div className="bg-white p-12 shadow-sm border border-stone-100 h-full hover:shadow-lg transition-shadow duration-500">
            <h3 className={`text-3xl ${theme.fontSerif} ${theme.primary} mb-8 text-center`}>Our Vision</h3>
            <p className="text-stone-600 font-light leading-relaxed text-justify mb-6">
              LG có một ước mơ lớn: là cùng các nhà cung cấp dịch vụ khác nâng tầm chất lượng và đặt ra tiêu chuẩn mới cho ngành cưới tại Việt Nam, biến ngày cưới thành một sự kiện cá nhân quy mô, chuyên nghiệp và mang tính “di sản” cho mỗi khách hàng.
            </p>
            <p className="text-stone-600 font-light leading-relaxed text-justify">
              Với tầm nhìn xa hơn, chúng mình đang trên hành trình ươm mầm và đào tạo nguồn nhân lực cho thị trường cưới Việt Nam, mang tư duy duy mỹ và niềm vui sáng tạo truyền đạt lại cho những thế hệ tương lai.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Team */}
      <div>
        <FadeIn>
          <h2 className={`text-4xl md:text-5xl text-center ${theme.fontSerif} ${theme.primary} mb-20`}>Nhà Kiến Tạo Hạnh Phúc</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="text-center group cursor-pointer">
                <div className="overflow-hidden mb-6 rounded-sm shadow-md">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full aspect-[3/4] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  />
                </div>
                <h4 className={`text-lg font-semibold ${theme.primary} transition-colors group-hover:text-rose-700`}>{member.name}</h4>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">{member.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

    </div>
  </div>
);

const ServiceCard = ({ title, type, description, features }) => (
  <div className="bg-white p-8 md:p-14 border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-full -z-10 group-hover:bg-rose-50 transition-colors duration-500"></div>
    <div className="text-rose-700 text-xs font-bold uppercase tracking-widest mb-4">{type}</div>
    <h3 className={`text-3xl md:text-4xl ${theme.fontSerif} ${theme.primary} mb-6`}>{title}</h3>
    {description && <p className="text-stone-600 font-light mb-10 italic text-lg leading-relaxed">{description}</p>}
    <ul className="space-y-5">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start group/item">
          <Heart size={16} strokeWidth={1.5} className="text-stone-300 mr-4 mt-1 flex-shrink-0 group-hover/item:text-rose-400 transition-colors duration-300" />
          <span className="text-stone-600 font-light leading-relaxed group-hover/item:text-stone-900 transition-colors duration-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Service = () => (
  <div className={`pt-32 pb-24 ${theme.bgLight} min-h-screen overflow-hidden`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-24">
        <FadeIn>
          <h2 className={`text-5xl md:text-6xl ${theme.fontSerif} ${theme.primary} mb-8`}>Dịch vụ của LG</h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto tracking-wide">Đồng hành cùng bạn trên mọi chặng đường kiến tạo nên ngày vui trọng đại.</p>
        </FadeIn>
      </div>

      <div className="space-y-12">
        <FadeIn>
          <ServiceCard 
            type="Gói tư vấn"
            title="Wedding Consultant"
            description="Thời gian làm việc: Tư vấn online trong quá trình lên kế hoạch và 2 buổi họp mặt trước ngày cưới (online hoặc offline tùy nhu cầu khách hàng)"
            features={[
              "Phác họa tổng quan về ngày cưới",
              "Tư vấn và đề xuất các nhà cung cấp dịch vụ phù hợp với nhu cầu và ngân sách. Liên hệ và kiểm tra lịch trống của các nhà cung cấp",
              "Tư vấn các tiết mục trong chương trình gia tiên và tiệc cưới (thách cưới, opening show, live band, nghi thức lễ, trò chơi,...)",
              "Hỗ trợ lập kế hoạch chuẩn bị và cung cấp các công cụ cần thiết",
              "Hướng dẫn cách thiết lập, cân đối và quản lý ngân sách",
              "Cung cấp kiến thức chuyên môn nền tảng về quá trình chuẩn bị ngày cưới",
              "Chia sẻ kinh nghiệm và giải đáp thắc mắc"
            ]}
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn direction="left" delay={200}>
            <ServiceCard 
              type="Gói điều phối"
              title="Traditional Coordinator"
              description="Điều phối chương trình Lễ Gia tiên"
              features={[
                "Cùng CDCR và gia đình xây dựng ý tưởng, nội dung, và kịch bản chi tiết cho buổi lễ",
                "Lập danh sách các hạng mục cần chuẩn bị và to-do list cho CDCR",
                "Liên hệ trao đổi với các nhà cung cấp dịch vụ để chuẩn bị sẵn sàng",
                "Chỉn chu diện mạo cho cặp đôi, chăm sóc cảm xúc và xây dựng trải nghiệm ý nghĩa",
                "Tham gia vận hành, sắp xếp chương trình buổi lễ, phối hợp với các nhà cung cấp",
                "Phụ trách hậu cần, xử lý phát sinh"
              ]}
            />
          </FadeIn>
          <FadeIn direction="right" delay={400}>
            <ServiceCard 
              type="Gói điều phối"
              title="Reception Coordinator"
              description="Điều phối chương trình Tiệc cưới"
              features={[
                "Sáng tạo nội dung và ý tưởng chương trình theo concept tiệc cưới",
                "Lên kịch bản chi tiết, đề xuất tiết mục, playlist nhạc và hậu cần",
                "Lập to-do list cho CDCR và liên hệ nhà cung cấp",
                "Lên kế hoạch quay chụp Getting Ready và First Look",
                "Thực hiện rehearsal trước giờ đón khách, hướng dẫn chụp ảnh",
                "Vận hành sảnh tiệc, phối hợp chặt chẽ quản lý và nhà cung cấp",
                "Phụ trách hậu cần, xử lý phát sinh"
              ]}
            />
          </FadeIn>
        </div>

        <FadeIn>
          <ServiceCard 
            type="Gói trọn gói"
            title="Wedding Planning"
            description="LG sẽ đồng hành cùng CDCR trong suốt hành trình kiến tạo ngày cưới, bao gồm tất cả dịch vụ của gói Consultant và Coordinator."
            features={[
              "Phác họa tổng quan về hành trình chuẩn bị ngày cưới và phương án thực hiện từng hạng mục",
              "Xây dựng kế hoạch chi tiết, sắp xếp và quản lý công việc từ chuẩn bị đến sau ngày cưới",
              "Tư vấn, kết nối làm việc và thương lượng với các nhà cung cấp dịch vụ",
              "Lập to-do list, cung cấp công cụ hỗ trợ, lập dự toán và quản lý ngân sách",
              "Theo dõi tiến độ, báo cáo chi tiêu định kỳ",
              "Thiết kế proposal định hướng phong cách thẩm mỹ và chủ đề tiệc cưới",
              "Đóng vai trò Wedding Stylist cho diện mạo tổng thể của CDCR và gia đình",
              "Quản lý chất lượng công việc của đối tác và xử lý mọi vấn đề phát sinh"
            ]}
          />
        </FadeIn>
      </div>

      {/* Styling & Decoration Preview */}
      <div className="mt-40">
        <FadeIn>
          <h3 className={`text-4xl text-center ${theme.fontSerif} ${theme.primary} mb-16`}>Styling & Decoration</h3>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400"
          ].map((img, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="none">
              <div className="overflow-hidden rounded-sm hover:shadow-xl transition-shadow duration-300">
                <img src={img} alt={`Deco ${idx + 1}`} className="w-full h-80 object-cover hover:scale-110 transition-transform duration-1000 cursor-pointer" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Couples = () => (
  <div className={`pt-32 pb-24 bg-white min-h-screen overflow-hidden`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Wedding & Concept */}
      <div className="mb-32">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className={`text-5xl md:text-6xl ${theme.fontSerif} ${theme.primary} mb-8`}>Wedding & Concept</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto tracking-wide">Những câu chuyện tình yêu được kể lại bằng ngôn ngữ của không gian và thẩm mỹ.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {portfolio.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 200}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden mb-6 relative shadow-md">
                  <img src={item.img} alt={item.couple} className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white border border-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-stone-900 transition-colors duration-300">Xem chi tiết</span>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className={`text-3xl ${theme.fontSerif} text-stone-800 mb-2`}>{item.couple}</h4>
                  <p className="text-stone-500 font-light italic tracking-wide">{item.concept}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={600}>
          <div className="text-center mt-20">
              <button className="text-stone-800 uppercase tracking-widest text-sm border-b border-stone-800 pb-2 hover:text-rose-700 hover:border-rose-700 transition-colors group">
                Xem thêm các cặp đôi
                <span className="ml-2 transform transition-transform group-hover:translate-x-2 inline-block">→</span>
              </button>
          </div>
        </FadeIn>
      </div>

      {/* Lovely Words */}
      <FadeIn>
        <div className="bg-stone-50 p-12 md:p-24 rounded-3xl text-center relative overflow-hidden border border-stone-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32 opacity-50"></div>
          
          <h3 className={`text-4xl ${theme.fontSerif} ${theme.primary} mb-16 relative z-10`}>Lovely Words</h3>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-rose-200 opacity-30 absolute -top-16 -left-12 text-[150px] font-serif leading-none">"</div>
            <p className="text-2xl md:text-3xl text-stone-700 font-light leading-relaxed italic relative z-10 mb-12">
              "Sự lựa chọn đúng đắn nhất của chúng mình cho ngày trọng đại là đặt niềm tin vào LG. Không chỉ là đẹp, mà còn là cảm giác an tâm tuyệt đối để tận hưởng trọn vẹn từng khoảnh khắc."
            </p>
            <div className="flex flex-col items-center">
              <h5 className={`text-xl font-bold ${theme.fontSerif} ${theme.primary} mb-2`}>Minh & Anh</h5>
              <span className="text-xs text-stone-500 uppercase tracking-widest">Rustic Garden Concept</span>
            </div>
            {/* Simple Slider Dots Placeholder */}
            <div className="flex justify-center space-x-3 mt-12">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-800 cursor-pointer"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-300 cursor-pointer hover:bg-stone-500 transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-300 cursor-pointer hover:bg-stone-500 transition-colors"></div>
            </div>
          </div>
        </div>
      </FadeIn>

    </div>
  </div>
);

const Blog = () => (
  <div className={`pt-32 pb-24 ${theme.bgLight} min-h-screen overflow-hidden`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-24">
          <FadeIn>
            <h2 className={`text-5xl md:text-6xl ${theme.fontSerif} ${theme.primary} mb-8`}>Nhật Ký Vườn Yêu</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto tracking-wide">Chia sẻ kinh nghiệm, câu chuyện làm nghề và kiến thức chuẩn bị cưới.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {blogPosts.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 200}>
              <div className="bg-white group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full">
                <div className="overflow-hidden relative h-72">
                   <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   {/* Video Play Icon Placeholder if it were a video */}
                   {post.id === 2 && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-500">
                         <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-2 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-stone-800 border-b-[12px] border-b-transparent"></div>
                         </div>
                      </div>
                   )}
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-rose-700 font-bold mb-4">{post.date}</p>
                  <h3 className={`text-3xl ${theme.fontSerif} text-stone-800 group-hover:text-rose-700 transition-colors leading-snug mb-6`}>{post.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed line-clamp-3 mb-8 flex-grow">
                    Chuẩn bị cho một lễ cưới hoàn hảo cần rất nhiều thời gian và tâm sức. Hãy cùng LG tìm hiểu những kinh nghiệm quý báu giúp ngày vui của bạn trở nên trọn vẹn nhất...
                  </p>
                  <div className="mt-auto">
                    <span className="text-sm font-bold uppercase tracking-widest text-stone-800 border-b-2 border-transparent inline-block group-hover:border-rose-700 transition-colors pb-1 group-hover:text-rose-700">
                      Đọc tiếp →
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    role: 'Cô Dâu',
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    venue: 'Chưa có',
    guests: '',
    budget: '',
    otherEvents: '',
    note: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi thông tin. LG sẽ liên hệ lại trong thời gian sớm nhất!');
  };

  const inputClass = "w-full border-b border-stone-300 bg-transparent py-4 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-800 transition-colors font-light text-lg";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2";

  return (
    <div className={`pt-32 pb-24 bg-white min-h-screen overflow-hidden`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className={`text-5xl md:text-6xl ${theme.fontSerif} ${theme.primary} mb-8`}>Let's Talk</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto tracking-wide">
              Chia sẻ với LG về ngày trọng đại của bạn. Chúng mình rất mong được lắng nghe!
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={400}>
          <div className="bg-stone-50 p-10 md:p-16 rounded-xl border border-stone-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Form Fields Mapping exactly to prompt requirements */}
              <div className="grid md:grid-cols-2 gap-10">
                 <div>
                    <label className={labelClass}>Bạn là?</label>
                    <select name="role" value={formData.role} onChange={handleChange} className={inputClass}>
                      <option>Cô Dâu</option>
                      <option>Chú Rể</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Họ và tên của bạn là?</label>
                    <input type="text" name="name" required placeholder="Ví dụ: Nguyễn Văn A" value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" name="email" required placeholder="email@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Số điện thoại</label>
                    <input type="tel" name="phone" required placeholder="090..." value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
              </div>

              <div>
                <label className={labelClass}>Bạn đang sinh sống và làm việc tại đâu?</label>
                <input type="text" name="location" placeholder="Ví dụ: TP.HCM" value={formData.location} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 <div>
                    <label className={labelClass}>Thời gian tổ chức tiệc cưới?</label>
                    <input type="text" name="date" placeholder="Ví dụ: Tháng 10/2026" value={formData.date} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Hai bạn đã có địa điểm chưa?</label>
                    <select name="venue" value={formData.venue} onChange={handleChange} className={inputClass}>
                      <option>Chưa có</option>
                      <option>Đã có ý tưởng</option>
                      <option>Đã chốt địa điểm</option>
                    </select>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 <div>
                    <label className={labelClass}>Số lượng khách mời dự kiến?</label>
                    <input type="text" name="guests" placeholder="Ví dụ: 300 khách" value={formData.guests} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Ngân sách dự kiến?</label>
                    <input type="text" name="budget" placeholder="Ví dụ: 500 triệu - 1 tỷ" value={formData.budget} onChange={handleChange} className={inputClass} />
                  </div>
              </div>

              <div>
                <label className={labelClass}>Ngoài tiệc cưới hai bạn có tổ chức thêm buổi lễ nào không? (Thời gian/Địa điểm)</label>
                <textarea name="otherEvents" rows="2" placeholder="Ví dụ: Lễ Hằng Thuận tại Chùa..." value={formData.otherEvents} onChange={handleChange} className={inputClass}></textarea>
              </div>

              <div>
                <label className={labelClass}>Hai bạn có muốn chia sẻ thêm điều gì với LG không?</label>
                <textarea name="note" rows="3" placeholder="Mong muốn về phong cách, sở thích đặc biệt..." value={formData.note} onChange={handleChange} className={inputClass}></textarea>
              </div>

              <div className="text-center pt-10">
                <button type="submit" className="px-14 py-5 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-rose-700 transition-colors duration-300 w-full md:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Gửi thông tin
                </button>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple router logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'service': return <Service />;
      case 'couples': return <Couples />;
      case 'blog': return <Blog />;
      case 'contact': return <Contact />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="font-sans antialiased text-stone-800 selection:bg-rose-200 selection:text-stone-900 flex flex-col min-h-screen">
      {/* Import Google Font for Serif typography */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Lato', sans-serif; }
          
          /* Custom Keyframes for Blob Shapes Animation */
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}
      </style>

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}