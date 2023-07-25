import "./Register.css"


export const Register = () => {
        
    return (
        <>
        <div className="Container">
        <h1>Register Account</h1>
        <div className="userData">
        <section className="userImage--container">
            <div className="preview-Img-container">
            <img className="image" src="https://res.cloudinary.com/photojam-nss/image/upload/v1690296220/Screenshot_2023-07-17_145151_djqdba.png"/>
            </div>
            <div>
                <label className="upload-label">Upload Profile Photo</label><br/>
                <input type='file' className="file-upload"/>
            </div>
        </section>
        <section className="userInfo--container">
                <input type='text' className="user-input" placeholder="User Email" /><br/>
                <input type='text' className="user-input" placeholder="Full Name " /><br/>
                <input type='text' className="user-input" placeholder="Username" /><br/>
                <button className="createAccount button">Create Account</button>
        </section>
        </div>
        </div>

        </>
    )
}