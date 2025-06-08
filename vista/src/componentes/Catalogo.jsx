import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Listarprods from '../componentes/Listarprods';

const Catalogo = () => {
    const { gender, category } = useParams();
    const [productos, setProductos] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true); // Añadido estado de carga
    useEffect(() => {
        let action = '';
        let newTitle = '';
        let newText = '';
        
        switch (gender) {
            case 'men':
                action = 'getProdHombre';
                newTitle = 'Welcome to MENSWEAR';
                newText = `Where function meets <span class="italic">"form"</span> a study in identity, motion, and intention. not defined by tradition. designed for movement — built for meaning. rethinking classics through a lens of progress. built for those rewriting the rules — in sport, in style, in self.`;
                
                break;
            case 'women':
                action = 'getProdMujer';
                newTitle = 'Welcome to WOMENSWEAR';
                newText = `Where function meets <span class="italic">"form"</span>. A study in strength, fluidity, and self-expression. Not defined by tradition. Designed for movement — built for meaning. Rethinking classics through a lens of progress. Built for those rewriting the rules — in sport, in style, in self.`;
                break;
            case 'exclusive':
                action = 'getProdExclusive';
                newTitle = 'Welcome to EXCLUSIVESWEAR';
                newText = `Crafted beyond trends — shaped by intention. A space where rarity meets "relevance". For those who move differently. Precision in every stitch. Purpose in every piece. Designed for the few, not the many. Built for moments that aren't repeated.`;
                break;
            default:
                newTitle = 'ALL';
                newText = `All from karmax`;
                action = 'listar';
        }

        setTitle(newTitle);
        setText(newText);

        if (action) {
            setLoading(true);
            fetch('http://localhost/TFG/controlador/c-productos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, category: category || null }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setProductos(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setLoading(false);
                });
        }
    }, [gender, category]);

    return (
        <div className="animate-fadeIn"> {/* Añade esta clase para animación */}
            <h2 className="pt-5 px-5 text-2xl font-semibold mb-4">{title}</h2>
            <div className="p-5 space-y-2 text-base leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>
            <Listarprods listar={productos} />
        </div>
    );
};

export default Catalogo;