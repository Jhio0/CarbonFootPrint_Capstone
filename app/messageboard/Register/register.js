const navigate = useNavigate();

const signUp = () => {
    fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            username,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.error(err));
};

const handleSubmit = (e) => {
    e.preventDefault();
    //Trigger the function
    signUp();
    setEmail("");
    setUsername("");
    setPassword("");
};

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    const id = generateID();
    //ensures there is no existing user with the same credentials
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );
    // if true
    if (result.length === 0) {
        const newUser = { id, email, password, username };
        //adds the user to the database (array)
        users.push(newUser);
        //returns a success message
        return res.json({
            message: "Account created successfully!",
        });
    }
    // if there is an existing user
    res.json({
        error_message: "User already exists",
    });
});

