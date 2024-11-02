document.getElementById('calculateBtn').addEventListener('click', function () {
    // Получаем размеры листа
    const sheetWidth = Number(document.getElementById('sheetWidth').value);
    const sheetLength = Number(document.getElementById('sheetLength').value);
    
    // Получаем количество размерных кусков
    const sizeCount = Number(document.getElementById('sizeCount').value);
    
    // Получаем размеры кусков
    const sizes = [];
    const sizeWidths = document.querySelectorAll('.sizeWidth');
    const sizeLengths = document.querySelectorAll('.sizeLength');
    
    for (let i = 0; i < sizeCount; i++) {
        const width = Number(sizeWidths[i].value);
        const length = Number(sizeLengths[i].value);
        sizes.push({ width, length });
    }

    // Логика расчета
    const totalWidth = sizes.reduce((total, size) => total + size.width, 0);
    const requiredSheets = Math.ceil(totalWidth / sheetWidth);
    const totalLength = Math.max(...sizes.map(size => size.length));

    const excessWidth = (requiredSheets * sheetWidth) - totalWidth;

    let results = `Необходимое количество листов: ${requiredSheets}<br>`;
    results += `Остаток ширины: ${excessWidth} мм<br>`;

    if (totalLength > sheetLength) {
        results += `Внимание! Длина кусков превышает длину листа.<br>`;
    }

    if (excessWidth > 500) {
        results += `Перерасход: ${excessWidth} мм (писать отдельно).<br>`;
    } else {
        results += `Перерасход: ${excessWidth} мм (в рамках допустимого).<br>`;
    }

    // Добавить дополнительные условия, если глубина больше 750
    const totalDepth = sizes.reduce((total, size) => total + size.length, 0);
    if (totalDepth > 750) {
        results += `Склейки: +1 за большую глубину.<br>`;
    }

    document.getElementById('results').innerHTML = results;
});
