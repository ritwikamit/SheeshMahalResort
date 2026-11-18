// Next.js App Router Web Handler: app/api/feedback/improve/route.ts
// Guest Review Booster for Sheesh Mahal Resort (sheeshmahalresorts.com)

import handler, { generateProceduralReview } from '../../../api/feedback/improve.ts';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mockReq = {
      method: 'POST',
      body,
      headers: Object.fromEntries(req.headers.entries()),
    };

    let statusCode = 200;
    let responseData: any = null;

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
          },
          end: () => {},
        };
      },
    };

    await handler(mockReq, mockRes);

    return new Response(JSON.stringify(responseData), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    const fallback = generateProceduralReview('hindi');
    return new Response(JSON.stringify({ review: fallback, isFallback: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
