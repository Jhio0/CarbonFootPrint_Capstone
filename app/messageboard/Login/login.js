const navigate = useNavigate();

const loginUser = () => {
    fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error_message) {
                alert(data.error_message);
            } else {
                alert(data.message);
                navigate("/dashboard");
                localStorage.setItem("_id", data.id);
            }
        })
        .catch((err) => console.error(err));
};

const signOut = () => {
    localStorage.removeItem("_id");
    //redirect to the login page
    navigate("/");
};