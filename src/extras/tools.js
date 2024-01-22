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

export {
    copyToClipboard,
}