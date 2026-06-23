import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Building2, BarChart3, Share2, Shield, ArrowRight, Star } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useAuth } from '../hooks/useAuth';

const features = [
  { icon: Building2, title: 'Diagnostico Completo', desc: 'Evalua 5 categorias de accesibilidad con 15 preguntas tecnicas.' },
  { icon: BarChart3, title: 'Resultados Visuales', desc: 'Gauge circular, graficas de barras y recomendaciones detalladas.' },
  { icon: Share2, title: 'Compartir Resultados', desc: 'Comparte en LinkedIn, Twitter, WhatsApp o descarga el PDF.' },
  { icon: Shield, title: 'WCAG 2.1 AA', desc: 'Accesibilidad completa: navegable por teclado, lectores de pantalla.' },
];

const testimonials = [
  { name: 'Arq. Maria Lopez', role: 'Directora de Proyectos, Constructora MX', text: 'Herramienta fundamental para nuestros diagnosticos de accesibilidad. Muy facil de usar.', rating: 5 },
  { name: 'Ing. Carlos Ruiz', role: 'Consultor Independiente', text: 'Los reportes PDF son profesionales y los clientes quedan impresionados.', rating: 5 },
  { name: 'Arq. Ana Garcia', role: 'Estudio de Arquitectura', text: 'La funcionalidad de compartir en redes sociales nos ha ayudado a conseguir mas clientes.', rating: 4 },
];

const stats = [
  { value: '5', label: 'Categorias de evaluacion' },
  { value: '15', label: 'Preguntas tecnicas' },
  { value: '100%', label: 'Gratuito y accesible' },
  { value: '< 3min', label: 'Tiempo de diagnostico' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Diagnostico Inmobiliario - Evalua la Accesibilidad de tu Inmueble</title>
        <meta name="description" content="Herramienta gratuita para evaluar condiciones de accesibilidad de inmuebles. Reportes PDF profesionales, compartir en redes sociales." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="/api" />
      </Helmet>

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-blue-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg4VjI4aDI4ek0xMiAxNnYySDR2LTJoOHptMjQgMHYySDI4di0yaDh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">DiagnosticoInmobiliario</span>
          </div>
          <div className="flex gap-3">
            {user ? (
              <Button onClick={() => navigate('/dashboard')} className="bg-white text-primary hover:bg-gray-100">
                Ir al Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} variant="outline" className="border-white text-white hover:bg-white/10">
                  Iniciar Sesion
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-white text-primary hover:bg-gray-100">
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Evalua la accesibilidad de tus inmuebles
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Herramienta profesional para diagnosticar condiciones de accesibilidad.
            Reportes PDF, compartir en redes sociales y seguimiento de progreso.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => user ? navigate('/dashboard') : navigate('/register')}
              className="group bg-white text-primary hover:bg-gray-100"
            >
              Comenzar diagnostico
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Conocer mas
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b bg-gray-50 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Todo lo que necesitas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
            Desde la creacion del proyecto hasta el reporte final, todo en una sola herramienta.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="p-6">
                <f.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Como funciona</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Crea tu proyecto', desc: 'Registrate, crea un proyecto y completa los datos del inmueble.' },
              { step: '2', title: 'Responde el cuestionario', desc: 'Evalua 5 categorias con 3 preguntas cada una. Guardado automatico.' },
              { step: '3', title: 'Obtén tu reporte', desc: 'Visualiza resultados, descarga PDF y comparte en redes sociales.' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Lo que dicen nuestros usuarios</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="flex flex-col p-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm text-gray-600">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Comienza a diagnosticar hoy</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Es gratuito, rapido y accesible. Registrate en un minuto y empieza a evaluar tus inmuebles.
          </p>
          <Button
            size="lg"
            onClick={() => user ? navigate('/dashboard') : navigate('/register')}
            className="mt-8 bg-white text-primary hover:bg-gray-100"
          >
            Comenzar ahora - es gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Building2 className="h-5 w-5" />
            <span className="text-sm">&copy; 2026 Diagnostico Inmobiliario. Proyecto 1.</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Accesibilidad WCAG 2.1 AA</span>
            <span>PWA</span>
            <span>React + TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
