const sneakerList = document.querySelector(".sneakers__list");

const addElement = function (tagName, className, content) {
    const newElement = document.createElement(tagName);

    if (className) {
        newElement.className = className;
    }

    if (content) {
        newElement.textContent = content;
    }

    return newElement
}

const addImg = function (className, src) {
    const newImg = document.createElement("img");
    newImg.src = src;

    if (className) {
        newImg.className = className;
    }

    return newImg
}

const appendChild = function (parent, child) {
    parent.append(child);
}

const appendChildren = function (parent, children) {
    children.forEach(function (children) {
        parent.append(children);
    });
}

const addZero = function (number) {
    return number < 10 ? "0" + number : number
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
}

const renderSneakers = function (sneakers) {
    const {
        id,
        title,
        img,
        price,
        discountPrice,
        model,
        size,
        addedDate,
        benefits
    } = sneakers

    const sneakerItem = addElement("li", "col-4 sneakers__item selector-for-some-widget");

    const sneakerCard = addElement("div", "card");
    const sneakerImg = addImg("card-img-top", img);
    const sneakerCardBody = addElement("div", "card-body");

    const sneakerTitle = addElement("h3", "card-title", title);

    const sneakerDiscountPrice = addElement("p", "card-text fw-bold");
    const sneakerDiscountPriceMark = addElement("mark", "", discountPrice);

    const sneakerPrice = addElement("p", "card-text text-decoration-line-through", price);

    const sneakerMaker = addElement("p", "badge bg-success", model);

    const sneakerSize = addElement("p", "d-block w-50 badge bg-info", `Size: ${size}`);

    const sneakerAddedDate = addElement("p", "card-text", showDate(addedDate));

    const sneakerBenefitsList = addElement("ul", "d-flex flex-wrap list-unstyled");

    benefits.forEach(function(benefitsItem){
        const sneakerBeenfitsItem = addElement("li", "badge bg-primary me-1 mb-1", benefitsItem);

        appendChild(sneakerBenefitsList, sneakerBeenfitsItem);
    })

    const buttons = addElement("div", "position-absolute top-0 end-0 d-flex");

    //edit button
    const editButton = addElement("button", "btn rounded-0 btn-secondary edit-button");
    editButton.setAttribute("data-id", id);
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#edit-product-modal");
    appendChild(buttons, editButton);

    const editButtonImg = addElement("i", "fa-solid fa-pen");
    appendChild(editButton, editButtonImg);
    editButtonImg.style.pointerEvents = "none";

    //trash button
    const trashButton = addElement("button", "btn rounded-0 btn-danger delete-button");
    trashButton.setAttribute("data-id", id);

    const trashButtonImg = addElement("i", "fa-solid fa-trash");
    appendChild(trashButton, trashButtonImg);
    trashButtonImg.style.pointerEvents = "none";

    appendChild(buttons, trashButton);

    appendChild(sneakerItem, sneakerCard); // div.card in li.sneakers__item
    appendChild(sneakerDiscountPrice, sneakerDiscountPriceMark);

    appendChildren(sneakerCard, [sneakerImg, sneakerCardBody]); // sneakerImg and sneakerCardBody in sneakerCard
    appendChildren(sneakerCardBody, [sneakerTitle, sneakerDiscountPrice, sneakerPrice, sneakerMaker, sneakerSize, sneakerAddedDate, sneakerBenefitsList, buttons]);

    // appendChild(sneakerList, sneakerItem);

    return sneakerItem;
}

let showSneakers = sneakers.slice();
const sneakersCount = document.getElementById("sneakers-count");

const sneakerRefresh = function () {
    sneakersCount.textContent = `count: ${sneakers.length}`;
    sneakerList.innerHTML = "";

    sneakers.forEach(function (sneakerItems) {
        const sneakerItem = renderSneakers(sneakerItems);
        appendChild(sneakerList, sneakerItem);
    });
}

const sneakerMakers = document.querySelector(".sneakers-manufacturer-select");
const sneakerSizes = document.querySelector(".sneakers-size");

manufacturers.forEach(function (makers) {
    const {
        id,
        name
    } = makers

    const sneakerManufacturer = document.createElement("option");
    sneakerManufacturer.textContent = name;
    sneakerManufacturer.value = name;

    appendChild(sneakerMakers, sneakerManufacturer);
});

sizes.forEach(function (sneakersSizes) {
    const {
        id,
        size
    } = sneakersSizes

    const sneakerSize = document.createElement("option");
    sneakerSize.textContent = size;
    sneakerSize.value = size;

    appendChild(sneakerSizes, sneakerSize);

})

sneakerRefresh()

const sneakerBenefitsInput = document.querySelector("#benefit");
const sneeakerBenefitsExampleList = document.querySelector("#benefitsExample");

benefitsOptions = []

sneakerBenefitsInput.addEventListener("input", function () {

    const benefitsItemValue = sneakerBenefitsInput.value;

    const splitBenefits = benefitsItemValue.trim().split(",");

    if (splitBenefits.length == 2) {
        benefitsOptions.push(splitBenefits[0]);
        sneakerBenefitsInput.value = "";

        sneeakerBenefitsExampleList.textContent = "";

        benefitsOptions.forEach(function (sneakerBenefits) {
            const sneakerBeenfitsItem = addElement("li", "btn btn-sm badge rounded-pill btn-danger mr-5 benefits__item", sneakerBenefits);

            appendChild(sneeakerBenefitsExampleList, sneakerBeenfitsItem);
        })
    }
});

const addSneakerBtn = document.querySelector(".addsneaker");

addSneakerBtn.addEventListener("click", function () {
    benefitsOptions = [];
    sneakerBenefitsInput.value = "";
    sneeakerBenefitsExampleList.innerHTML = "";
});

const addSneakerForm = document.querySelector("#add-sneaker");
const addModal = document.querySelector("#add-sneaker-modal");
const addSneakerModal = new bootstrap.Modal(addModal);

addSneakerForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const title = elements.title;
    const price = elements.sneaker__price;
    const makers = elements.sneaker__manufacturer;
    const sizes = elements.sneaker__size;
    const benefits = sneakerBenefitsInput;
    const titleValue = title.value;
    const priceValue = price.value;
    const makersValue = makers.value;
    const sizesValue = sizes.value;
    const benefitsValue = benefits.value;
    console.log(titleValue);
    console.log(priceValue);
    console.log(makersValue);
    console.log(sizesValue);
    console.log(benefitsValue);

    if (titleValue && priceValue && makersValue && sizesValue && benefitsValue) {

        const sneakerArray = {
            id: Math.floor(Math.random() * 1000),
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: Math.round(priceValue),
            discountPrice: priceValue - (priceValue / 100 * 25),
            model: makersValue,
            size: sizesValue,
            addedDate: new Date(),
            benefits: benefitsOptions
        }

        addSneakerForm.reset();

        const sneakerItem = renderSneakers(sneakerArray);
        appendChild(sneakerList, sneakerItem)
        showSneakers.push(sneakerArray);
        sneakers.push(sneakerArray);
        benefitsOptions = []
    }

    sneakerRefresh();
    addSneakerModal.hide();

});

sneakerList.addEventListener("click", function(evt){
    if (evt.target.matches(".delete-button")) {
        const clickEdItem = +evt.target.dataset.id;

        const sneakersItemIndex = sneakers.findIndex(function (sneaker){
            return sneaker.id === clickEdItem;
        });

        showSneakers.splice(sneakersItemIndex, 1);
        sneakers.splice(sneakersItemIndex, 1);

        sneakerRefresh();
    }
})