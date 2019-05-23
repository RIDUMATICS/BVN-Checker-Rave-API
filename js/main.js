const $bvnInput = document.querySelector('input[name=bvnInput]')
const $bvnForm = document.querySelector('form');
const $inputFormButton = document.querySelector('button')
const $modal = document.querySelector('#myModal');
const $closeModal = document.querySelector(' .close');
const key = 'FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X';

const displayResult = (data) => {
    document.querySelector('#result').innerHTML = `
    <p>First Name: ${data.first_name} </p>
    <p>Middle Name: ${data.middle_name}</p>
    <p>Last Name: ${data.last_name}</p>
    <p>DOB: ${data.date_of_birth}</p>
    <p>Phone Number: ${data.phone_number}</p>
    <p>Registration Date: ${data.registration_date}</p>
    <p>Enrollment Bank: ${data.enrollment_bank}</p>
    <P>Enrollment Branch: ${data.enrollment_branch}</P>`
}

$bvnInput.addEventListener('keyup', (e) => {
    if (e.target.value.trim().length === 0)
        $inputFormButton.setAttribute('disabled', 'disabled');
    else
        $inputFormButton.removeAttribute('disabled');
})

$bvnForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bvnValue = e.target.elements.bvnInput.value
    e.target.elements.bvnInput.value = '';
    $inputFormButton.setAttribute('disabled', 'disabled');
    const url = `https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${bvnValue}?seckey=${key}`
    fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => {
            // Your code for handling the data you get from the API
            return resp.json();
        }).then(function (res) {
            displayResult(res.data);
            $modal.style.display = "block";

        })
        .catch(function () {
            // This is where you run code if the server returns any errors
        });
});


// When the user clicks on <span> (x), close the modal
$closeModal.addEventListener('click', function () {
    $modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
    if (event.target == $modal) {
        $modal.style.display = "none";
    }
})
