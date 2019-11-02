let fileDataURL;

function loadFile(event)
{
    if (event.target.files.length > 0)
    {
        var file = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            fileDataURL = e.target.result;
        };
        fileDataURL = fileReader.readAsDataURL(file);
    }
}
function decodeTextUpdate(decodedText)
{
    var textbox = document.getElementById("decodedText");
    textbox.innerText = decodedText;
}

function decode()
{
    if (fileDataURL)
    {
        qrcode.callback = decodeTextUpdate;
        qrcode.decode(fileDataURL);
        fileDataURL = null;
    }
    else
    {
        document.getElementById("decodedText").innerText = "";
    }
}