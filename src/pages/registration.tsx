import React from 'react';

const Login = () => <div className="container mt-4">
    <div className="bg-light p-5 form-box">
        <h3 className="text-center">Registrace</h3>
        <div className="form-group">
            <label >Uživatelské jméno</label>
            <input type="text" className="form-control" />
        </div>
        <div className="form-group">
            <label >Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">Níkdy nebudeme váš e-mail s nikým sdílet.</small>
        </div>
        <div className="form-group">
            <label >Heslo</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Heslo" />
        </div>
        <div className="form-group">
            <label >Heslo pro kontrolu</label>
            <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Heslo znovu" />
        </div>

        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus"></i> Vytvořit nový účet</button>
    </div>
</div>

export default Login;