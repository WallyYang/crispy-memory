// call when the secret is submitted
function submitSecret() {
    let splitSize = document.getElementById("split-size").value;
    let pickSize = document.getElementById("pick-size").value;

    let n = parseInt(splitSize, 10);
    let m = parseInt(pickSize, 10);

    if (Number.isInteger(n) && Number.isInteger(m)) {
        if (m > n) {
            alert("Invalid input! Pick Size must be less or equal to Split Size");
        } else {
            let msg = document.getElementById("msg").value;
            if (msg === null || msg.length === 0) {
                alert("Empty Message!");
            } else {
                let shares = split(msg, n, m);
                for (let i = 0; i < n; i++) {
                    let qrc = genQR(shares[i]);
                    addCanvas("canvas" + i);
                    drawQR(qrc, "canvas" + i);
                }
            }
        }
    } else {
        console.log(splitSize);
        console.log(pickSize);
        alert("Invalid input! Split Size and Pick Size must be integers");
    }
}

// add a child canvas to HTML body with id
function addCanvas(id) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);

    canvas.setAttribute("class", "qrcanvas");

    let div = document.createElement("div");
    div.appendChild(canvas);

    let body = document.getElementById('body');
    body.appendChild(div);
}

// x: string
// n: n shares
// m: at least m shares required to restore x
// ->: array of hex strings
function split(x, n, m) {
    x = "SUPER:" + x
    return secrets.share(secrets.str2hex(x), n, m);
}

// shares: array of hex strings
// ->: x
function combine(shares) {
    let text = secrets.hex2str(secrets.combine(shares));
    if (text.startsWith("SUPER:")) {
        return text.substr(6);
    }
    throw "Invalid shares";
}

// s: string to generate a QR code
// return a QrCode
function genQR(s) {
    let QRC = qrcodegen.QrCode;

    return QRC.encodeText(s, QRC.Ecc.MEDIUM);
}

// qr: QrCode to draw
// canvasId: the ID of canvas of draw on
function drawQR(qr, canvasId) {
    let canvas = document.getElementById(canvasId);

    qr.drawCanvas(10, 4, canvas);
}
