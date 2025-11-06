const form = document.querySelector(".contact-form");
const inputs = form.querySelectorAll("input, textarea");

function showError(input, message) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
        error.remove();
    }
    const span = document.createElement("span");
    span.classList.add("error-message");
    span.style.color = "red";
    span.style.fontSize = "0.9rem";
    span.textContent = message;
    input.insertAdjacentElement("afterend", span);
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());
}

function isValidEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    return pattern.test(email);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();
    let hasError = false;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, "Este campo é obrigatório.");
            hasError = true;
        } else if (input.type === "email" && !isValidEmail(input.value)) {
            showError(input, "Digite um e-mail válido.");
            hasError = true;
        }
    });

    if (!hasError) {
        alert("Mensagem enviada com sucesso!");
        localStorage.setItem("nomeUsuario", form.querySelector("input[type='text']").value);
        form.reset();
    }
});
