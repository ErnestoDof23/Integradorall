type AnalyticsEvent =
  | 'page_view'
  | 'login'
  | 'register'
  | 'diagnostico_start'
  | 'diagnostico_answer'
  | 'diagnostico_complete'
  | 'pdf_download'
  | 'share'
  | 'feedback_submit'
  | 'favorite_toggle';

interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: string;
  user_id?: string;
}

const ANALYTICS_KEY = 'analytics_events';
const SESSION_KEY = 'analytics_session';

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function getUserId(): string | null {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  } catch {
    return null;
  }
}

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>): void {
  const payload: AnalyticsPayload = {
    event,
    properties: {
      ...properties,
      session_id: getSessionId(),
      url: window.location.pathname,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    },
    timestamp: new Date().toISOString(),
    user_id: getUserId() || undefined,
  };

  // Store locally
  try {
    const stored = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
    stored.push(payload);
    // Keep last 500 events
    if (stored.length > 500) stored.splice(0, stored.length - 500);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(stored));
  } catch { /* ignore */ }

  // Send to backend (fire and forget)
  try {
    fetch('/api/feedback/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => { /* ignore */ });
  } catch { /* ignore */ }
}

export function getStoredEvents(): AnalyticsPayload[] {
  try {
    return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getEventStats(): Record<AnalyticsEvent, number> {
  const events = getStoredEvents();
  const stats: Record<string, number> = {};
  for (const e of events) {
    stats[e.event] = (stats[e.event] || 0) + 1;
  }
  return stats as Record<AnalyticsEvent, number>;
}

export function getAbandonmentPoints(): { page: string; count: number }[] {
  const events = getStoredEvents();
  const pageViews: Record<string, number> = {};
  const completes: Record<string, number> = {};

  for (const e of events) {
    if (e.event === 'page_view') {
      const page = e.properties?.url as string;
      pageViews[page] = (pageViews[page] || 0) + 1;
    }
    if (e.event === 'diagnostico_complete') {
      completes['/diagnostico'] = (completes['/diagnostico'] || 0) + 1;
    }
  }

  const abandonmentPoints: { page: string; count: number }[] = [];
  const flow = ['/datos-inmueble', '/secciones', '/diagnostico', '/resultado'];
  for (const page of flow) {
    const views = pageViews[page] || 0;
    const completesCount = completes[page] || 0;
    if (views > 0 && completesCount < views) {
      abandonmentPoints.push({ page, count: views - completesCount });
    }
  }

  return abandonmentPoints.sort((a, b) => b.count - a.count);
}
