let cards = [];

document.getElementById("cardNumber").addEventListener("input", function () {
    let cardNumber = this.value;
    let doneIcon = document.querySelector(".material-symbols-outlined");
    if (/^\d{16}$/.test(cardNumber)) {
        doneIcon.style.display = "inline";
    } else {
        doneIcon.style.display = "none";
    }
    let cardImgCell = document.createElement("td");
    cardImgCell.innerHTML = `<div class="card-image"><img src="./image/master.jpg" alt="cImage"></div>`;
    row.appendChild(cardImgCell);
});


function addCard() {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvc = document.getElementById("cvc").value;

    if (validateCardInfo(cardNumber, expiryDate, cvc)) {
        let card = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvc: cvc,
        };

        cards.push(card);
        clearForm();
        displayCardList();
    }
}

function validateCardInfo(cardNumber, expiryDate, cvc) {
    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Card Number phải đủ 16 số");
        return false;
    }

    if (!/^\d{3}$/.test(cvc)) {
        alert("CVC/CVV chỉ bao gồm 3 số");
        return false;
    }

    return true;
}

function clearForm() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("cvc").value = "";
    document.querySelector(".material-symbols-outlined").style.display = "none";
}

function displayCardList() {
    let cardTableBody = document.getElementById("cardTableBody");
    cardTableBody.innerHTML = "";

    cards.forEach((card, index) => {
        let row = document.createElement("tr");

        let cardImgCell = document.createElement("td");
        cardImgCell.innerHTML = `<img src="./image/master.jpg" alt="cImage" style="width: 200px; height: 100px">`;
        row.appendChild(cardImgCell);

        let cardNumberCell = document.createElement("td");
        cardNumberCell.textContent = card.cardNumber.replace(/.(?=.{6,})/g, "*");
        row.appendChild(cardNumberCell);

        let expiryDateCell = document.createElement("td");
        expiryDateCell.textContent = card.expiryDate;
        row.appendChild(expiryDateCell);

        let cvcCell = document.createElement("td");
        cvcCell.textContent = card.cvc.replace(/\d/g, "*");
        row.appendChild(cvcCell);

        let actionsCell = document.createElement("td");

        let viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.addEventListener("click", () => viewCard(index));
        actionsCell.appendChild(viewButton);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editCard(index));
        actionsCell.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteCard(index));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        cardTableBody.appendChild(row);
    });

    document.getElementById("cardList").style.display = "block";
}

function viewCard(index) {
    let card = cards[index];
    alert(`Card Number: ${card.cardNumber}\nExpiry Date: ${card.expiryDate}\nCVC: ${card.cvc}`);
}

function editCard(index) {
    let card = cards[index];
    document.getElementById("cardNumber").value = card.cardNumber;
    document.getElementById("expiryDate").value = card.expiryDate;
    document.getElementById("cvc").value = card.cvc;
    document.querySelector(".material-symbols-outlined").style.display = "inline";

    cards.splice(index, 1);
    displayCardList();
}

function deleteCard(index) {
    cards.splice(index, 1);
    displayCardList();
}