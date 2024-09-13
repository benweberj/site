function copyToClipboard(txt) {
    if (navigator.clipboard) { // desktop
        navigator.clipboard.writeText(txt)
    } else { // mobile
        const textarea = document.createElement('textarea')
        textarea.value = txt
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
    }
}

function ellipsize(str, len) {
    if (str.length < len) return str

    return str.substring(0, len) + '...'
}

export {
    copyToClipboard,
    ellipsize
}