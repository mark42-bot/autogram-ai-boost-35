import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInstagramAuth } from '@/contexts/InstagramAuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram } from 'lucide-react';
import Navigation from '@/components/ui/navigation';

const InstagramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useInstagramAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Instagram authorization was denied or failed.');
      return;
    }

    if (!code) {
      setError('No authorization code received from Instagram.');
      return;
    }

    handleOAuthCallback(code)
      .then(() => {
        navigate('/features/analytics', { replace: true });
      })
      .catch((err) => {
        console.error('OAuth callback error:', err);
        setError('Failed to complete Instagram login. Please try again.');
      });
  }, [searchParams, handleOAuthCallback, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <Card className="glass border-border/20 max-w-md w-full">
          <CardContent className="p-8 text-center">
            {error ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-xl font-bold mb-2">Connection Failed</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline text-sm"
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h2 className="text-xl font-bold mb-2">Connecting to Instagram...</h2>
                <p className="text-muted-foreground">
                  Please wait while we complete your login.
                </p>
                <div className="mt-4 w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InstagramCallback;
