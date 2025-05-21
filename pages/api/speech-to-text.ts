// pages/api/speech-to-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { audioData } = req.body;

  if (!audioData) {
    return res.status(400).json({ error: 'No audio data provided' });
  }

  try {
    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

    if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
      return res.status(500).json({ error: 'Azure Speech API not configured' });
    }

    // Convert base64 audio data to ArrayBuffer
    const audioBuffer = Buffer.from(audioData, 'base64');
    const arrayBuffer = Uint8Array.from(audioBuffer).buffer;

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_SPEECH_KEY, AZURE_SPEECH_REGION);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(audioBuffer);
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    return new Promise<void>((resolve) => {
      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
            res.status(200).json({ transcript: result.text });
          } else if (result.reason === SpeechSDK.ResultReason.NoMatch) {
            res.status(200).json({ transcript: 'No speech could be recognized.' });
          } else {
            res.status(500).json({ error: 'Speech recognition failed.' });
          }
          recognizer.close();
          resolve();
        },
        (err) => {
          console.error('Speech recognition error:', err);
          res.status(500).json({ error: 'Speech recognition error.' });
          recognizer.close();
          resolve();
        }
      );
    });
  } catch (error) {
    console.error('Error processing speech to text:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;