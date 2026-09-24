// ============================================
// API CONFIGURATION
// ============================================

const API_URL = "http://127.0.0.1:8000";


// ============================================
// ELEMENTS
// ============================================

const successToast =
    document.getElementById("successToast");

const toastClose =
    document.getElementById("toastClose");

const wasteInput =
    document.getElementById("wasteInput");

const classifyBtn =
    document.getElementById("classifyBtn");

const buttonText =
    document.getElementById("buttonText");

const loader =
    document.getElementById("loader");

const result =
    document.getElementById("result");

const errorBox =
    document.getElementById("errorBox");

const charCount =
    document.getElementById("charCount");

const binName =
    document.getElementById("binName");

const binColor =
    document.getElementById("binColor");

const colorName =
    document.getElementById("colorName");

const reasonText =
    document.getElementById("reasonText");


// ============================================
// CHARACTER COUNTER
// ============================================

wasteInput.addEventListener("input", () => {

    charCount.textContent =
        `${wasteInput.value.length} / 500`;

});


// ============================================
// EXAMPLE BUTTONS
// ============================================

document
    .querySelectorAll(".example")
    .forEach(button => {

        button.addEventListener("click", () => {

            wasteInput.value =
                button.dataset.value;

            charCount.textContent =
                `${wasteInput.value.length} / 500`;

            wasteInput.focus();

        });

    });


// ============================================
// CLASSIFY BUTTON
// ============================================

classifyBtn.addEventListener(
    "click",
    classifyWaste
);


// ============================================
// CTRL + ENTER
// ============================================

wasteInput.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            classifyWaste();

        }

    }
);


// ============================================
// CLASSIFY WASTE
// ============================================

async function classifyWaste() {

    const description =
        wasteInput.value.trim();


    // ------------------------------
    // VALIDATION
    // ------------------------------

    if (!description) {

        showError(
            "Please describe the waste item first."
        );

        wasteInput.focus();

        return;

    }


    // ------------------------------
    // RESET
    // ------------------------------

    hideError();

    result.classList.remove(
        "show"
    );

    setLoading(true);


    try {

        // ------------------------------
        // API CALL
        // ------------------------------

        const response =
            await fetch(
                `${API_URL}/classify`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        description:
                            description
                    })
                }
            );


        // ------------------------------
        // ERROR RESPONSE
        // ------------------------------

        if (!response.ok) {

            let message =
                "Unable to classify the waste.";

            try {

                const errorData =
                    await response.json();

                if (errorData.detail) {

                    message =
                        errorData.detail;

                }

            }
            catch {

                // Ignore JSON parse errors

            }


            throw new Error(message);

        }


        // ------------------------------
        // JSON RESPONSE
        // ------------------------------

        const data =
            await response.json();


        console.log(
            "FastAPI response:",
            data
        );


        // ------------------------------
        // DISPLAY RESULT
        // ------------------------------

        displayResult(data);

    }


    catch (error) {

        console.error(
            "Classification error:",
            error
        );


        showError(
            error.message ||
            "Unable to connect to the FastAPI server."
        );

    }


    finally {

        setLoading(false);

    }

}


// ============================================
// DISPLAY RESULT
// ============================================

function displayResult(data) {

    /*
        Expected FastAPI response:

        {
            "bin": "Blue Bin",
            "color": "#2196F3",
            "reason": "Plastic bottles can be recycled.",
            "confidence": 0.94
        }
    */


    // ----------------------------------------
    // BIN NAME
    // ----------------------------------------

    const bin =
        data.category ??
        "Unknown Bin";


    // ----------------------------------------
    // BIN COLOR
    // ----------------------------------------

    const color =
        data.dustbin_colour ??
        "#6ee7a0";


    // ----------------------------------------
    // REASON
    // ----------------------------------------

    const reason =
        data.reason ??
        "No explanation was provided.";



    // ----------------------------------------
    // BIN NAME
    // ----------------------------------------

    binName.textContent =
        formatText(bin);


    // ----------------------------------------
    // BIN CIRCLE COLOR
    // ----------------------------------------

    binColor.style.background =
        color;


    binColor.style.boxShadow =
        `
        0 0 45px ${color},
        0 0 90px ${color}
        `;


    // ----------------------------------------
    // COLOR NAME
    // ----------------------------------------

    colorName.textContent =
        color;


    // ----------------------------------------
    // REASON
    // ----------------------------------------

    reasonText.textContent =
        reason;


   
    // ----------------------------------------
    // SHOW RESULT
    // ----------------------------------------

    result.classList.add(
        "show"
    );

    showSuccessToast();


    // ----------------------------------------
    // MOBILE SCROLL
    // ----------------------------------------

    if (window.innerWidth <= 700) {

        setTimeout(() => {

            result.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 100);

    }

}

// ============================================
// FORMAT TEXT
// ============================================

function formatText(text) {

    if (!text) {

        return "Unknown";

    }


    return String(text)

        .replace(/_/g, " ")

        .replace(
            /\b\w/g,
            char =>
                char.toUpperCase()
        );

}


// ============================================
// LOADING STATE
// ============================================

function setLoading(isLoading) {

    classifyBtn.disabled =
        isLoading;


    loader.classList.toggle(
        "active",
        isLoading
    );


    if (isLoading) {

        buttonText.textContent =
            "Analyzing...";

    }

    else {

        buttonText.textContent =
            "Find Dustbin →";

    }

}


// ============================================
// ERROR
// ============================================

function showError(message) {

    errorBox.textContent =
        message;

    errorBox.classList.add(
        "show"
    );

}


function hideError() {

    errorBox.textContent = "";

    errorBox.classList.remove(
        "show"
    );

}

// ============================================
// SUCCESS TOAST
// ============================================

let toastTimer;


function showSuccessToast() {

    clearTimeout(toastTimer);

    successToast.classList.add("show");


    toastTimer = setTimeout(() => {

        hideSuccessToast();

    }, 10000);

}


function hideSuccessToast() {

    successToast.classList.remove("show");

}


// Close button

toastClose.addEventListener(
    "click",
    hideSuccessToast
);