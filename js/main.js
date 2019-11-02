
function split(x, n, m) {
    return secrets.share(secrets.str2hex(x), n, m);
}

function combine(shares) {
    return secrets.hex2str(secrets.combine(shares));
}
