import { Share2, ExternalLink, Copy } from 'lucide-react';
import { useToast } from './ui/Toast';

interface ShareButtonsProps {
  title: string;
  percentage: number;
  url?: string;
}

export default function ShareButtons({ title, percentage, url }: ShareButtonsProps) {
  const { showToast } = useToast();
  const shareUrl = url || window.location.href;
  const text = `Mi diagnostico "${title}" obtuvo ${percentage}% de cumplimiento. Realiza el tuyo en`;

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Diagnostico: ${title}`,
          text: `${text} ${shareUrl}`,
          url: shareUrl,
        });
        showToast('Compartido correctamente', 'success');
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          // Share failed, try clipboard fallback
          await copyToClipboard();
        }
      }
    } else {
      await copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    const shareText = `${text} ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(shareText);
      showToast('Enlace copiado al portapapeles', 'success');
    } catch {
      // Final fallback: create temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Enlace copiado al portapapeles', 'success');
    }
  };

  const handleLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitter = () => {
    const tweetText = `${text} #DiagnosticoInmobiliario #Accesibilidad`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsApp = () => {
    const waText = `${text} ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Compartir en redes sociales">
      <button
        onClick={handleShareNative}
        aria-label="Compartir"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        <Share2 className="h-3.5 w-3.5" />
        Compartir
      </button>
      <button
        onClick={copyToClipboard}
        aria-label="Copiar enlace"
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        <Copy className="h-3.5 w-3.5" />
        Copiar
      </button>
      <button
        onClick={handleLinkedIn}
        aria-label="Compartir en LinkedIn"
        className="inline-flex items-center gap-1.5 rounded-lg border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700 hover:bg-pink-100 cursor-pointer"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        LinkedIn
      </button>
      <button
        onClick={handleTwitter}
        aria-label="Compartir en Twitter"
        className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100 cursor-pointer"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Twitter
      </button>
      <button
        onClick={handleWhatsApp}
        aria-label="Compartir por WhatsApp"
        className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 cursor-pointer"
      >
        WhatsApp
      </button>
    </div>
  );
}
