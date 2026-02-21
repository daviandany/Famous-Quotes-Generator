import { useState } from 'react';
import axios from 'axios';

interface Quote {
    en: string;
    author: string;
}

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get("http://localhost:3000/api/quote");
            setQuote(response.data);
        } catch (err) {
            console.error("Erro de conexão:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = () => {
        setIsStarted(true);
        fetchQuote();
    };

    if (!isStarted) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center font-mono text-[#00ff41]">
                <div className="border border-[#00ff41] p-[30px] max-w-[500px] w-[90%] bg-black shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                    <h1 className="text-[1.2rem] mb-5 border-b border-[#00ff41] font-bold">// system.quotes</h1>
                    <div className="min-h-[120px] my-5">
                        <p className="text-[1.1rem] text-white">Welcome to Random Famous Quotes!</p>
                        <p className="text-[#00ff41] mt-[10px]">Ready to get Inspired?</p>
                    </div>
                    <button 
                        onClick={handleStart} 
                        className="bg-[#00ff41] text-black border-none py-2.5 px-5 cursor-pointer font-bold w-full hover:bg-[#00cc33] transition-colors"
                    >
                        GET STARTED
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center font-mono text-[#00ff41]">
            <div className="border border-[#00ff41] p-[30px] max-w-[500px] w-[90%] bg-black shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                <h1 className="text-[1.2rem] mb-5 border-b border-[#00ff41] font-bold">// system.quotes.active</h1>
                
                <div className="min-h-[120px] my-5">
                    {loading ? (
                        <p className="text-[#666] animate-pulse">[ LOADING... ]</p>
                    ) : error ? (
                        <p className="text-red-600 font-bold">! ERROR: Verify if Express server is on port 3000.</p>
                    ) : (
                        <>
                            <p className="text-[1.1rem] text-white">"{quote?.en}"</p>
                            <p className="text-[#00ff41] mt-[10px]">&gt; {quote?.author}</p>
                        </>
                    )}
                </div>

                <button 
                    onClick={fetchQuote} 
                    className="bg-[#00ff41] text-black border-none py-2.5 px-5 cursor-pointer font-bold w-full hover:bg-[#00cc33] transition-colors"
                >
                    GENERATE NEW QUOTE
                </button>
                <button 
                    onClick={() => setIsStarted(false)}
                    className="mt-5 text-[0.8rem] opacity-60 cursor-pointer block w-full hover:opacity-100 transition-opacity"
                >
                    [ BACK TO HOME ]
                </button>
            </div>
        </div>
    );
}

export default App;