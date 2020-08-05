import React from 'react';

export default (props: any) => {
    const { closeModal, style } = props;
    return (<div className="text-left">
        <h2>Vítáme vás na webu Ověřujte.cz</h2>
        <div style={style} className="mb-1">
            <p>
                Vážení vyhledávající, <br />
                tento web slouží jako vyhledávač článků, který si můžete libovolně přizpůsobit dle svých potřeb. <br />
                V prvním kroku uvidíte několik zdrojů, které můžete na přepínači vypnout nebo zapnout, a tím filtrovat vyhledávání Vámi zvoleného tématu, které napíšete do vyhledávacího pole. <br />
                V druhém kroku můžete přizpůsobit vyhledávání dle časové osy. Vyhledávání informací by zde mělo být efektivnější a přehlednější, pro ty, kdo mají jasný cíl vyhledávání.
            </p>
        </div>
        <button className="btn btn-primary mt-1" onClick={closeModal}>Pokračovat</button>
    </div>)
}