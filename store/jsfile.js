// name -- name of the sticker
// dimensions -- dimensions of sticker in "width x height" format
// description -- flavor text of each sticker
// imageFileName -- the name of the sticker image. assumes png format
// nameFontSize -- font size of the name of the sticker
// nameBottomMargin -- distance between description text and sticker's name
// next three fields describe the position and rotation of the dimension format of the sticker
function useTemplate(name, dimensions, description, imageFileName, nameFontSize, nameBottomMargin, sizeTopPos, sizeLeft, sizeDeg = "-45", soldOut = false) {
    var cartButton =         "<button onclick=\"addToCart('" + name + "'); change();\" id=\"btn\" class=\"button mobile_align button--shikoba button--round-l button--inverted custom_btn\"><p id=\"cartAdder\"> add to cart </p></button>\n";
    if (soldOut) {
        cartButton = "<button id=\"btn\" class=\"button mobile_align custom_btn sold_out\" disabled><p id=\"cartAdder\" > <i> sold out :\'( </i></p></button>\n";
    }
    document.documentElement.innerHTML =
        "<html>\n" +
        "    <head>\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../buttons/css/normalize.css\">\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../buttons/css/vicons-font.css\">\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../buttons/css/base.css\">\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../buttons/css/buttons.css\">\n" +
        "        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../items.css\">\n" +
        "        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../navbar.css\">\n" +
        "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
        "        <title>Sad forever.</title>\n" +
        "    </head>\n" +
        "    <body>\n" +
        "        <template id=\"page\">\n" +
        "        <div class=\"navbar\">\n" +
        "            <div class=\"row no-gutters\">\n" +
        "                <a class=\"col-4\" href=\"../../policies\">policies</a>\n" +
        "                <a class=\"col-4\" href=\"../../about\">about</a>\n" +
        "                <a class=\"col-4\" href=\"../../store\">store</a>\n" +
        "            </div>\n" +
        "        </div>" +
        "            <a href=\"../../cart\">\n" +
        "                <img class=\"cart\" src=\"../../images/cart.png\" alt=\"cart\">\n" +
        "            </a>\n" +
        "            <a href=\"../\">\n" +
        "                <img class=\"logo\" src=\"../../images/logo.png\" alt=\"logo\">\n" +
        "            </a>\n" +
        "            <div class=\"container-fluid\">\n" +
        "                <div class=\"row\">\n" +
        "                    <div class=\"product col-12 col-md-6\">\n" +
        "                        <img id=\"product_image\" class=\"product_image mobile_align\" alt=\"sticker\">\n" +
        "                        <p id=\"product_details\" class=\"product_details mobile_align\">  </p>\n" +
        "                    </div>\n" +
        "                    <div class=\"descriptions col-12 col-md-6\">\n" +
        "                        <b> <i> <p id=\"product_name\" class=\"product_name mobile_align\"> </p> </i> </b>\n" +
        "                        <p class=\"product_description mobile_align\"> </p>\n" +
        "                        <p class=\"price mobile_align\"> <i> $2.50 </i> </p>" +
        "                        <div class=\"mobile_align\">\n" +
        cartButton +
        "                       </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </template>\n" +
        "        <script src=\"https://code.jquery.com/jquery-3.2.1.slim.min.js\" integrity=\"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN\" crossorigin=\"anonymous\"></script>\n" +
        "        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js\" integrity=\"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q\" crossorigin=\"anonymous\"></script>\n" +
        "        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js\" integrity=\"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl\" crossorigin=\"anonymous\"></script>\n" +
        "    </body>\n" +
        "</html>";
    const myTemplate = document.getElementById('page');
    let clonedTemplate = myTemplate.content.cloneNode(true);
    clonedTemplate.querySelector('.product_name').innerHTML = name;
    clonedTemplate.querySelector('.product_details').innerHTML = dimensions;
    clonedTemplate.querySelector('.product_description').innerHTML = description;
    document.body.appendChild(clonedTemplate);
    document.getElementById("product_image").src = "../../stickers/" + name + ".png";
    let nameStyle = document.getElementById("product_name").style;
    document.getElementById("product_name").style.fontSize = nameFontSize;
    var x = window.matchMedia("(max-width: 1000px)");

    let productName = document.getElementById("product_name")
    if (x.matches) { // If media query matches
        productName.style.marginBottom = 0;
    } else {
        productName.style.marginBottom = nameBottomMargin;
    }

    let productDetails = document.getElementById("product_details").style;
    productDetails.top = sizeTopPos;
    productDetails.left = sizeLeft;
    productDetails.transform = "rotate(" + sizeDeg + "deg)";
}

function addToCart(name) {
    let quantity = localStorage.getItem(name);
    if (quantity) { // value exists
        let total = parseInt(localStorage.getItem(name));
        if (total < 3) total = total + 1;
        localStorage.setItem(name, total);
    } else {
        localStorage.setItem(name, 1);
    }
}

function setQuantity(name, quantity) {
    localStorage.setItem(name, quantity);
    displayCart();
}

function removeItem(name) {
    localStorage.removeItem(name);
    let remove = document.getElementById(name);
    document.getElementById('shopping-cart').removeChild(document.getElementById(name));
    displayCart();
}

function getPath(name) {
    if (name == "shake it!") {
        return "assman";
    } else if (name == "happy booper") {
        return "blissedbooper";
    } else if (name == "computer") {
        return "sad computer";
    } else if (name == "happy never") {
        return "happynever";
    } else if (name == "be kind") {
        return "kindness";
    } else if (name == "mole cop") {
        return "molecop";
    } else if (name == "music booper") {
        return "musicboop";
    } else if (name == "sad booper") {
        return "sadboop";
    } else if (name == "sad forever") {
        return "sadforever";
    } else if (name == "cool snail") {
        return "snaily";
    } else if (name == "surprised booper") {
        return "surprisedboop"
    } else if (name == "tired booper") {
        return "tiredboop";
    } else if (name == "whatever") {
        return "whatevs";
    }
    return name;

}

function displayCart() {
    var cart = "";
    var firstRow = true;
    var noBorder = "border-0";
    var darkBorder = "border-0";
    var keys = Object.keys(localStorage);
    if (keys.length > 1) {

        // so that when shopping cart is immediately loaded the cart doesn't show up for a split second
        var containerHolder = "            <div class=\"row\">\n" +
            "                <div class=\"offset-lg-2 col-lg-8 p-3 round shadow-sm mb-3\">\n" +
            "                    <div class=\"table-responsive\">\n" +
            "                        <table class=\"table\">\n" +
            "                            <thead>\n" +
            "                            <tr>\n" +
            "                                <th class=\"border-bottom border-top-0\" id=\"sticker\">sticker</th>\n" +
            "                                <th class=\"border-bottom border-top-0\">price</th>\n" +
            "                                <th class=\"border-bottom border-top-0\">quantity</th>\n" +
            "                                <th class=\"border-bottom border-top-0\"></th>\n" +
            "                            </tr>\n" +
            "                            </thead>\n" +
            "                            <tbody class=\"shopping_cart\" id=\"shopping-cart\">\n" +
            "                            </tbody>\n" +
            "                        </table>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";
        var checkoutHolder = "<div class=\"row\">\n" +
            "                    <div class=\"offset-lg-2 col-lg-8 p-3 round shadow-sm mb-3\">\n" +
            "                       <div class=\"table-responsive\">\n" +
            "                          <table class=\"table\">\n" +
            "                          </table>\n" +
            "                       </div>\n" +
            "                       \n" +
            "                    </div>" +
            "                </div>";
        document.getElementById('cart').innerHTML = containerHolder;
        document.getElementById('paypal_script').innerHTML = "<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"paypalStuff();\" style=\"display: none\">\n"

        for (const key of keys.sort()) {
            if (parseInt(localStorage.getItem(key))) { // if the quantity is parsable
                cart += "<tr id=\"" + key + "\">"
                cart += "<th scope=\"row\" class=\"" + (firstRow ? noBorder : darkBorder) + "\">\n";
                cart += "<div class=\"p-2\">\n";
                cart += "<img src=\"../stickers/" + key + ".png\" alt=\"\" width=\"100\" class=\"img-fluid rounded\"> \n";
                cart += "<div class=\"ml-3 d-inline-block align-middle\">";
                cart += "<h5 class=\"mb-0\"> <a class=\"text\" href=\"../store/" + getPath(key) + "\"> " + key + "</a> </h5>";
                cart += "</div>"
                cart += "</th>"
                cart += "<td class=\"align-middle " + (firstRow ? noBorder : darkBorder) + "\"><strong>$2.50</strong></td>";
                cart += "<td id=\"q" + key + "\" class=\"align-middle " + (firstRow ? noBorder : darkBorder) + "\"><strong>";
                cart += "<div class=\"dropdown\">\n" +
                    "  <button class=\"dropbtn\">" + localStorage.getItem(key) + "</button>\n" +
                    "  <div class=\"dropdown-content\">\n" +
                    "    <button onclick=\"setQuantity('" + key + "', " + 1 + ")\" class=\"drop\">1</button>\n" +
                    "    <button onclick=\"setQuantity('" + key + "', " + 2 + ")\" class=\"drop\">2</button>\n" +
                    "    <button onclick=\"setQuantity('" + key + "', " + 3 + ")\" class=\"drop\">3</button>\n" +
                    "  </div>\n" +
                    "</div>";
                cart += "</strong></td>";
                cart += "<td class=\"align-middle " + (firstRow ? noBorder : darkBorder) + "\"><button onclick=\"removeItem('" + key + "')\" class=\"btn btn-primary-outline mx-auto\"> <i class=\"fa fa-close\"></i>\n </button></td>\n";
                cart += "</tr>";
                firstRow = false;
            }
        }
        cart += "<th scope=\"row\" class=\"" + (firstRow ? noBorder : darkBorder) + "\">\n";
        cart += "<div class=\"p-2\">\n";
        cart += "<div class=\"ml-3 d-inline-block align-middle\">";
        cart += "</div>"
        cart += "</th>"
        cart += "<td class=\"align-middle " + (firstRow ? noBorder : darkBorder) + "\"><strong><i><b> $" + (Math.round((totalQuantity() * 2.5) * 100) / 100).toFixed(2) + "</b></i></strong></td>";

        cart += "</strong></td>";
        cart += "</tr>";
        firstRow = false;
        document.getElementById('shopping-cart').innerHTML = cart;
        if (window.matchMedia("(min-width: 1000px)").matches) { // If media query matches
            document.getElementById('cashier').src = "../images/cashier.png";
        } else {
            document.getElementById('cashier').src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
        }


    } else { // empty cart
        var containers = document.getElementsByClassName("container");
        for (var i = 0; i < containers.length; i++) {
            containers[i].innerHTML = "";
        }
        document.getElementById('cashier').src = "../images/empty.png";
        document.getElementById('paypal_script').innerHTML = "<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"removePaypalStuff();\" style=\"display: none\">\n";
        let remove = document.getElementsByTagName("body")[0];
        remove.removeChild(document.getElementById("paypal-button-container"));
        remove.removeChild(document.getElementById("paypal_script"));

    }
}

function removeAll() {
    for (const key of Object.keys(localStorage).sort()) {
        if (parseInt(localStorage.getItem(key))) { // if the quantity is parsable
            removeItem(key);
        }
    }
}

function paypalStuff() {
    if (!document.getElementById("find-me")) {
        paypal.Buttons({
            style: {
                size: 'responsive',
                shape: 'pill',
                color: 'gold',
                label: 'paypal',

            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            "value": (totalQuantity() * 2.5),
                            "currency_code": 'USD',
                            "breakdown": {
                                item_total: {value: totalQuantity() * 2.5, currency_code: 'USD'}
                            }
                        },
                        items: itemList()
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    removeAll();
                    window.location.replace("../thanks");
                });
            }
        }).render('#paypal-button-container');
        var tag = document.createElement("div");
        tag.id = "find-me";
        document.getElementsByTagName("head")[0].appendChild(tag);
    }
}

function itemList() {
    let list = [];
    for (const key of Object.keys(localStorage).sort()) {
        if (parseInt(localStorage.getItem(key))) { // if the quantity is parsable
            list.push({
                name: key,
                unit_amount: {value: 2.5, currency_code: 'USD'},
                quantity: localStorage.getItem(key)
            });
        }
    }
    return list;
}

function totalQuantity() {
    let quant = 0;
    for (const key of Object.keys(localStorage).sort()) {
        if (parseInt(localStorage.getItem(key))) { // if the quantity is parsable
            quant += parseInt(localStorage.getItem(key));
        }
    }
    return quant;
}






