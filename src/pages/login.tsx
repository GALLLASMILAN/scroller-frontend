import React from 'react';

const Login = () => <div className="container mt-4">
    <div className="bg-light p-5 form-box">
        <h3 className="text-center">Přihlášení</h3>
        <div className="form-group">
            <label >Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="zadejte email" />
        </div>
        <div className="form-group">
            <label >Heslo</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="zadejte heslo" />
        </div>

        <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Přihlásit se</button>

        <a href="#" id="forgot_pswd">Zapoměli jste heslo?</a>
        <hr />

        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus"></i> Vytvořit nový účet</button>
    </div>
</div>

export default Login;