// call when the secret is submitted
function submitSecret() {
    
}

// x: string
// n: n shares
// m: at least m shares required to restore x
// ->: array of hex strings
function split(x, n, m) {
    return secrets.share(secrets.str2hex(x), n, m);
}

// shares: array of hex strings
// ->: x
function combine(shares) {
    return secrets.hex2str(secrets.combine(shares));
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

    qr.drawCanvas(4, 40, canvas);
}
