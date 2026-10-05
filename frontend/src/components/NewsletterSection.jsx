import React, { useState } from 'react';
import { Mail, Check, Sparkles, Copy } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText('ECLAT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#faf8f5] to-[#f4eee4] border-b border-[#eee7da]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-200 text-xs font-semibold text-gold-800 shadow-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          Le Cercle Privé Aurélie
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-luxe-black">
          Recevez -10% sur votre première commande
        </h2>

        <p className="text-xs sm:text-sm text-luxe-muted max-w-lg mx-auto leading-relaxed">
          Inscrivez-vous à nos lettres confidentielles pour découvrir en avant-première nos nouvelles capsules de bijoux, montres et casquettes.
        </p>

        {subscribed ? (
          <div className="bg-white p-6 rounded-3xl border border-gold-200 shadow-md max-w-md mx-auto space-y-3 animate-fade-in">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-semibold text-luxe-black">
              Bienvenue dans le Cercle !
            </h4>
            <p className="text-xs text-luxe-muted">
              Voici votre code exclusif de 10% valable immédiatement sur votre panier :
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="bg-[#faf5ee] border border-gold-300 font-mono font-bold text-gold-800 px-4 py-2 rounded-xl text-sm tracking-wider">
                ECLAT10
              </span>
              <button
                onClick={copyCode}
                className="p-2.5 rounded-xl bg-[#2d2724] text-white hover:bg-gold-700 transition cursor-pointer text-xs flex items-center gap-1 font-medium"
                title="Copier le code"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                placeholder="Entrez votre adresse email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#dcd4c6] rounded-full text-xs text-gray-900 outline-none focus:border-gold-500 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="gold-gradient-bg hover:opacity-95 text-white font-semibold text-xs px-7 py-3 rounded-full shadow-soft transition cursor-pointer whitespace-nowrap"
            >
              Je m'inscris
            </button>
          </form>
        )}

        <p className="text-[11px] text-luxe-muted">
          Pas de spam. Vous pouvez vous désabonner d'un simple clic à tout moment.
        </p>
      </div>
    </section>
  );
}
