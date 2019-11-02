
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
