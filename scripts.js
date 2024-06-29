// scripts.js
document.getElementById('pasteInbound').addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
        document.getElementById('inboundConfig').value = text;
        adjustTextareaHeight(document.getElementById('inboundConfig'));
    });
});

document.getElementById('pasteAddresses').addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
        document.getElementById('addresses').value = text;
        adjustTextareaHeight(document.getElementById('addresses'));
    });
});

document.getElementById('changeAddresses').addEventListener('click', () => {
    let inboundConfig = document.getElementById('inboundConfig').value;
    let addresses = document.getElementById('addresses').value.split('\n');
    let output = '';

    addresses.forEach(address => {
        let config = inboundConfig;

        if (config.startsWith('vmess://')) {
            let decodedConfig = JSON.parse(atob(config.slice(8)));
            decodedConfig.add = address;
            config = 'vmess://' + btoa(JSON.stringify(decodedConfig));
        } else {
            config = config.replace(/@.*?:/, `@${address}:`);
        }

        output += config + '\n' + '\n';
    });

    let outputTextarea = document.getElementById('output');
    outputTextarea.value = output.trim();

    document.getElementById('outputGroup').classList.remove('hidden');
    adjustTextareaHeight(outputTextarea);
});

document.getElementById('copyToClipboard').addEventListener('click', () => {
    let output = document.getElementById('output').value;
    navigator.clipboard.writeText(output).then(() => {
        alert('Inbound configurations copied to clipboard!');
    });
});

function adjustTextareaHeight(textarea) {
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

document.getElementById('inboundConfig').addEventListener('input', function() {
    adjustTextareaHeight(this);
});

document.getElementById('addresses').addEventListener('input', function() {
    adjustTextareaHeight(this);
});
