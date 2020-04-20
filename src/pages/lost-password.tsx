import React from 'react';

const Login = () => <div className="container mt-4">
    <div className="bg-light p-5 form-box">
        <h3 className="text-center">Reset hesla</h3>
        <div className="form-group">
            <label >Email pro obnovu hesla</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="zadejte email" />
        </div>
        <button className="btn btn-primary btn-block" type="button" id="btn-signup">Resetovat heslo</button>
    </div>
</div>

export default Login;