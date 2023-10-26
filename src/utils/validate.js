export const checkValidData=(email,password)=>{
    const isEmailValid = /^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    if(!isEmailValid) return "Email Id is not valid";
    if(!isPasswordValid) return "Password is not valid";
    return null;
};