import React from 'react';

export default (props: any) => {
    const { closeModal } = props;
    return (<div className="text-center">
        <h2>Vítáme vás na webu Ověřeno.cz</h2>
        <p>
            Tento web se zabývá aktuálním děním ve společnosti a můžete zde vyhledávat různé články. <br />
            Esterko, tohle je jen hloupý text a ty jako nejlepší Pupinečka vymyslíš ten profi.
                    </p>
        <button className="btn btn-primary" onClick={closeModal}>Pokračovat</button>
    </div>)
}