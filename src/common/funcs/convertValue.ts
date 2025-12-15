export const removeVnTone = (text?: string) => {
    if (!text) return text;

    // text to Vietnamese
    text = text.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    text = text.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    text = text.replace(/[ìíịỉĩ]/g, 'i');
    text = text.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    text = text.replace(/[ùúụủũưừứựửữ]/g, 'u');
    text = text.replace(/[ỳýỵỷỹ]/g, 'y');
    text = text.replace(/đ/g, 'd');
    text = text.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
    text = text.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
    text = text.replace(/[ÌÍỊỈĨ]/g, 'I');
    text = text.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
    text = text.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
    text = text.replace(/[ỲÝỴỶỸ]/g, 'Y');
    text = text.replace(/Đ/g, 'D');

    return text;
}
