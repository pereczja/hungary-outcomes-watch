import SEO from '@/components/SEO';
import SiteHeader from '@/components/SiteHeader';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { tiszaProgramFullText, tisza2026Items, pillarInfo } from '@/data/tisza2026';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'Mi a Tisza párt legfontosabb gazdasági ígérete?',
  'Hogyan oldanák meg az egészségügyi válságot?',
  'Mit terveznek az oktatás területén?',
  'Milyen azonnali intézkedéseket hoznának?',
  'Hogyan finanszíroznák a programot?',
  'Mi a véleményük a migrációról?',
  'Bevezetnék az eurót?',
];

const TiszaChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `Te egy segítőkész asszisztens vagy, aki a Tisza Párt 2026-os választási programjáról ("A működő és emberséges Magyarország alapjai") ad információkat.

FONTOS SZABÁLYOK:
1. CSAK a programban szereplő információkat használd válaszadáshoz
2. Ha valamit nem tartalmaz a program, mondd meg őszintén
3. Légy tárgyilagos és informatív
4. Idézz konkrét számokat és vállalásokat ahol releváns
5. Ne adj politikai értékelést, csak tényeket közölj
6. Magyarul válaszolj

A TELJES PROGRAM TARTALMA:
${tiszaProgramFullText}

KONKRÉT VÁLLALÁSOK LISTÁJA:
${tisza2026Items.map(i => `- ${i.category}: ${i.title} - ${i.description}${i.metrics ? ` (${i.metrics})` : ''}`).join('\n')}
`;

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Hiba történt a válasz generálása közben. Kérlek ellenőrizd az API kulcsot és próbáld újra.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  return (
    <>
      <SEO
        title="Beszélgess a Tisza programmal | BuildHungary"
        description="Kérdezz bármit a Tisza Párt 2026-os választási programjáról AI segítségével."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/tisza-2026/chat' : undefined}
      />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link to="/tisza-2026">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Vissza a programhoz
              </Link>
            </Button>
            <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="h-6 w-6 text-primary" />
              Beszélgess a Tisza programmal
            </h1>
            <p className="text-muted-foreground">
              Kérdezz bármit a Tisza Párt 2026-os választási programjáról. Az AI a hivatalos programdokumentum alapján válaszol.
            </p>
          </div>

          {/* API Key Input */}
          {showApiKeyInput && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5" />
                  OpenAI API kulcs szükséges
                </CardTitle>
                <CardDescription>
                  A chat funkcióhoz OpenAI API kulcs szükséges. A kulcs csak a böngésződben tárolódik.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 rounded border px-3 py-2"
                />
                <Button onClick={saveApiKey}>Mentés</Button>
              </CardContent>
            </Card>
          )}

          {/* Chat Messages */}
          <Card className="mb-4">
            <CardContent className="min-h-[400px] p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <Bot className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">Üdvözöllek!</h3>
                  <p className="mb-6 max-w-md text-sm text-muted-foreground">
                    Kérdezz bármit a Tisza Párt programjáról. Például az egészségügyről, gazdaságról, oktatásról vagy bármely más témáról.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => sendMessage(q)}
                        className="text-xs"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      </div>
                      <div className="rounded-lg bg-muted px-4 py-2">
                        <p className="text-sm text-muted-foreground">Gondolkodom...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Input */}
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Kérdezz valamit a programról..."
              className="min-h-[60px] resize-none"
              disabled={loading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Suggested Questions */}
          {messages.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-muted-foreground">További kérdések:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    onClick={() => sendMessage(q)}
                    className="h-auto px-2 py-1 text-xs"
                    disabled={loading}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Az AI a hivatalos Tisza Párt programdokumentum alapján válaszol. A válaszok nem minősülnek hivatalos álláspontnak.
          </p>
        </div>
      </main>
    </>
  );
};

export default TiszaChatPage;
