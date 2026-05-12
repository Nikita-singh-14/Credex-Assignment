import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const dataParam = searchParams.get('data');
    
    let savings = "20%"; // Default fallback
    
    if (dataParam) {
      try {
        const decoded = JSON.parse(Buffer.from(dataParam, 'base64').toString());
        if (decoded.results && decoded.results.annualSavings) {
          savings = `$${decoded.results.annualSavings.toLocaleString()}`;
        }
      } catch (e) {
        console.error("Failed to parse data for OG image", e);
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc', // slate-50
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0', // slate-200
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', backgroundColor: '#d1fae5', borderRadius: '40px', marginBottom: '32px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#0f172a', // slate-900
                textAlign: 'center',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              I just slashed my startup's AI spend by <span style={{ color: '#10b981', marginLeft: '12px' }}>{savings}</span>
            </div>
            
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: '#64748b', // slate-500
                textAlign: 'center',
                marginTop: '16px',
              }}
            >
              Run your free AI Spend Audit with Credex today.
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
