import { useEffect, useRef, useState } from 'react';
import { Phone, MapPin, CheckCircle } from 'lucide-react';

type NearbyCity = { name: string; km?: number | null };
type Resp = { origin: string; radiusKm: number; cities: NearbyCity[]; source?: 'district' | 'radius' };

const PHONE_DISPLAY = '01579 2523663';
const CALL = 'tel:015792523663';
const API_BASE = '/.netlify/functions/nearby-cities';

function readCity(): { name: string; plz: string } {
  try {
    const raw = sessionStorage.getItem('cityData');
    if (raw) {
      const d = JSON.parse(raw);
      if (d?.name) return { name: d.name, plz: d.plz || '00000' };
    }
  } catch {}
  const stored = sessionStorage.getItem('cityName');
  if (stored) return { name: stored, plz: '00000' };
  return { name: 'Ihrer Stadt', plz: '00000' };
}

const Einsatzgebiet = () => {
  const [city, setCity] = useState(readCity);
  const rootRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [data, setData] = useState<Resp | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  // React to city detection updates
  useEffect(() => {
    const onCity = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.name) setCity({ name: detail.name, plz: detail.plz || '00000' });
    };
    window.addEventListener('cityDetected', onCity as EventListener);
    return () => window.removeEventListener('cityDetected', onCity as EventListener);
  }, []);

  // Lazy load via IntersectionObserver
  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setInView(true); io.disconnect(); break; }
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (!city.name || city.name === 'Ihrer Stadt') { setState('error'); return; }
    const ctrl = new AbortController();
    setState('loading');

    const params = new URLSearchParams({ city: city.name, radius: '50', limit: '20', v: '2' });
    if (city.plz && city.plz !== '00000') params.set('plz', city.plz);

    const fastParams = new URLSearchParams(params);
    fastParams.set('fast', '1');

    fetch(`${API_BASE}?${fastParams.toString()}`, { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http'))))
      .then((json: Resp) => {
        if (json.cities?.length) { setData(json); setState('ok'); }
      })
      .catch(() => undefined);

    fetch(`${API_BASE}?${params.toString()}`, { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http'))))
      .then((json: Resp) => { setData(json); setState(json.cities?.length ? 'ok' : 'error'); })
      .catch(() => setState((s) => (s === 'ok' ? 'ok' : 'error')));

    return () => ctrl.abort();
  }, [inView, city.name, city.plz]);

  const hasCity = city.name && city.name !== 'Ihrer Stadt';

  return (
    <section ref={rootRef} className="bg-[#003311] py-16 px-4 md:px-8 border-t border-[#c9a227]/20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-[#c9a227] uppercase tracking-widest text-sm font-semibold mb-3">Einsatzgebiet</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {hasCity ? (
              <>Wir kommen zu Ihnen – kostenfrei in {city.name} + 50&nbsp;km.</>
            ) : (
              <>Wir kommen zu Ihnen – kostenfrei im 50-km-Radius.</>
            )}
          </h2>
          <p className="text-gray-200 text-lg mb-6 leading-relaxed">
            In unserem Kern-Einsatzgebiet fällt keine Anfahrtspauschale an.
            Sie zahlen nur den Einsatz – transparent und versicherungskonform.
          </p>

          {hasCity && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 mb-6">
              <span className="inline-flex items-center gap-2 bg-[#004422] border border-[#c9a227]/40 px-3 py-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-[#c9a227]" />
                <span className="font-semibold">{city.name}</span>
              </span>
              <span className="text-white/60">·</span>
              <span className="inline-flex items-center gap-2 bg-[#004422] border border-[#c9a227]/40 px-3 py-1.5 rounded-full">
                50 km Radius
              </span>
            </div>
          )}

          <a
            href={CALL}
            className="inline-flex items-center gap-3 bg-[#c9a227] text-[#003311] font-bold px-6 py-4 rounded-lg hover:bg-[#b8931f] transition-colors shadow-lg"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', { send_to: 'phone_click' });
              }
            }}
          >
            <Phone className="w-5 h-5" />
            Jetzt anrufen · {PHONE_DISPLAY}
          </a>

          <p className="text-white/70 text-sm mt-4">
            Außerhalb der 50 km? Rufen Sie trotzdem an – wir finden eine faire Lösung.
          </p>
        </div>

        <div className="bg-[#004422]/60 border border-[#c9a227]/30 rounded-xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            {hasCity ? `Top 20 Nachbarorte rund um ${city.name}` : 'Einsatzgebiet im 50-km-Radius'}
          </h3>

          {state === 'loading' && <SkeletonGrid />}

          {state === 'ok' && data && (
            <>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.cities.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-white/95 text-sm py-1.5">
                    <CheckCircle className="w-4 h-4 text-[#c9a227] shrink-0" />
                    <span className="font-medium">{c.name}</span>
                    {typeof c.km === 'number' && c.km > 0 && (
                      <span className="text-white/60 text-xs">· {c.km} km</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-white/70 text-sm mt-6 leading-relaxed">
                … und alle weiteren Orte im 50-km-Radius um {data.origin}.
                Wespennest entfernen, Hornissennest umsiedeln, Bienen fachgerecht – meist noch am selben Tag.
              </p>
            </>
          )}

          {(state === 'error' || (state === 'idle' && !hasCity)) && (
            <div>
              <p className="text-white/90 mb-4">
                Rufen Sie uns an – wir prüfen Ihren Ort sofort und geben Ihnen eine ehrliche Einschätzung zu Ankunftszeit und Kosten.
              </p>
              <a
                href={CALL}
                className="inline-flex items-center gap-2 bg-[#c9a227] text-[#003311] font-bold px-5 py-3 rounded-lg hover:bg-[#b8931f] transition-colors"
              >
                <Phone className="w-5 h-5" />
                Jetzt anrufen · {PHONE_DISPLAY}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2" aria-hidden="true">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="h-6 bg-white/10 rounded animate-pulse" />
    ))}
  </div>
);

export default Einsatzgebiet;
